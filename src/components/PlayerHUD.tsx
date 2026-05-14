import { createSignal, onCleanup, onMount } from "solid-js";
import { getLevel, xpToNextLevel } from "~/utils/xp";

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
  const [xp, setXp] = createSignal<number>();

  onMount(async () => {
    const fetchXp = async () => {
      try {
        const res = await fetch("/api/xp");
        const data = await res.json();
        setXp(data.xp);
      } catch {
        // API not available yet
      }
    };

    await fetchXp();
    const interval = setInterval(fetchXp, 3000);
    onCleanup(() => clearInterval(interval));
  });

  const lvl = () => {
    const x = xp();
    if (x === undefined) return null;
    return getLevel(x);
  };

  const prog = () => {
    const x = xp();
    if (x === undefined) return null;
    return xpToNextLevel(x);
  };

  return (
    <div class="player-hud">
      <div
        class="player-hud__avatar"
        style={{
          border: `2px solid ${avatarBorderColor(lvl()?.level ?? 0)}`,
          "box-shadow": avatarGlow(lvl()?.level ?? 0),
        }}
      >
        <img
          src={`/assets/avatars/lvl${lvl()?.level ?? 0}.svg`}
          alt={lvl()?.title ?? "-"}
          width="32"
          height="32"
        />
      </div>
      <div class="player-hud__info">
        <div class="player-hud__row">
          <span class="player-hud__level">
            {xp() !== undefined ? `Lv.${lvl()?.level} ${lvl()?.title}` : "--"}
          </span>
        </div>
        <div class="player-hud__xp-bar">
          <div
            class="player-hud__xp-fill"
            style={{ width: `${prog()?.pct ?? 0}%` }}
          />
        </div>
        <div class="player-hud__xp-text">
          {xp() !== undefined
            ? `${prog()?.currentXp ?? 0} / ${prog()?.xpNeeded ?? 0} XP`
            : ""}
        </div>
      </div>
    </div>
  );
}
