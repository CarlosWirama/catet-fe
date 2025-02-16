import { useEditorContext } from "../context/EditorContext";
import NoteBubble from "./NoteBubble";

export default function NoteList() {
  const { notes, isNoteListOpen } = useEditorContext();
  const transitionClass = `transition-transform transform ${
    isNoteListOpen ? "translate-y-0" : "translate-y-full"
  }`;
  return (
    <div
      class={`absolute bg-gray-900 top-0 left-0 h-full w-full px-5 overflow-auto ${transitionClass}`}
    >
      {notes.map((note, index) => (
        <NoteBubble {...note} key={`${index}${note.createdAt}`} />
      ))}
    </div>
  );
}
