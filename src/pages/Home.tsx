import { useEffect, useCallback } from "preact/hooks";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";
import type { Note } from "../types/note";
import { useEditorContext } from "../context/EditorContext";

export default function Home() {
  const {
    editorContent,
    setEditorContent,
    notes,
    setNotes,
    editIndex,
    setEditIndex,
    isNoteContentEdited,
    setIsNoteContentEdited,
    isNoteListOpen,
    setIsNoteListOpen,
  } = useEditorContext();


  // Load saved editor and noteList from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("textEditorContent") || "";
    setEditorContent(savedContent);

    const savedNotes = localStorage.getItem("noteList") || "[]";
    const parsedSavedNotes = JSON.parse(savedNotes);
    setNotes(parsedSavedNotes);

    const savedEditIndex = localStorage.getItem("editIndex");
    const parsedEditIndex: number | null = savedEditIndex
      ? JSON.parse(savedEditIndex)
      : null;
    setEditIndex(parsedEditIndex);
  }, [setEditorContent, setNotes, setEditIndex]);

  const toggleNoteList = useCallback(() => {
    setIsNoteListOpen((isOpen: boolean) => !isOpen);
  }, []);

  const handleSaveNote = useCallback(
    (editorContent: Note["content"]) => {
      const isNewNote = editIndex === null;
      const updatedNote = isNewNote
        ? {
            content: editorContent,
            createdAt: new Date(),
          }
        : {
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
    [editIndex, notes, setNotes, setEditIndex, setIsNoteContentEdited]
  );

  return (
    <>
      <main class="m-5 flex-grow flex flex-col overflow-hidden">
        <TextEditor />
        <NoteList
          notes={notes}
          isOpen={isNoteListOpen}
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
