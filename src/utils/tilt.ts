export function tilt(el: HTMLElement, maxAngle = 8) {
  function onMove(e: MouseEvent) {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    el.style.setProperty("--tilt-x", `${mouseX * maxAngle}deg`);
    el.style.setProperty("--tilt-y", `${-mouseY * maxAngle}deg`);
    el.classList.add("card--tilt");
  }

  function onLeave() {
    el.classList.remove("card--tilt");
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
  }

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
    el.classList.remove("card--tilt");
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
  };
}
