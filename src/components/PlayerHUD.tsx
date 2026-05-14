import { createMemo, createResource, onCleanup, onMount } from "solid-js";
import { getLevel, xpToNextLevel } from "~/utils/xp";

async function fetchXp(): Promise<number> {
  const res = await fetch("/api/xp");
  const data = await res.json();
  return data.xp as number;
}

function avatarBorderColor(level: number): string {
  if (level >= 20) return "#fbbf24";
  if (level >= 17) return "#a78bfa";
  if (level >= 14) return "#60a5fa";
  if (level >= 10) return "#34d399";
  if (level >= 5) return "var(--accent)";
  return "var(--border)";
}

function avatarGlow(level: number): string {
  if (level >= 20)
    return "0 0 12px rgba(251,191,36,0.7), 0 0 24px rgba(251,191,36,0.3)";
  if (level >= 17)
    return "0 0 10px rgba(167,139,250,0.6), 0 0 20px rgba(167,139,250,0.2)";
  if (level >= 14)
    return "0 0 8px rgba(96,165,250,0.5), 0 0 16px rgba(96,165,250,0.2)";
  if (level >= 10) return "0 0 6px rgba(52,211,153,0.4)";
  if (level >= 5) return "0 0 4px var(--accent-glow)";
  return "none";
}

export default function PlayerHUD() {
  const [xp, { refetch }] = createResource(fetchXp, { initialValue: 0 });
  const level = createMemo(() => getLevel(xp()));
  const progress = createMemo(() => xpToNextLevel(xp()));

  onMount(() => {
    const interval = setInterval(refetch, 3000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="player-hud">
      <div
        class="player-hud__avatar"
        style={{
          border: `2px solid ${avatarBorderColor(level().level)}`,
          "box-shadow": avatarGlow(level().level),
        }}
      >
        <img
          src={`/assets/avatars/lvl${level().level}.svg`}
          alt={level().title}
          width="32"
          height="32"
        />
      </div>
      <div class="player-hud__info">
        <div class="player-hud__row">
          <span class="player-hud__level">
            Lv.{level().level} {level().title}
          </span>
        </div>
        <div class="player-hud__xp-bar">
          <div
            class="player-hud__xp-fill"
            style={{ width: `${progress().pct}%` }}
          />
        </div>
        <div class="player-hud__xp-text">
          {progress().xpNeeded > 0
            ? `${progress().currentXp} / ${progress().xpNeeded} XP`
            : `${xp()} XP (MAX)`}
        </div>
      </div>
    </div>
  );
}
