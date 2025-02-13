import { type JSX } from "preact";
import type { Note } from "../types/note";
import NoteBubble from "./NoteBubble";

interface NoteListProp {
  notes: Note[];
  isOpen: boolean;
  onClose: JSX.MouseEventHandler<HTMLButtonElement>;
}

export default function NoteList({ notes, isOpen, onClose }: NoteListProp) {
  return (
    <div
      class={`fixed top-0 left-0 h-full w-full bg-gray-800 text-white transition-transform transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <button
        class="absolute top-4 right-4"
        onClick={onClose}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="rounded bg-zinc-800 p-2.5 text-base">
        {notes.map((note) => <NoteBubble {...note} />)}
      </div>
    </div>
  );
}