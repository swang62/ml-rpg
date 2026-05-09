import { A } from "@solidjs/router";
import { ROUTES } from "~/constants/paths";

export default function Footer() {
  return (
    <footer class="app-footer">
      <div class="app-footer__inner">
        <span>&copy; {new Date().getFullYear()} System Overflow</span>
        <nav class="app-footer__links">
          <A href={ROUTES.ML_BASE}>ML System Design</A>
        </nav>
      </div>
    </footer>
  );
}
