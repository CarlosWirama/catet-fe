import { useState, useEffect, useCallback } from "preact/hooks";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";
import { Note } from "../types/note";
import Toolbar from "../components/Toolbar";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load noteList from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("noteList") || "[]";
    const parsedSavedNotes = JSON.parse(savedNotes);
    setNotes(parsedSavedNotes);
  }, []);

  const handleSaveNote = useCallback(
    (newContent: Note["content"]) => {
      const isNewNote = editIndex === null;
      const updatedNote = {
        content: newContent,
        createdAt: new Date(),
        [isNewNote ? 'createdAt' : 'editedAt']: new Date(),
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
      }
    },
    [notes]
  );

  return (
    <>
      {/* <Header /> */}
      <main class="m-5 flex-grow flex flex-col overflow-hidden">
        {/* <img src={preactLogo} alt="Preact logo" height="160" width="160" /> */}
        {/* <Toolbar /> */}
        <TextEditor
          onSaveNote={handleSaveNote}
          class="min-h-24 overflow-auto"
        />
        <NoteList notes={notes} class="max-h-1/8 flex-shrink-0" />
      </main>
    </>
  );
}
