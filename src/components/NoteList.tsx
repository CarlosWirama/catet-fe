import { type JSX } from "preact";
import type { Note } from "../types/note";
import NoteBubble from "./NoteBubble";

type NoteListProp = JSX.HTMLAttributes<HTMLDivElement> & {
  notes: Note[];
};

export default function NoteList({ notes, ...props }: NoteListProp) {
  const className = props.className ?? props.class ?? "";

  const containerClass = "rounded";
  const contentClass = "bg-zinc-800 p-2.5 text-base";
  return (
    <div {...props} class={`${containerClass} ${contentClass} ${className}`}>
      {notes.map((note) => <NoteBubble {...note} />)}
    </div>
  );
}
