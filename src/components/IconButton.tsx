import { type JSX } from "preact";
import { useCallback, useState } from "preact/hooks";

interface IconButtonProps {
  onClick: JSX.MouseEventHandler<HTMLButtonElement>;
  svgPath: string;
  disabled?: boolean;
  class?: string;
  className?: string;
}

export default function IconButton({
  onClick,
  svgPath,
  disabled = false,
  class: classProp = "",
  className = "",
}: IconButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const containerClass = "p-2 min-w-[44px] min-h-[44px] cursor-pointer";
  const animationClass = `transition-colors ${
    isActive ? "bg-white/20 duration-75" : "bg-transparent duration-400"
  }`;
  const disabledClass = disabled ? "opacity-40 cursor-not-allowed" : "";

  const handlePointerDown = useCallback(() => {
    return disabled || setIsActive(true);
  }, [disabled]);

  return (
    <button
      class={`${containerClass} ${animationClass} ${disabledClass} ${className} ${classProp}`}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setIsActive(false)}
      onPointerLeave={() => setIsActive(false)}
      disabled={disabled}
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
