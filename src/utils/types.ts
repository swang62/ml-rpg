export interface Lesson {
  lesson: string;
  title: string;
  order: number;
}

export interface Subsection {
  subsection: string;
  title: string;
  lessons: Lesson[];
}

export interface Category {
  category: string;
  title: string;
  subsections: Subsection[];
}

export interface Course {
  title: string;
  categories: Category[];
}

export type Prefix = "xp" | "tracking";
