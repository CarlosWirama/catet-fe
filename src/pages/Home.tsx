import { useState, useEffect, useCallback } from "preact/hooks";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import TextEditor from "../components/TextEditor";
import { Note } from "../types/note";
import Toolbar from "../components/Toolbar";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setNotes([
      { content: "TODO", createdAt: new Date() },
      { content: "m", createdAt: new Date() },
      { content: "NoteList", createdAt: new Date() },
    ]);
  }, []);

  const handleSaveNote = useCallback((newNote: Note) => {
    setNotes(notes => [newNote, ...notes]);
  }, []);

  return (
    <>
      {/* <Header /> */}
      <main class="m-5 flex-grow flex flex-col overflow-auto">
        {/* <img src={preactLogo} alt="Preact logo" height="160" width="160" /> */}
      	{/* <Toolbar /> */}
        <TextEditor
          isEditing={editIndex !== null}
          onSaveNote={handleSaveNote}
          class="flex-auto min-h-min"
        />
      	<NoteList notes={notes} class="min-h-10" />
      </main>
    </>
  );
}
