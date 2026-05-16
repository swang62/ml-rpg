import { createAsync } from "@solidjs/router";
import { createEffect, createMemo, createSignal } from "solid-js";
import { getTotalXpQuery } from "~/server/quest-store";
import { AVATAR_TIERS } from "~/utils/constants";
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
  const xp = createAsync(() => getTotalXpQuery(), { initialValue: 0 });
  const [levelUp, setLevelUp] = createSignal(false);

  const level = createMemo(() => getLevel(xp()));
  const progress = createMemo(() => xpToNextLevel(xp()));
  const avatarStyle = createMemo(() => getAvatarStyle(level().level));

  let prevLevel = -1;
  createEffect(() => {
    const currentLevel = level().level;
    if (prevLevel >= 0 && currentLevel !== prevLevel) {
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 800);
    }
    prevLevel = currentLevel;
  });

  return (
    <div class="player-hud">
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
        <span class="player-hud__title" classList={{ "level-up": levelUp() }}>
          {level().title}
        </span>
        <div class="player-hud__xp-bar">
          <div
            class="player-hud__xp-fill"
            style={{ width: `${progress().pct}%` }}
          />
        </div>
        <div class="player-hud__stats">
          <span class="player-hud__lvl" classList={{ "level-up": levelUp() }}>
            Lv.{level().level}
          </span>
          <span
            class="player-hud__xp-count"
            classList={{ "level-up": levelUp() }}
          >
            {progress().xpNeeded > 0
              ? `${progress().currentXp}/${fmtXp(progress().xpNeeded)} XP`
              : `${fmtXp(xp())} XP (MAX)`}
          </span>
        </div>
      </div>
    </div>
  );
}
