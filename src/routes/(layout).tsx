import type { RouteSectionProps } from "@solidjs/router";
import AskAI from "~/components/AskAI";
import PlayerHUD from "~/components/PlayerHUD";
import Search from "~/components/Search";

export default function RootLayout(props: RouteSectionProps) {
  return (
    <div class="app-layout">
      <header class="app-header">
        <div class="app-header__inner">
          <PlayerHUD />
          <Search />
          <AskAI />
        </div>
      </header>
      <div class="app-content">{props.children}</div>
    </div>
  );
}
