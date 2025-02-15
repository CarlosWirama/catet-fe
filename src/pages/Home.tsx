import { useEffect, useCallback } from "preact/hooks";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";
import { useEditorContext } from "../context/EditorContext";

export default function Home() {
  const {
    setEditorContent,
    notes,
    setNotes,
    setEditIndex,
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
      />
    </>
  );
}
