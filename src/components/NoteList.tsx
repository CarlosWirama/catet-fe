import { useEditorContext } from "../context/EditorContext";
import NoteBubble from "./NoteBubble";

export default function NoteList({ class: className = "" }) {
  const { notes, isNoteListOpen, setIsNoteListOpen } = useEditorContext();

  // TODO implement toggle button
  const toggleSidebar = () => {
    setIsNoteListOpen(!isNoteListOpen);
  };

  return (
    <div class={`bg-gray-900 px-5 overflow-auto ${className}`}>
      {notes.map((note, index) => (
        <NoteBubble {...note} key={`${index}${note.createdAt}`} />
      ))}
    </div>
  );
}
