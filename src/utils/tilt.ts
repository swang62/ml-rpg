export function onCardMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = (e.clientX - centerX) / (rect.width / 2);
  const mouseY = (e.clientY - centerY) / (rect.height / 2);

  el.style.setProperty("--tilt-x", `${mouseX * 6}deg`);
  el.style.setProperty("--tilt-y", `${-mouseY * 6}deg`);
  el.style.setProperty("--tilt-duration", "0s");
}

export function onCardLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  el.style.removeProperty("--tilt-x");
  el.style.removeProperty("--tilt-y");
  el.style.removeProperty("--tilt-duration");
}
