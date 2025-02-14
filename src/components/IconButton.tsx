import { type JSX } from 'preact';

interface IconButtonProps {
  onClick: JSX.MouseEventHandler<HTMLButtonElement>;
  svgPath: string;
  class?: string;
  className?: string;
}

export default function IconButton({
  onClick,
  svgPath,
  class: classProp = '',
  className = '',
}: IconButtonProps) {
  return (
    <button
      class={`icon-button p-2 min-w-[44px] min-h-[44px] cursor-pointer ${className} ${classProp}`}
      onClick={onClick}
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
          d={svgPath}
        />
      </svg>
    </button>
  );
}