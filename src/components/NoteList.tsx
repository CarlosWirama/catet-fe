import type { Note } from "../types/note";
import NoteBubble from "./NoteBubble";

interface NoteListProp {
  notes: Note[];
  isOpen: boolean;
}

export default function NoteList({ notes, isOpen }: NoteListProp) {
  const transitionClass = `transition-transform transform ${
    isOpen ? "translate-y-0" : "translate-y-full"
  }`;
  return (
    <div
      class={`absolute bg-gray-900 top-0 left-0 h-full w-full px-5 overflow-auto ${transitionClass}`}
    >
      {notes.map((note) => (
        <NoteBubble {...note} />
      ))}
    </div>
  );
}
