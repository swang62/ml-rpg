import { createResource } from "solid-js";
import { getTotalXp } from "~/server/xp-store";
import { getLevel, xpToNextLevel } from "~/utils/xp";

export default function PlayerHUD() {
  const [xp] = createResource(getTotalXp);

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
          src={`/assets/avatars/lvl${lvl()?.level ?? 0}-${(lvl()?.title ?? "nobody").toLowerCase()}.svg`}
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
          <span class="player-hud__xp">
            {xp() !== undefined ? `${xp()} XP` : "--"}
          </span>
        </div>
        <div class="player-hud__xp-bar">
          <div
            class="player-hud__xp-fill"
            style={{ width: `${prog()?.pct ?? 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
