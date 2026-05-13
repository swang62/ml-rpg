import type { JSX } from "solid-js";

interface ResetButtonProps {
  onClick?: () => Promise<void>;
  children?: JSX.Element;
}

export default function ResetButton({ onClick, children }: ResetButtonProps) {
  return (
    <button type="button" class="subtitle-reset-btn" onClick={onClick}>
      {children}
    </button>
  );
}
