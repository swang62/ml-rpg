import {
  type Component,
  createSignal,
  type JSX,
  onCleanup,
  onError,
  type ParentProps,
} from "solid-js";

interface Props extends ParentProps {
  fallback?: (err: Error, reset: () => void) => JSX.Element;
}

const DEFAULT_FALLBACK: NonNullable<Props["fallback"]> = (err, reset) => (
  <div class="flex flex-col items-center justify-center gap-4 py-16 px-4">
    <div class="font-pixel text-[0.7rem] text-red-400 tracking-widest uppercase">
      Something went wrong
    </div>
    <p class="text-sm text-muted max-w-md text-center font-pixel text-[0.6rem]">
      {err.message}
    </p>
    <button
      type="button"
      onClick={reset}
      class="mt-2 px-4 py-2 border-2 border-border rounded font-pixel text-[0.6rem] text-muted hover:text-heading hover:border-accent transition-colors duration-150 cursor-pointer"
    >
      Try again
    </button>
  </div>
);

/**
 * Error boundary using SolidJS's onError lifecycle.
 * Catches rendering errors from child components and displays a fallback.
 */
const ErrorBoundary: Component<Props> = (props) => {
  const [error, setError] = createSignal<Error | null>(null);
  const [count, setCount] = createSignal(0);

  onError((err) => {
    if (err instanceof Error) {
      setError(err);
    } else {
      setError(new Error(String(err)));
    }
  });

  onCleanup(() => {
    setError(null);
  });

  const reset = () => {
    setError(null);
    setCount((c) => c + 1); // force re-mount of children
  };

  const currentError = error();
  if (currentError) {
    return (props.fallback ?? DEFAULT_FALLBACK)(currentError, reset);
  }

  // key forces remount on reset, clearing any lingering error state
  return <div data-error-reset={count()}>{props.children}</div>;
};

export default ErrorBoundary;
