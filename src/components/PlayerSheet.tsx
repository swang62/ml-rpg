import { useAction, useSubmission } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import LogIn from "lucide-solid/icons/log-in";
import LogOut from "lucide-solid/icons/log-out";
import Pencil from "lucide-solid/icons/pencil";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
import UserPlus from "lucide-solid/icons/user-plus";
import X from "lucide-solid/icons/x";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import { formLogin, formSignup, logoutAction } from "~/server/auth";
import {
  resetAllProgressAction,
  updateUserNameAction,
} from "~/server/mutations";
import {
  LEVELS,
  type LevelDef,
  SESSION_TIMEOUT_DAYS,
  SHORTCUTS,
} from "~/utils/constants";
import { setupFocusTrap } from "~/utils/focus-trap";
import {
  resetAnonAllProgress,
  setAnonDisplayName,
} from "~/utils/local-storage";
import { getAvatarStyle, getLevel } from "~/utils/xp";

/** Wrap the first occurrence of `key` in `text` with a .shortcut-letter span. */
function HighlightKey(props: { text: string; key: string }) {
  const idx = props.text.toLowerCase().indexOf(props.key.toLowerCase());
  if (idx === -1) return <>{props.text}</>;
  return (
    <span>
      {props.text.slice(0, idx)}
      <span class="shortcut-letter">{props.text[idx]}</span>
      {props.text.slice(idx + 1)}
    </span>
  );
}

interface Props {
  open: boolean;
  userName: string | null | undefined;
  displayName: string | null | undefined;
  totalXp: number;
  completionPercent: number;
  signedIn: boolean;
  onClose: () => void;
}

function LevelRow(props: { lvl: LevelDef; currentLevel: number }) {
  const isCurrent = props.lvl.level === props.currentLevel;
  const avatarStyle = getAvatarStyle(props.lvl.level);
  return (
    <div
      class={`grid grid-cols-[24px_44px_1fr_auto] items-center gap-4 px-6 py-1 transition-colors duration-150 ${isCurrent ? "bg-[rgba(103,166,244,0.3)] rounded-xl shadow-[inset_2px_0_0_#60a5fa]" : ""}`}
    >
      <div
        class={`w-6 h-6 flex items-center justify-center overflow-hidden border rounded-full`}
        style={avatarStyle}
      >
        <img
          class={`w-6 h-6 mix-blend-screen brightness-125 ${isCurrent ? "brightness-150 sepia-[0.6] saturate-[4] hue-rotate-340" : ""}`}
          style={{ "image-rendering": "pixelated" }}
          src={`/assets/avatars/lvl${props.lvl.level}.svg`}
          alt=""
        />
      </div>
      <span class={`font-pixel text-[0.7rem] text-accent`}>
        Lv.{props.lvl.level}
      </span>
      <span
        class={`font-pixel text-[0.6rem]  ${isCurrent ? "text-level-section" : "text-base"}`}
      >
        {props.lvl.title}
      </span>
      <span
        class={`font-pixel text-[0.6rem] whitespace-nowrap text-right ${isCurrent ? "text-level-category" : "text-muted"}`}
      >
        {props.lvl.xpRequired}
      </span>
    </div>
  );
}

function ResetButton(props: { onClick: () => void }) {
  return (
    <button
      type="button"
      class="inline-flex hover:cursor-pointer text-nowrap items-center gap-2 px-4 py-2 border-2 rounded font-pixel text-[0.6rem] text-red-400/80 border-red-400/80 hover:text-red-400 hover:border-red-400 hover:bg-surface-hover transition-colors duration-150"
      onClick={props.onClick}
    >
      <RotateCcw size={13} />
      <HighlightKey text="Reset All" key={SHORTCUTS.RESET} />
    </button>
  );
}

export default function PlayerSheet(props: Props) {
  const [editing, setEditing] = createSignal(false);
  const [draftName, setDraftName] = createSignal(props.displayName ?? "");
  const [showResetConfirm, setShowResetConfirm] = createSignal(false);
  const [showLogin, setShowLogin] = createSignal(false);
  const [showSignup, setShowSignup] = createSignal(false);
  let sheetRef: HTMLDivElement | undefined;
  let usernameRef: HTMLInputElement | undefined;
  let signupUsernameRef: HTMLInputElement | undefined;
  const updateName = useAction(updateUserNameAction);
  const submission = useSubmission(updateUserNameAction);
  const loginSubmission = useSubmission(formLogin);
  const signupSubmission = useSubmission(formSignup);
  const resetAllProgress = useAction(resetAllProgressAction);

  const currentLevel = createMemo(() => getLevel(props.totalXp));

  const handleSave = () => {
    const name = draftName().trim();
    if (!name) return;
    if (props.signedIn) {
      updateName(name);
    } else {
      setAnonDisplayName(name);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setDraftName(props.displayName ?? "");
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const logout = useAction(logoutAction);

  createEffect(() => {
    if (!props.open) return;
    const onKey = async (e: KeyboardEvent) => {
      // Ignore when editing a text field
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "Escape" && !editing()) {
        if (showResetConfirm()) {
          setShowResetConfirm(false);
        } else if (showLogin()) {
          setShowLogin(false);
        } else if (showSignup()) {
          setShowSignup(false);
        } else {
          props.onClose();
        }
        return;
      }

      if (isInput) return;

      // S — signup form
      if (e.key === SHORTCUTS.SIGNUP) {
        e.preventDefault();
        setShowSignup(true);
        return;
      }

      // L — login (signed out) or logout (signed in)
      if (e.key === SHORTCUTS.LOGIN) {
        e.preventDefault();
        if (props.signedIn) {
          logout();
        } else {
          setShowLogin(true);
        }
        return;
      }

      // R — reset confirmation
      if (e.key === SHORTCUTS.RESET) {
        e.preventDefault();
        setShowResetConfirm(true);
        return;
      }

      // Enter — confirm reset
      if (e.key === "Enter" && showResetConfirm()) {
        e.preventDefault();
        if (props.signedIn) {
          await resetAllProgress();
        } else {
          resetAnonAllProgress();
        }
        setShowResetConfirm(false);
        props.onClose();
        return;
      }
    };
    document.addEventListener("keydown", onKey);
    // Focus trap — Tab/Shift+Tab cycles within the sheet
    const trapCleanup = sheetRef ? setupFocusTrap(sheetRef) : () => {};
    onCleanup(() => {
      document.removeEventListener("keydown", onKey);
      trapCleanup();
    });
  });

  createEffect(() => {
    if (!showLogin()) return;
    queueMicrotask(() => usernameRef?.focus());
  });

  createEffect(() => {
    if (!showSignup()) return;
    queueMicrotask(() => signupUsernameRef?.focus());
  });

  createEffect(() => {
    if (props.signedIn) {
      if (showSignup()) {
        setShowSignup(false);
        props.onClose();
      }
      return;
    }

    if (
      signupSubmission.input &&
      !signupSubmission.pending &&
      !signupSubmission.error
    ) {
      setShowSignup(false);
      props.onClose();
    }
  });

  createEffect(() => {
    // Close login modal when the user becomes signed in
    // (handles both initial login and edge cases with submission state)
    if (props.signedIn) {
      if (showLogin()) {
        setShowLogin(false);
        props.onClose();
      }
      return;
    }

    // Close on successful form submission (belt-and-suspenders)
    if (
      loginSubmission.input &&
      !loginSubmission.pending &&
      !loginSubmission.error
    ) {
      setShowLogin(false);
      props.onClose();
    }
  });

  const btn =
    "inline-flex items-center justify-center p-1 border-2 border-border rounded cursor-pointer bg-transparent text-muted hover:text-accent hover:border-orange-400 hover:bg-surface-hover transition-colors duration-150";
  const btnConfirm =
    "inline-flex items-center justify-center p-1 border-2 border-level-category rounded cursor-pointer bg-transparent text-level-category hover:text-heading hover:bg-[rgba(52,211,153,0.15)] hover:border-level-category transition-colors duration-150";

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
          <div
            ref={sheetRef}
            class="pointer-events-auto w-[min(740px,88vw)] max-h-[min(85vh,720px)] overflow-y-auto bg-surface border-[3px] border-border rounded-lg p-7 flex flex-col gap-5 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]"
          >
            <button
              type="button"
              onClick={props.onClose}
              class="absolute top-4 right-4 inline-flex items-center gap-1.5 z-10 cursor-pointer bg-transparent border-none text-muted hover:text-heading transition-colors duration-150"
              aria-label="Close"
            >
              <kbd class="shortcut-kbd hidden md:inline-flex">esc</kbd>
              <X size={18} class="inline-flex md:hidden" />
            </button>
            {/* Player info */}
            <div class="flex flex-col gap-2 items-center">
              <div class="grid grid-cols-2 md:grid-cols-5 items-center gap-8 w-full">
                <span class="col-span-1 font-pixel text-muted text-right whitespace-nowrap">
                  Name
                </span>
                <Show
                  when={editing()}
                  fallback={
                    <div class="flex items-center gap-2">
                      <span class="font-pixel text-[1.05rem] text-heading text-nowrap">
                        {props.displayName}
                      </span>
                      <button
                        type="button"
                        class={btn}
                        onClick={() => {
                          setDraftName(props.displayName ?? "");
                          setEditing(true);
                        }}
                        aria-label="Edit name"
                      >
                        <Pencil size={13} class="text-orange-400" />
                      </button>
                    </div>
                  }
                >
                  <div class="flex items-center gap-2">
                    <input
                      class="font-pixel text-[1rem] text-heading bg-surface-hover border-2 border-accent rounded-sm px-2 py-1 outline-none tracking-[0.02em] focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
                      value={draftName()}
                      onInput={(e) => setDraftName(e.currentTarget.value)}
                      onKeyDown={handleKeyDown}
                      autofocus
                      type="text"
                      maxLength={32}
                    />
                    <button
                      type="button"
                      class={btnConfirm}
                      onClick={handleSave}
                      disabled={submission.pending}
                      aria-label="Save name"
                    >
                      <Check size={13} />
                    </button>
                    <button
                      type="button"
                      class={btn}
                      onClick={handleCancel}
                      aria-label="Cancel"
                    >
                      <X size={13} class="text-red-400" />
                    </button>
                  </div>
                </Show>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-5 items-center gap-8  w-full">
                <span class="col-span-1 font-pixel text-muted text-right whitespace-nowrap">
                  Rank
                </span>
                <div class="inline-flex items-baseline gap-4">
                  <span class="font-pixel text-accent whitespace-nowrap">
                    Lv.{currentLevel().level}
                  </span>
                  <span class="text-level-section font-pixel whitespace-nowrap">
                    {currentLevel().title}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-5 items-center gap-8  w-full">
                <span class="col-span-1 font-pixel text-muted text-right whitespace-nowrap">
                  Current
                </span>
                <span class="font-pixel flex-nowrap flex text-nowrap gap-4">
                  <span class="text-level-category">{props.totalXp} XP</span>
                  <Show when={props.signedIn}>
                    <span class="text-muted hidden md:block">
                      {" "}
                      (
                      {props.completionPercent.toLocaleString(undefined, {
                        style: "percent",
                        minimumFractionDigits: 1,
                      })}{" "}
                      complete)
                    </span>
                  </Show>
                </span>
              </div>
            </div>

            {/* Level chart */}
            <div class=" border-border rounded-lg bg-black max-h-[50vh] overflow-auto">
              <div class="font-pixel text-[0.6rem] text-muted tracking-[0.06em] uppercase text-center py-2 border-b-2 border-border bg-[rgba(0,0,0,0.2)]">
                Levels
              </div>
              <div class="flex flex-col md:flex-row py-4 px-2">
                <div class="flex-1 flex flex-col">
                  <For each={LEVELS.slice(0, 10)}>
                    {(lvl) => (
                      <LevelRow lvl={lvl} currentLevel={currentLevel().level} />
                    )}
                  </For>
                </div>
                <div class="flex-1 flex flex-col">
                  <For each={LEVELS.slice(10, 20)}>
                    {(lvl) => (
                      <LevelRow lvl={lvl} currentLevel={currentLevel().level} />
                    )}
                  </For>
                </div>
              </div>
              <div class="flex-1 flex justify-center mb-3">
                <For each={LEVELS.slice(20)}>
                  {(lvl) => (
                    <LevelRow lvl={lvl} currentLevel={currentLevel().level} />
                  )}
                </For>
              </div>
            </div>

            {/* Login / Logout / Reset Progress */}
            <div>
              <Show
                when={props.signedIn}
                fallback={
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="inline-flex text-nowrap items-center gap-2 px-4 py-2 border-2 rounded font-pixel text-[0.6rem] hover:cursor-pointer text-level-category/80 border-level-category/80 hover:text-level-category/90 hover:border-level-category/90 hover:bg-surface-hover transition-colors duration-150"
                        onClick={() => setShowLogin(true)}
                      >
                        <LogIn size={13} />
                        <HighlightKey text="Log In" key={SHORTCUTS.LOGIN} />
                      </button>
                      <button
                        type="button"
                        class="inline-flex text-nowrap items-center gap-2 px-4 py-2 border-2 rounded font-pixel text-[0.6rem] hover:cursor-pointer text-accent/80 border-accent/80 hover:text-accent hover:border-accent hover:bg-surface-hover transition-colors duration-150"
                        onClick={() => setShowSignup(true)}
                      >
                        <UserPlus size={13} />
                        <HighlightKey text="Sign Up" key={SHORTCUTS.SIGNUP} />
                      </button>
                    </div>
                    <span class="font-pixel text-[0.75rem] text-muted text-right gap-4 flex justify-center items-center">
                      <ResetButton onClick={() => setShowResetConfirm(true)} />
                    </span>
                  </div>
                }
              >
                <div class="flex items-center justify-between flex-wrap">
                  <div class="flex items-center gap-2">
                    <form action={logoutAction} method="post">
                      <button
                        type="submit"
                        class="inline-flex hover:cursor-pointer text-nowrap items-center gap-2 px-4 py-2 border-2 rounded font-pixel text-[0.6rem] text-red-400/80 border-red-400/80 hover:text-red-400 hover:border-red-400 hover:bg-surface-hover transition-colors duration-150"
                      >
                        <LogOut size={13} />
                        <HighlightKey text="Log Out" key={SHORTCUTS.LOGIN} />
                      </button>
                    </form>
                    <ResetButton onClick={() => setShowResetConfirm(true)} />
                  </div>
                  <span class="font-pixel text-[0.75rem] text-muted text-right">
                    Logged in as{" "}
                    <span class="text-accent">{props.userName}</span>
                  </span>
                </div>
              </Show>
            </div>
          </div>
        </div>

        <Show when={showResetConfirm()}>
          <div class="contents">
            <button
              type="button"
              class="fixed inset-0 z-15000 bg-[rgba(0,0,0,0.6)] appearance-none border-none cursor-default"
              aria-label="Close"
            />
            <div class="fixed inset-0 z-16000 flex items-center justify-center pointer-events-none">
              <div class="pointer-events-auto w-[min(360px,80vw)] bg-surface border-[3px] border-border rounded-lg p-6 flex flex-col gap-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]">
                <p class="font-pixel text-[0.75rem] text-heading text-center leading-relaxed">
                  Reset ALL progress?
                  <br />
                  <span class="text-red-400">This cannot be undone.</span>
                </p>
                <div class="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      if (props.signedIn) {
                        await resetAllProgress();
                      } else {
                        resetAnonAllProgress();
                      }
                      setShowResetConfirm(false);
                      props.onClose();
                    }}
                    class="inline-flex items-center gap-2 px-5 py-2 border-2 border-red-500 rounded font-pixel text-[0.6rem] text-red-400 hover:bg-[rgba(239,68,68,0.15)] hover:text-red-300 transition-colors duration-150 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    class="inline-flex items-center gap-2 px-5 py-2 border-2 rounded font-pixel text-[0.6rem] cursor-pointer text-accent/80 border-accent/80 hover:text-heading hover:border-accent transition-colors duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Show>

        <Show when={showLogin()}>
          <div class="contents">
            <button
              type="button"
              class="fixed inset-0 z-15000 bg-[rgba(0,0,0,0.6)] appearance-none border-none cursor-default"
              onClick={() => setShowLogin(false)}
              aria-label="Close"
            />
            <div class="fixed inset-0 z-16000 flex items-center justify-center pointer-events-none">
              <div class="pointer-events-auto w-[min(400px,88vw)] overflow-y-auto bg-surface border-[3px] border-border rounded-lg p-7 flex flex-col gap-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]">
                <h2 class="font-pixel text-[0.8rem] text-heading text-center">
                  Log In
                </h2>
                <form
                  action={formLogin}
                  method="post"
                  class="flex flex-col gap-4"
                >
                  <label class="flex flex-col gap-1">
                    <span class="font-pixel text-[0.6rem] text-muted tracking-[0.06em] uppercase">
                      Username
                    </span>
                    <input
                      ref={usernameRef}
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
                    disabled={loginSubmission.pending}
                    class="hover:cursor-pointer  w-full px-4 py-2 font-pixel text-[0.65rem] text-heading bg-surface-hover border-2 border-border rounded hover:bg-accent-glow hover:border-accent transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loginSubmission.pending ? "Logging in..." : "Login"}
                  </button>
                  <Show when={loginSubmission.error} keyed>
                    {({ message }) => (
                      <p class="font-pixel text-[0.55rem] text-center text-red-400">
                        {message}
                      </p>
                    )}
                  </Show>
                </form>
              </div>
            </div>
          </div>
        </Show>

        <Show when={showSignup()}>
          <div class="contents">
            <button
              type="button"
              class="fixed inset-0 z-15000 bg-[rgba(0,0,0,0.6)] appearance-none border-none cursor-default"
              onClick={() => setShowSignup(false)}
              aria-label="Close"
            />
            <div class="fixed inset-0 z-16000 flex items-center justify-center pointer-events-none">
              <div class="pointer-events-auto w-[min(400px,88vw)] overflow-y-auto bg-surface border-[3px] border-border rounded-lg p-7 flex flex-col gap-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]">
                <h2 class="font-pixel text-[0.8rem] text-heading text-center">
                  Sign Up
                </h2>
                <p class="font-pixel text-[0.55rem] text-muted text-center leading-relaxed">
                  Inactive accounts over {SESSION_TIMEOUT_DAYS} days will be
                  automatically deleted.
                </p>
                <form
                  action={formSignup}
                  method="post"
                  class="flex flex-col gap-4"
                >
                  <label class="flex flex-col gap-1">
                    <span class="font-pixel text-[0.6rem] text-muted tracking-[0.06em] uppercase">
                      Username
                    </span>
                    <input
                      ref={signupUsernameRef}
                      name="username"
                      type="text"
                      autocomplete="username"
                      placeholder="Choose a username"
                      required
                      class="bg-surface-hover border-2 border-border rounded-sm px-3 py-2 font-pixel text-[0.7rem] text-heading outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
                    />
                  </label>
                  <label class="flex flex-col gap-1">
                    <span class="font-pixel text-[0.6rem] text-muted tracking-[0.06em] uppercase">
                      Password
                    </span>
                    <input
                      name="password"
                      type="password"
                      autocomplete="new-password"
                      placeholder="Create a password"
                      minLength={6}
                      required
                      class="bg-surface-hover border-2 border-border rounded-sm px-3 py-2 font-pixel text-[0.7rem] text-heading outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={signupSubmission.pending}
                    class="hover:cursor-pointer w-full px-4 py-2 font-pixel text-[0.65rem] text-heading bg-surface-hover border-2 border-border rounded hover:bg-accent-glow hover:border-accent transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {signupSubmission.pending
                      ? "Creating account..."
                      : "Create account"}
                  </button>
                  <Show when={signupSubmission.error} keyed>
                    {({ message }) => (
                      <p class="font-pixel text-[0.55rem] text-center text-red-400">
                        {message}
                      </p>
                    )}
                  </Show>
                </form>
              </div>
            </div>
          </div>
        </Show>
      </Portal>
    </Show>
  );
}
