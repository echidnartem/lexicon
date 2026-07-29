import type { WordStatus } from "./word-status.enum";

export interface Word {
  id: number;
  original: string;
  translation: string;
  status: WordStatus;
}
