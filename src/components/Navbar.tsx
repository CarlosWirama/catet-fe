import { useLocation } from "preact-iso";
import IconButton from "./IconButton";
import { svgPaths } from "../icons/svgPaths";

export default function Navbar({ isNoteEdited, onMenuClick, onSaveNote }) {
  const { url } = useLocation();

  return (
    <nav class="flex items-center justify-between p-2 bg-gray-800 text-white">
      <IconButton
        onClick={() => {}}
        svgPath={svgPaths.profile}
      />
      <IconButton
        onClick={onMenuClick}
        svgPath={svgPaths.menu}
      />
      
      <IconButton
        onClick={onSaveNote}
        svgPath={svgPaths.save}
        class={`${isNoteEdited ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer' : 'text-gray-600'} transition-all text-xl shadow-lg`}
      />
    </nav>
  );
}
