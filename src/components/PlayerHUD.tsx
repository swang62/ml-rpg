import { createAsync } from "@solidjs/router";
import {
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { useAuth } from "~/components/AuthContext";
import PlayerSheet from "~/components/PlayerSheet";
import { getTotalXpQuery } from "~/server/progress";
import {
  bumpVersion,
  getAnonDisplayName,
  getAnonTotalXp,
  version,
} from "~/utils/local-storage";
import { formatXP, getAvatarStyle, getLevel, xpToNextLevel } from "~/utils/xp";

export default function PlayerHUD() {
  const { user, signedIn } = useAuth();
  const serverXp = createAsync(
    () =>
      signedIn()
        ? getTotalXpQuery()
        : Promise.resolve({ count: 0, percent: 0 }),
    { initialValue: { count: 0, percent: 0 } },
  );

  const [mounted, setMounted] = createSignal(false);
  const [levelUp, setLevelUp] = createSignal(false);
  const [showSheet, setShowSheet] = createSignal(false);

  // Close sheet on auth state change (login or logout)
  let prevSignedIn: boolean | undefined;
  createEffect(() => {
    const current = signedIn();
    if (current !== prevSignedIn) {
      setShowSheet(false);
    }
    prevSignedIn = current;
  });

  // After hydration, force all localStorage-backed memos to re-evaluate
  onMount(() => {
    setMounted(true);
    if (!signedIn()) bumpVersion((v) => v + 1);
    const handleProfile = () => setShowSheet(true);
    document.addEventListener("shortcut:profile", handleProfile);
    onCleanup(() =>
      document.removeEventListener("shortcut:profile", handleProfile),
    );
  });

  const xp = createMemo(() => {
    if (signedIn()) return serverXp();
    version();
    return getAnonTotalXp();
  });

  const displayName = createMemo(() => {
    if (signedIn()) return user()?.displayname;
    version();
    return getAnonDisplayName();
  });

  // Animated XP counter — smoothly counts up when value changes
  const [animatedXp, setAnimatedXp] = createSignal(xp().count);
  let prevXp = xp().count;
  createRenderEffect(() => {
    const target = xp().count;
    if (target === prevXp) return;
    const start = prevXp;
    prevXp = target;
    const duration = 2000;
    const startTime = performance.now();
    let frameId: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // ease-out quad
      const ease = t * (2 - t);
      setAnimatedXp(Math.round(start + (target - start) * ease));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    onCleanup(() => cancelAnimationFrame(frameId));
  });

  const level = createMemo(() => getLevel(animatedXp()));
  const progress = createMemo(() => xpToNextLevel(animatedXp()));
  const avatarStyle = createMemo(() => getAvatarStyle(level().level));

  let prevLevel = -1;
  createEffect(() => {
    const currentLevel = level().level;
    if (prevLevel >= 0 && currentLevel !== prevLevel) {
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 1600);
    }
    prevLevel = currentLevel;
  });

  return (
    <>
      <button
        type="button"
        class="player-hud"
        onClick={() => setShowSheet(true)}
        title="Click to view stats"
      >
        <div
          class="player-hud__avatar"
          classList={{ "level-up": levelUp() }}
          style={avatarStyle()}
        >
          <img
            src={`/assets/avatars/lvl${level().level}.svg`}
            alt={level().title}
            width="28"
            height="28"
          />
        </div>
        <div class="player-hud__info">
          <Show when={mounted()}>
            <span
              class="player-hud__title"
              classList={{ "level-up": levelUp() }}
            >
              <span>{displayName()}</span>{" "}
              <span class="text-level-section">the {level().title}</span>
            </span>
            <div class="player-hud__xp-bar">
              <div
                class="player-hud__xp-fill"
                style={{ width: `${progress().pct}%` }}
              />
            </div>
            <div class="player-hud__stats">
              <span
                class="player-hud__lvl"
                classList={{ "level-up": levelUp() }}
              >
                Lv.{level().level}
              </span>
              <span
                class="player-hud__xp-count"
                classList={{ "level-up": levelUp() }}
              >
                {progress().xpNeeded > 0
                  ? `${progress().currentXp}/${formatXP(progress().xpNeeded)} XP`
                  : `${formatXP(animatedXp())} XP (MAX)`}
              </span>
            </div>
          </Show>
        </div>
        <span class="hud-shortcut" aria-hidden="true">
          <kbd>P</kbd>
        </span>
      </button>

      <PlayerSheet
        open={showSheet()}
        userName={user()?.username}
        displayName={displayName()}
        totalXp={xp().count}
        completionPercent={xp().percent}
        signedIn={signedIn()}
        onClose={() => setShowSheet(false)}
      />
    </>
  );
}
