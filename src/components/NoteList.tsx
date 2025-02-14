import { type JSX } from "preact";
import type { Note } from "../types/note";
import { svgPaths } from "../icons/svgPaths";
import NoteBubble from "./NoteBubble";
import IconButton from "./IconButton";

interface NoteListProp {
  notes: Note[];
  isOpen: boolean;
  onClose: JSX.MouseEventHandler<HTMLButtonElement>;
}

export default function NoteList({ notes, isOpen, onClose }: NoteListProp) {
  return (
    <div
      class={`fixed top-0 left-0 h-full w-full transition-transform transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <IconButton
        onClick={onClose}
        svgPath={svgPaths.x}
        className="absolute top-4 right-4"
      />
      <div class="rounded bg-zinc-800 p-2.5 text-base">
        {notes.map((note) => <NoteBubble {...note} />)}
      </div>
    </div>
  );
}