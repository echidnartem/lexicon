import { Injectable } from "@nestjs/common";
import type { Word } from "./models/word.model";
import { WordStatus } from "./models/word-status.enum";

@Injectable()
export class WordsService {
  private readonly words: Word[] = [
    {
      id: 1,
      original: "apple",
      translation: "яблоко",
      status: WordStatus.New,
    },
    {
      id: 2,
      original: "book",
      translation: "книга",
      status: WordStatus.Learning,
    },
    {
      id: 3,
      original: "knowledge",
      translation: "знание",
      status: WordStatus.Learned,
    },
  ];

  findAll(): Word[] {
    return this.words.map((word) => ({ ...word }));
  }

  findOne(id: number): Word | undefined {
    const word = this.words.find((item) => item.id === id);

    return word ? { ...word } : undefined;
  }
}
