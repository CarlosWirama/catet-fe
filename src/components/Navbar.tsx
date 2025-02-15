import { useCallback } from "preact/hooks";
import { useLocation } from "preact-iso";
import { useEditorContext } from "../context/EditorContext";
import { svgPaths } from "../icons/svgPaths";
import type { Note } from "../types/note";
import IconButton from "./IconButton";

export default function Navbar({ onMenuClick }) {
  const { url } = useLocation();

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

  const handleClearNote = useCallback(() => {
    setEditorContent("");
    setIsNoteContentEdited(false);
    localStorage.setItem("textEditorContent", "");
    localStorage.setItem("editIndex", "");
    setEditIndex(null);
  }, [setEditorContent, setIsNoteContentEdited, setEditIndex]);
  
  return (
    <nav class="flex items-center justify-between p-2 bg-gray-800 text-white">
      <IconButton
        onClick={handleClearNote}
        svgPath={svgPaths.x}
      />
      <IconButton
        onClick={onMenuClick}
        svgPath={svgPaths.menu}
      />
      <IconButton
        onClick={() => handleSaveNote(editorContent)}
        svgPath={svgPaths.save}
        class={`${isNoteContentEdited ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer' : 'text-gray-600'} transition-all text-xl shadow-lg`}
      />
    </nav>
  );
}
