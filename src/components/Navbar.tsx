import { useLocation } from "preact-iso";

export default function Navbar({ isNoteEdited, onMenuClick, onSaveNote }) {
  const { url } = useLocation();

  return (
    <nav class="flex items-center justify-between p-4 bg-gray-800 text-white">
      <button role="button" type="button">
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
            d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196zM12 12a3 3 0 100-6 3 3 0 000 6z"
          ></path>
        </svg>
      </button>
      <button onClick={onMenuClick} role="button" type="button">
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
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <button
        onClick={onSaveNote}
        class={`${isNoteEdited ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer' : 'text-gray-600'} transition-all text-xl shadow-lg`}
        role="button"
        type="button"
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </nav>
  );
}
