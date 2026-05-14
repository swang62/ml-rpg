import { createSignal, onMount } from "solid-js";
import { getLevel, xpToNextLevel } from "~/utils/xp";

export default function PlayerHUD() {
  const [xp, setXp] = createSignal<number>();

  onMount(async () => {
    try {
      const res = await fetch("/api/xp");
      const data = await res.json();
      setXp(data.xp);
    } catch {
      // API not available yet
    }
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
      <div class="player-hud__avatar">
        <img
          src={`/assets/avatars/lvl${lvl()?.level ?? 0}-${(lvl()?.title ?? "novice").toLowerCase()}.svg`}
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
