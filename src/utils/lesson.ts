import type { Component } from "solid-js";

export const lessonComponents = import.meta.glob<Component>(
  "~/data/lessons/**/*.tsx",
  { import: "default" },
);

export function getLessonContentKey(
  course: string,
  subsection: string,
  lesson: string,
): string | undefined {
  return Object.keys(lessonComponents).find((k) =>
    k.endsWith(`/${course}/${subsection}__${lesson}.tsx`),
  );
}
