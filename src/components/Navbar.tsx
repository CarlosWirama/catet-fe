import { useLocation } from "preact-iso";
import IconButton from "./IconButton";

export default function Navbar({ isNoteEdited, onMenuClick, onSaveNote }) {
  const { url } = useLocation();

  return (
    <nav class="flex items-center justify-between p-2 bg-gray-800 text-white">
      <IconButton
        onClick={() => {}}
        svgPath="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196zM12 12a3 3 0 100-6 3 3 0 000 6z"
      />
      <IconButton
        onClick={onMenuClick}
        svgPath="M4 6h16M4 12h16m-7 6h7"
      />
      
      <IconButton
        onClick={onSaveNote}
        svgPath="M5 13l4 4L19 7"
        class={`${isNoteEdited ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer' : 'text-gray-600'} transition-all text-xl shadow-lg`}
      />
    </nav>
  );
}
