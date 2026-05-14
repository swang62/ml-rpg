import { createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import { getTotalXp } from "~/server/xp-store";
import { getLevel, xpToNextLevel } from "~/utils/xp";

function fmtXp(n: number): string {
  return n >= 1000
    ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "")}k`
    : `${n}`;
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
    const interval = setInterval(fetchIt, 3000);
    onCleanup(() => clearInterval(interval));
  });

  const level = createMemo(() => getLevel(xp()));
  const progress = createMemo(() => xpToNextLevel(xp()));
  return (
    <Show when={xp() > 0} fallback={<div class="player-hud"></div>}>
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
