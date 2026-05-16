import { createAsync } from "@solidjs/router";
import { createEffect, createMemo, createSignal } from "solid-js";
import PlayerSheet from "~/components/PlayerSheet";
import { getTotalXpQuery } from "~/server/progress";
import { getUser } from "~/server/user";
import { formatXP, getAvatarStyle, getLevel, xpToNextLevel } from "~/utils/xp";

export default function PlayerHUD() {
  const user = createAsync(() => getUser());
  const xp = createAsync(() => getTotalXpQuery(), { initialValue: 0 });
  const [levelUp, setLevelUp] = createSignal(false);
  const [showSheet, setShowSheet] = createSignal(false);

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
    <>
      <button
        type="button"
        class="player-hud"
        onClick={() => setShowSheet(true)}
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
          <span class="player-hud__title" classList={{ "level-up": levelUp() }}>
            {user()?.name}{" "}
            <span class="text-level-section">the {level().title}</span>
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
                ? `${progress().currentXp}/${formatXP(progress().xpNeeded)} XP`
                : `${formatXP(xp())} XP (MAX)`}
            </span>
          </div>
        </div>
      </button>

      <PlayerSheet
        open={showSheet()}
        userName={user()?.name}
        totalXp={xp()}
        onClose={() => setShowSheet(false)}
      />
    </>
  );
}
