export interface ChunkResult {
  id: string;
  text: string;
  lessonTitle: string;
  lessonUrl: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  chunkIndex: number;
  score: number;
}

export interface SourceResult {
  title: string;
  url: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  relevance: number;
}
