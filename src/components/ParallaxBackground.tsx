import { onCleanup, onMount } from "solid-js";

export default function ParallaxBackground() {
  onMount(() => {
    let rafId: number | null = null;
    const PX = 0.03; // parallax intensity factor

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const segments = window.location.pathname.split("/").filter(Boolean);
        // Lesson pages have 4 segments — skip parallax
        if (segments.length === 4) {
          document.documentElement.style.setProperty("--parallax-x", "50%");
          document.documentElement.style.setProperty("--parallax-y", "50%");
          return;
        }

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        const nx = e.clientX - cx;
        const ny = e.clientY - cy;

        const px = 50 - nx * PX;
        const py = 50 - ny * PX;

        document.documentElement.style.setProperty("--parallax-x", `${px}%`);
        document.documentElement.style.setProperty("--parallax-y", `${py}%`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    onCleanup(() => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.documentElement.style.removeProperty("--parallax-x");
      document.documentElement.style.removeProperty("--parallax-y");
    });
  });

  return null;
}
