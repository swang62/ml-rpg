import { SITE_NAME } from "~/data/site-data";

export default function Footer() {
  return (
    <footer class="app-footer">
      <div class="app-footer__inner">
        <span>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </span>
      </div>
    </footer>
  );
}
