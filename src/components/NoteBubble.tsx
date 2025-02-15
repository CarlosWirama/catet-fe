import { useState, useCallback } from "preact/hooks";
import { type JSX } from "preact";
import type { Note } from "../types/note";
import { useEditorContext } from "../context/EditorContext";
import IconButton from "./IconButton";
import { svgPaths } from "../icons/svgPaths";

export default function NoteBubble({
  content,
  createdAt,
  editedAt,
}: JSX.HTMLAttributes<HTMLDivElement> & Note) {
  const { notes, setNotes, setEditIndex, setEditorContent, setIsNoteListOpen } =
    useEditorContext();

  const timestamp = new Date(editedAt || createdAt).toDateString();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>(null);

  const handleLongPress = () => setIsMenuVisible(true);
  const handleMouseEnter = () => setIsMenuVisible(true);
  const handleMouseLeave = () => setIsMenuVisible(false);

  const handleTouchStart = () => {
    const newTimer = setTimeout(handleLongPress, 1000);
    setTimerId(newTimer);
  };
  const handleTouchEnd = () => clearTimeout(timerId);

  // TODO use id instead of content
  const handleEdit = useCallback(() => {
    const index = notes.findIndex((note) => note.content === content)
    setEditIndex(index);
    const content = notes.find((note) => note.content === content)?.content || ""
    setEditorContent(content);
    setIsNoteListOpen(false);
    
    localStorage.setItem("textEditorContent", JSON.stringify(content));
    localStorage.setItem("editIndex", index.toString());
  }, [content, notes, setEditIndex, setEditorContent]);

  const handleDelete = useCallback(() => {
    setNotes(notes.filter((note) => note.content !== content));
    setEditIndex(null);
  }, [content, notes, setNotes]);

  return (
    <div
      class="my-5 w-max rounded relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div class="bg-green-900 p-2.5 text-base flex flex-col">
        <div class="pr-2.5" dangerouslySetInnerHTML={{ __html: content }}></div>
        <div class="text-right text-xs mt-2 opacity-40">{timestamp}</div>
      </div>
      {isMenuVisible && (
        <div class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-end justify-center">
          <div class="bg-gray-800 p-2 rounded shadow-lg flex space-x-2">
            <IconButton onClick={handleEdit} svgPath={svgPaths.edit} />
            <IconButton onClick={handleDelete} svgPath={svgPaths.delete} />
            <IconButton onClick={() => {}} svgPath={svgPaths.copy} />
            {/* <IconButton
              onClick={() => {}}
              svgPath={svgPaths.info}
            />
            <IconButton
              onClick={() => {}}
              svgPath={svgPaths.more}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
}
