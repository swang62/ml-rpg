import { useAction, useSubmission } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import LogIn from "lucide-solid/icons/log-in";
import LogOut from "lucide-solid/icons/log-out";
import Pencil from "lucide-solid/icons/pencil";
import RotateCcw from "lucide-solid/icons/rotate-ccw";
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
import { logoutAction } from "~/server/auth";
import { resetAllProgressAction } from "~/server/mutations";
import { updateUserNameAction } from "~/server/user";
import {
  resetAnonAllProgress,
  setAnonDisplayName,
} from "~/utils/client-storage";
import { LEVELS, type LevelDef } from "~/utils/constants";
import { getAvatarStyle, getLevel } from "~/utils/xp";

interface Props {
  open: boolean;
  userName: string | null | undefined;
  displayName: string | null | undefined;
  totalXp: number;
  completionPercent: number;
  signedIn: boolean;
  onLogin: () => void;
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
      class="inline-flex hover:cursor-pointer text-nowrap items-center gap-2 px-4 py-2 border-2 border-border rounded font-pixel text-[0.6rem] text-muted hover:text-red-400 hover:border-red-400 hover:bg-surface-hover transition-colors duration-150"
      onClick={props.onClick}
    >
      <RotateCcw size={13} />
      Reset All
    </button>
  );
}

export default function PlayerSheet(props: Props) {
  const [editing, setEditing] = createSignal(false);
  const [draftName, setDraftName] = createSignal(props.displayName ?? "");
  const [showResetConfirm, setShowResetConfirm] = createSignal(false);
  const updateName = useAction(updateUserNameAction);
  const submission = useSubmission(updateUserNameAction);
  const resetAllProgress = useAction(resetAllProgressAction);

  const isMac = () =>
    typeof navigator !== "undefined" && navigator.platform.includes("Mac");

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

  createEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !editing()) props.onClose();
    };
    document.addEventListener("keydown", onKey);
    onCleanup(() => document.removeEventListener("keydown", onKey));
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
          <div class="pointer-events-auto w-[min(740px,88vw)] max-h-[min(85vh,720px)] overflow-y-auto bg-surface border-[3px] border-border rounded-lg p-7 flex flex-col gap-5 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]">
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
                        class="inline-flex text-nowrap items-center gap-2 px-4 py-2 border-2 border-border rounded font-pixel text-[0.6rem] text-muted hover:cursor-pointer hover:text-level-category/90 hover:border-level-category/90 hover:bg-surface-hover transition-colors duration-150"
                        onClick={props.onLogin}
                      >
                        <LogIn size={13} />
                        Sign In
                      </button>
                      <ResetButton onClick={() => setShowResetConfirm(true)} />
                    </div>
                    <span class="font-pixel text-[0.75rem] text-muted text-right">
                      Logged out: <span class="text-accent">local-only</span>
                    </span>
                  </div>
                }
              >
                <div class="flex items-center justify-between flex-wrap">
                  <div class="flex items-center gap-2">
                    <form action={logoutAction} method="post">
                      <button
                        type="submit"
                        class="inline-flex hover:cursor-pointer text-nowrap items-center gap-2 px-4 py-2 border-2 border-border rounded font-pixel text-[0.6rem] text-muted hover:text-red-400 hover:border-red-400 hover:bg-surface-hover transition-colors duration-150"
                      >
                        <LogOut size={13} />
                        Sign Out
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

            {/* Keyboard Shortcuts */}
            <div class="shortcuts-bar">
              <span class="shortcuts-bar__item">
                <kbd>⌫</kbd>
                <span>back</span>
              </span>
              <span class="shortcuts-bar__item">
                <kbd>{isMac() ? "⌘" : "Ctrl"}</kbd>
                <span>+</span>
                <kbd>K</kbd>
                <span>search</span>
              </span>
              <span class="shortcuts-bar__item">
                <kbd>{isMac() ? "⌘" : "Ctrl"}</kbd>
                <span>+</span>
                <kbd>H</kbd>
                <span>AI</span>
              </span>
              <span class="shortcuts-bar__item">
                <kbd>←</kbd>
                <kbd>→</kbd>
                <kbd>↑</kbd>
                <kbd>↓</kbd>
                <span>nav</span>
              </span>
              <span class="shortcuts-bar__item">
                <kbd>↵</kbd>
                <span>select</span>
              </span>
              <span class="shortcuts-bar__item">
                <kbd>Esc</kbd>
                <span>close</span>
              </span>
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
                    class="inline-flex items-center gap-2 px-5 py-2 border-2 border-border rounded font-pixel text-[0.6rem] text-muted hover:text-heading hover:border-accent transition-colors duration-150 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </Portal>
    </Show>
  );
}
