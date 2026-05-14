import { createResource, Match, Switch } from "solid-js";
import { loadCourse } from "~/server/course";
import { calculateTotalXp, getLevel, xpToNextLevel } from "~/utils/xp";

const courseSlugs = ["ml-system-design", "data-engineering"];

export default function PlayerHUD() {
  const [xp] = createResource(async () => {
    const courses = courseSlugs.map((s) => loadCourse(s)).filter(Boolean);
    return calculateTotalXp(
      courses as NonNullable<ReturnType<typeof loadCourse>>[],
    );
  });

  const level = () => {
    const x = xp();
    if (x === undefined) return null;
    return getLevel(x);
  };

  const progress = () => {
    const x = xp();
    if (x === undefined) return null;
    return xpToNextLevel(x);
  };

  const lvl = level();
  const prog = progress();

  return (
    <div class="player-hud">
      <div class="player-hud__avatar">
        <img
          src={`/assets/avatars/lvl${lvl?.level ?? 0}-${(lvl?.title ?? "nobody").toLowerCase()}.svg`}
          alt={lvl?.title ?? "Loading..."}
          width="32"
          height="32"
        />
      </div>
      <div class="player-hud__info">
        <Switch fallback={<span class="player-hud__loading">--</span>}>
          <Match when={lvl && prog}>
            <span class="player-hud__level">
              Lv.{lvl?.level ?? "?"} {lvl?.title ?? "?"}
            </span>
            <span class="player-hud__xp">{xp() ?? 0} XP</span>
          </Match>
        </Switch>
        <div class="player-hud__xp-bar">
          <div
            class="player-hud__xp-fill"
            style={{ width: `${prog?.pct ?? 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
