import { onCleanup, onMount } from "solid-js";

export default function ParallaxBackground() {
  onMount(() => {
    let rafId: number | null = null;
    const DEPTH_X = 0.005;
    const DEPTH_Y = DEPTH_X * 4;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const segments = window.location.pathname.split("/").filter(Boolean);
        // Lesson pages have 4 segments — skip parallax
        if (segments.length === 4) {
          const el = document.querySelector(
            ".app-layout",
          ) as HTMLElement | null;
          if (el) el.style.backgroundPosition = "center";
          return;
        }

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        const px = 50 + (e.clientX - cx) * DEPTH_X;
        const py = 50 + (e.clientY - cy) * DEPTH_Y;

        const el = document.querySelector(".app-layout") as HTMLElement | null;
        if (el) {
          el.style.backgroundPosition = `${px}% ${py}%`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    onCleanup(() => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      const el = document.querySelector(".app-layout") as HTMLElement | null;
      if (el) {
        el.style.backgroundPosition = "";
      }
    });
  });

  return null;
}
