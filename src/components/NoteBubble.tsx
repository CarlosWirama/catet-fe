import { type JSX } from "preact";
import type { Note } from "../types/note";

export default function NoteBubble({
  content,
  createdAt,
  editedAt,
  ...props
}: JSX.HTMLAttributes<HTMLDivElement> & Note) {
  const className = props.className ?? props.class ?? "";

  const containerClass = "my-5 w-max rounded";
  const contentClass = "bg-green-900 p-2.5 text-base flex flex-col";
  const timestamp = (editedAt || createdAt).toDateString();
  return (
    <div {...props} class={`${containerClass} ${contentClass} ${className}`}>
        <div>{content}</div>
        <div class="text-right text-xs">{timestamp}</div>
    </div>
  );
}
