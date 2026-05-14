import { createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import { getTotalXp } from "~/server/xp-store";
import { AVATAR_TIERS, POLL_INTERVAL } from "~/utils/constants";
import { getLevel, xpToNextLevel } from "~/utils/xp";

function fmtXp(n: number): string {
  return n >= 1000
    ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "")}k`
    : `${n}`;
}

function getAvatarStyle(level: number) {
  const tier =
    AVATAR_TIERS.find((t) => level >= t.minLevel) ??
    AVATAR_TIERS[AVATAR_TIERS.length - 1];
  return {
    border: `2px solid ${tier.borderColor}`,
    "box-shadow": tier.glow,
  };
}

export default function PlayerHUD() {
  const [xp, setXp] = createSignal<number>(0);

  onMount(async () => {
    const fetchIt = async () => {
      try {
        const val = await getTotalXp();
        setXp(val);
      } catch {
        // server function not available
      }
    };
    await fetchIt();
    const interval = setInterval(fetchIt, POLL_INTERVAL);
    onCleanup(() => clearInterval(interval));
  });

  const level = createMemo(() => getLevel(xp()));
  const progress = createMemo(() => xpToNextLevel(xp()));
  const avatarStyle = createMemo(() => getAvatarStyle(level().level));

  return (
    <Show when={xp() > 0} fallback={<div class="player-hud"></div>}>
      <div class="player-hud">
        <div class="player-hud__avatar" style={avatarStyle()}>
          <img
            src={`/assets/avatars/lvl${level().level}.svg`}
            alt={level().title}
            width="28"
            height="28"
          />
        </div>
        <div class="player-hud__info">
          <span class="player-hud__title">{level().title}</span>
          <div class="player-hud__xp-bar">
            <div
              class="player-hud__xp-fill"
              style={{ width: `${progress().pct}%` }}
            />
          </div>
          <div class="player-hud__stats">
            <span class="player-hud__lvl">Lv.{level().level}</span>
            <span class="player-hud__xp-count">
              {progress().xpNeeded > 0
                ? `${fmtXp(progress().currentXp)}/${fmtXp(progress().xpNeeded)} XP`
                : `${fmtXp(xp())} XP (MAX)`}
            </span>
          </div>
        </div>
      </div>
    </Show>
  );
}
