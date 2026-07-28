import type { JSX } from "solid-js";
import { createSignal, Show } from "solid-js";

interface ResetButtonProps {
  onClick?: () => Promise<void>;
  children?: JSX.Element;
}

export default function ResetButton({ onClick, children }: ResetButtonProps) {
  const [loading, setLoading] = createSignal(false);

  const handleClick = async () => {
    if (loading() || !onClick) return;
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      class="subtitle-reset-btn btn-spinner-outer"
      onClick={handleClick}
      disabled={loading()}
    >
      <span
        class="btn-content"
        classList={{ "btn-content--hidden": loading() }}
      >
        {children}
      </span>
      <Show when={loading()}>
        <span class="btn-spinner" />
      </Show>
    </button>
  );
}
