import { useAction, useSubmission } from "@solidjs/router";
import Check from "lucide-solid/icons/check";
import Pencil from "lucide-solid/icons/pencil";
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
import { updateUserNameAction } from "~/server/user";
import { AVATAR_TIERS, LEVELS } from "~/utils/constants";
import { getLevel, xpToNextLevel } from "~/utils/xp";

interface Props {
  open: boolean;
  userName: string | undefined;
  totalXp: number;
  onClose: () => void;
}

function fmtXp(n: number): string {
  return n.toLocaleString();
}

function _getTier(level: number) {
  return (
    AVATAR_TIERS.find((t) => level >= t.minLevel) ??
    AVATAR_TIERS[AVATAR_TIERS.length - 1]
  );
}

function LevelRow(props: {
  lvl: (typeof LEVELS)[number];
  currentLevel: number;
}) {
  const isCurrent = props.lvl.level === props.currentLevel;
  return (
    <div
      class={`grid grid-cols-[24px_34px_1fr_auto] items-center gap-[4px] px-[10px] py-[5px] transition-colors duration-150 ${isCurrent ? "bg-[rgba(96,165,250,0.18)] shadow-[inset_2px_0_0_#60a5fa]" : ""}`}
    >
      <div class="w-6 h-6 flex items-center justify-center overflow-hidden">
        <img
          class={`w-6 h-6 mix-blend-screen brightness-125 ${isCurrent ? "brightness-150 sepia-[0.6] saturate-[4] hue-rotate-[340deg]" : ""}`}
          style={{ "image-rendering": "pixelated" }}
          src={`/assets/avatars/lvl${props.lvl.level}.svg`}
          alt=""
        />
      </div>
      <span
        class={`font-pixel text-[0.6rem] leading-none whitespace-nowrap ${isCurrent ? "text-text-heading" : "text-accent"}`}
      >
        Lv.{props.lvl.level}
      </span>
      <span class="font-pixel text-[0.6rem] text-text leading-[1.4] truncate">
        {props.lvl.title}
      </span>
      <span
        class={`font-pixel text-[0.55rem] whitespace-nowrap text-right ${isCurrent ? "text-level-category" : "text-text-muted"}`}
      >
        {fmtXp(props.lvl.xpRequired)}
      </span>
    </div>
  );
}

export default function PlayerSheet(props: Props) {
  const [editing, setEditing] = createSignal(false);
  const [draftName, setDraftName] = createSignal(props.userName ?? "");
  const updateName = useAction(updateUserNameAction);
  const submission = useSubmission(updateUserNameAction);

  const currentLevel = createMemo(() => getLevel(props.totalXp));
  const nextXp = createMemo(() => xpToNextLevel(props.totalXp));

  const handleSave = () => {
    const name = draftName().trim();
    if (!name) return;
    updateName(name);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraftName(props.userName ?? "");
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
    "inline-flex items-center justify-center w-[30px] h-[30px] border-2 border-border rounded cursor-pointer bg-transparent text-text-muted hover:text-accent hover:border-accent hover:bg-surface-hover transition-colors duration-150";
  const btnConfirm =
    "inline-flex items-center justify-center w-[30px] h-[30px] border-2 border-level-category rounded cursor-pointer bg-transparent text-level-category hover:text-text-heading hover:bg-[rgba(52,211,153,0.15)] hover:border-level-category transition-colors duration-150";

  return (
    <Show when={props.open}>
      <Portal>
        <button
          type="button"
          class="fixed inset-0 z-8000 bg-[rgba(13,15,20,0.75)] backdrop-blur-[6px] appearance-none border-none cursor-pointer"
          onClick={props.onClose}
          aria-label="Close"
        />

        <div class="fixed inset-0 z-10000 flex items-center justify-center pointer-events-none">
          <div class="pointer-events-auto w-[min(740px,88vw)] max-h-[min(85vh,720px)] overflow-y-auto bg-surface border-[3px] border-border rounded-lg p-7 flex flex-col gap-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_48px_rgba(0,0,0,0.6)]">
            {/* Player info */}
            <div class="flex flex-col gap-2 items-center">
              <div class="grid grid-cols-2 items-center gap-8">
                <span class="col-span-1 font-pixel text-[0.7rem] text-text-muted tracking-[0.03em] text-right whitespace-nowrap">
                  Name
                </span>
                <Show
                  when={editing()}
                  fallback={
                    <div class="flex items-center gap-2">
                      <span class="font-pixel text-[1.05rem] text-text-heading tracking-[0.02em] uppercase">
                        {props.userName}
                      </span>
                      <button
                        type="button"
                        class={btn}
                        onClick={() => {
                          setDraftName(props.userName ?? "");
                          setEditing(true);
                        }}
                        aria-label="Edit name"
                      >
                        <Pencil size={13} />
                      </button>
                    </div>
                  }
                >
                  <div class="flex items-center gap-2">
                    <input
                      class="font-pixel text-[1rem] text-text-heading bg-surface-hover border-2 border-accent rounded-sm px-[10px] py-[4px] outline-none tracking-[0.02em] uppercase focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
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
                      <X size={13} />
                    </button>
                  </div>
                </Show>
              </div>

              <div class="grid grid-cols-2 items-center gap-8">
                <span class="col-span-1 font-pixel text-[0.7rem] text-text-muted tracking-[0.03em] text-right whitespace-nowrap">
                  Rank
                </span>
                <div class="inline-flex items-baseline gap-4">
                  <span class="font-pixel text-[0.9rem] text-accent tracking-[0.02em] whitespace-nowrap">
                    Lv.{currentLevel().level}
                  </span>
                  <span class="text-level-section font-pixel text-[0.9rem] tracking-[0.02em] whitespace-nowrap">
                    {currentLevel().title}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 items-center gap-8">
                <span class="col-span-1 font-pixel text-[0.7rem] text-text-muted tracking-[0.03em] text-right whitespace-nowrap">
                  Level
                </span>
                <span class="font-pixel text-[0.9rem]  tracking-[0.02em]">
                  <span class="text-level-category">
                    {fmtXp(props.totalXp)} XP
                  </span>
                  <span class="text-text-muted">
                    {" "}
                    /{" "}
                    {nextXp().xpNeeded > 0
                      ? `${fmtXp(nextXp().nextLevelXp)} XP`
                      : "MAX"}
                  </span>
                </span>
              </div>
            </div>

            {/* Level chart */}
            <div class=" border-border rounded-lg bg-black overflow-hidden">
              <div class="font-pixel text-[0.6rem] text-text-muted tracking-[0.06em] uppercase text-center py-[10px] border-b-2 border-border bg-[rgba(0,0,0,0.2)]">
                Levels
              </div>
              <div class="flex py-6">
                <div class="flex-1 flex flex-col border-r-2 border-border">
                  <For each={LEVELS.slice(1, 11)}>
                    {(lvl) => (
                      <LevelRow lvl={lvl} currentLevel={currentLevel().level} />
                    )}
                  </For>
                </div>
                <div class="flex-1 flex flex-col">
                  <For each={LEVELS.slice(11)}>
                    {(lvl) => (
                      <LevelRow lvl={lvl} currentLevel={currentLevel().level} />
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
