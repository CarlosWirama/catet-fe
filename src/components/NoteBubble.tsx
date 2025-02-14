import { useState, useCallback } from "preact/hooks";
import { type JSX } from "preact";
import type { Note } from "../types/note";
import IconButton from "./IconButton";
import { svgPaths } from "../icons/svgPaths";

export default function NoteBubble({
  content,
  createdAt,
  editedAt,
}: JSX.HTMLAttributes<HTMLDivElement> & Note) {
  const timestamp = new Date(editedAt || createdAt).toDateString();
  
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLongPress = useCallback(() => setIsMenuVisible(true), []);
  const handleMouseEnter = useCallback(() => setIsMenuVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsMenuVisible(false), []);

  let timer: NodeJS.Timeout;
  const handleTouchStart = useCallback(() => timer = setTimeout(handleLongPress, 500), []);
  const handleTouchEnd = useCallback(() => clearTimeout(timer), [timer]);

  return (
    <div
      class="my-5 w-max rounded relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div class="bg-green-900 p-2.5 text-base flex flex-col">
        <div
          class="pr-2.5"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div class="text-right text-xs mt-2 opacity-40">{timestamp}</div>
      </div>
      {isMenuVisible && (
        <div class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-end justify-center">
          <div class="bg-gray-800 p-2 rounded shadow-lg flex space-x-2">
            <IconButton
              onClick={() => {}}
              svgPath={svgPaths.edit}
            />
            <IconButton
              onClick={() => {}}
              svgPath={svgPaths.delete}
            />
            <IconButton
              onClick={() => {}}
              svgPath={svgPaths.copy}
            />
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