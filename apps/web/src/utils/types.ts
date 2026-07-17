export type ChunkData = {
  id: string;
  vector: number[];
  text: string;
  lessonTitle: string;
  lessonUrl: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  chunkIndex: number;
  tags: string[];
};

export type ChunkResult = {
  title: string;
  url: string;
  text: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  relevance: number;
};

export interface SourceResult {
  title: string;
  url: string;
  score: number;
}
