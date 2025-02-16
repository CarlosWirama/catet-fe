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
  const {
    notes,
    handleSetNotes,
    handleSetEditIndex,
    handleSetEditorContent,
    setIsNoteListOpen,
    isNoteContentEdited,
    handleSaveNote,
  } = useEditorContext();

  const timestamp = new Date(editedAt || createdAt).toDateString();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClick = () => setIsMenuVisible(true);
  const handleMouseLeave = () => setIsMenuVisible(false);

  // TODO use id instead of content
  const handleEdit = useCallback(() => {
    if (isNoteContentEdited) {
      const shouldSave = confirm(
        "Do you want to save the current note before editing another one?"
      );
      if (shouldSave) {
        handleSaveNote();
      } else {
        setIsNoteListOpen(false);
        return;
      }
    }
    const index = notes.findIndex((note) => note.content === content);
    handleSetEditIndex(index);
    handleSetEditorContent(content);
    setIsNoteListOpen(false);
  }, [
    content,
    notes,
    handleSetEditIndex,
    handleSetEditorContent,
    isNoteContentEdited,
    handleSaveNote,
  ]);

  const handleDelete = useCallback(() => {
    const updatedNotesList = notes.filter((note) => note.content !== content);
    handleSetNotes(updatedNotesList);
    handleSetEditorContent("");
    handleSetEditIndex(null);
  }, [content, notes, handleSetNotes, handleSetEditIndex]);

  return (
    <div
      class="my-5 w-max relative"
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onBlur={() => setIsMenuVisible(false)}
    >
      <div class="rounded bg-green-900 p-2.5 text-base flex flex-col">
        <div class="pr-2.5" dangerouslySetInnerHTML={{ __html: content }}></div>
        <div class="text-right text-xs mt-2 opacity-40">{timestamp}</div>
      </div>
      {isMenuVisible ? (
        <div class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-end justify-start">
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
      ) : null}
    </div>
  );
}
