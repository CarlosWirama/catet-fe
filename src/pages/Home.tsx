import { useState, useEffect, useCallback } from "preact/hooks";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";
import { Note } from "../types/note";
import Toolbar from "../components/Toolbar";

export default function Home() {
  const [editorContent, setEditorContent] = useState("");
  const [isNoteContentEdited, setIsNoteContentEdited] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load saved editor and noteList from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("textEditorContent") || "";
    setEditorContent(savedContent);
    
    const savedNotes = localStorage.getItem("noteList") || "[]";
    const parsedSavedNotes = JSON.parse(savedNotes);
    setNotes(parsedSavedNotes);
    
    const savedEditIndex = localStorage.getItem("editIndex");
    const parsedEditIndex: number | null = savedEditIndex ? JSON.parse(savedEditIndex) : null;
    setEditIndex(parsedEditIndex);
  }, []);

  const toggleNoteList = useCallback(() => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  }, []);

  // Handle input changes on the editor
  const handleEditorChange = useCallback((content) => {
    setEditorContent(content);
  // Save content to localStorage whenever it changes
    localStorage.setItem("textEditorContent", content);
    setIsNoteContentEdited(true);
  }, []);

  const handleSaveNote = useCallback(
    (editorContent: Note["content"]) => {
      const isNewNote = editIndex === null;
      const updatedNote = isNewNote ? {
        content: editorContent,
        createdAt: new Date(),
      } : {
        content: editorContent,
        createdAt: notes[editIndex].createdAt,
        editedAt: new Date(),
      };
      const updatedNotesList = isNewNote
        ? [updatedNote, ...notes]
        : [
          ...notes.slice(0, editIndex),
          updatedNote,
          ...notes.slice(editIndex + 1),
        ];
      localStorage.setItem("noteList", JSON.stringify(updatedNotesList));
      setNotes(updatedNotesList);
      if (isNewNote) {
        setEditIndex(0);
        localStorage.setItem("editIndex", "0");
      }
      setIsNoteContentEdited(false);
    },
    [editIndex, notes]
  );

  return (
    <>
      <main class="m-5 flex-grow flex flex-col overflow-hidden">
        {/* <img src={preactLogo} alt="Preact logo" height="160" width="160" /> */}
        {/* <Toolbar /> */}
        <TextEditor content={editorContent} onChange={handleEditorChange} />
        <NoteList
          notes={notes}
          isOpen={isSidebarOpen}
          onClose={toggleNoteList}
        />
      </main>
      <Navbar
        onMenuClick={toggleNoteList}
        isNoteEdited={isNoteContentEdited}
        onSaveNote={() => handleSaveNote(editorContent)}
      />
    </>
  );
}
