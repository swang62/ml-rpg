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
