"use server";

import type { Component } from "solid-js";
import { renderToString } from "solid-js/web";

const lessonComponents = import.meta.glob<Component>(
  "~/data/lessons/**/*.tsx",
  { import: "default" },
);

export async function getLessonHTML(
  course?: string,
  subsection?: string,
  lesson?: string,
): Promise<string> {
  const key = Object.keys(lessonComponents).find((k) =>
    k.endsWith(`/${course}/${subsection}__${lesson}.tsx`),
  );
  if (!key) return "";
  const Comp = await lessonComponents[key]();
  return renderToString(() => <Comp />);
}
