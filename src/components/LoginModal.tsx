import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { formLogin } from "~/server/auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal(props: Props) {
  const submission = useSubmission(formLogin);

  return (
    <Show when={props.open}>
      <Portal>
        <button
          type="button"
          class="fixed inset-0 z-8000 bg-[rgba(13,15,20,0.75)] backdrop-blur-xs appearance-none border-none cursor-pointer"
          onClick={props.onClose}
          aria-label="Close"
        />
        <div class="fixed inset-0 z-10000 flex items-center justify-center pointer-events-none">
          <div class="pointer-events-auto w-[min(400px,88vw)] overflow-y-auto bg-surface border-[3px] border-border rounded-lg p-7 flex flex-col gap-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]">
            <h2 class="font-pixel text-[0.8rem] text-heading text-center">
              Sign In
            </h2>
            <form action={formLogin} method="post" class="flex flex-col gap-4">
              <label class="flex flex-col gap-1">
                <span class="font-pixel text-[0.6rem] text-muted tracking-[0.06em] uppercase">
                  Username
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  placeholder="Enter your username"
                  required
                  class="bg-surface-hover border-2 border-border rounded-sm px-3 py-2 font-pixel text-[0.7rem] text-heading outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
                />
              </label>
              <label class="flex flex-col gap-1">
                <span class="font-pixel text-[0.6rem] text-muted tracking-[0.06em] uppercase">
                  Password
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Enter your password"
                  minLength={6}
                  required
                  class="bg-surface-hover border-2 border-border rounded-sm px-3 py-2 font-pixel text-[0.7rem] text-heading outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
                />
              </label>
              <button
                type="submit"
                disabled={submission.pending}
                class="w-full px-4 py-2 font-pixel text-[0.65rem] text-heading bg-surface-hover border-2 border-border rounded hover:bg-[rgba(96,165,250,0.15)] hover:border-accent transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submission.pending ? "Signing in..." : "Sign In"}
              </button>
              <Show when={submission.error} keyed>
                {({ message }) => (
                  <p class="font-pixel text-[0.55rem] text-center text-red-400">
                    {message}
                  </p>
                )}
              </Show>
            </form>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
