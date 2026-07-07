import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./WordPage.module.css";

type Word = {
  id: number;
  title: string;
  transcription: string;
  translation: string;
  partOfSpeech: string;
  definition: string;
  russianDefinition: string;
  examples: {
    english: string;
    russian: string;
  }[];
  isFavorite: boolean;
};

type WordPageState = {
  word?: Pick<Word, "id" | "title" | "translation" | "isFavorite">;
};

const mockWord: Word = {
  id: 1,
  title: "Serenity",
  transcription: "[səˈrenəti]",
  translation: "спокойствие, безмятежность",
  partOfSpeech: "Существительное",
  definition: "The state of being calm, peaceful and untroubled.",
  russianDefinition:
    "Состояние быть спокойным, мирным и безмятежным.",
  isFavorite: true,
  examples: [
    {
      english: "She found serenity in the quiet forest.",
      russian: "Она нашла спокойствие в тихом лесу.",
    },
    {
      english: "The lake was a place of serenity.",
      russian: "Озеро было местом безмятежности.",
    },
  ],
};

function WordPage() {
  const navigate = useNavigate();
  const { wordId } = useParams();
  const location = useLocation();
  const state = location.state as WordPageState | null;

  const word = {
    ...mockWord,
    id: Number(wordId ?? state?.word?.id ?? mockWord.id),
    ...state?.word,
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          type="button"
          onClick={() => navigate("/words")}
        >
          ←
        </button>

        <h1>Слово</h1>

        <button className={styles.menuButton} type="button">
          ⋮
        </button>
      </header>

      <article className={styles.wordCard}>
        <div className={styles.cardHeader}>
          <div>
            <h2>{word.title}</h2>
            <p>{word.transcription}</p>
          </div>

          <button className={styles.favoriteButton} type="button">
            {word.isFavorite ? "★" : "☆"}
          </button>
        </div>

        <h3>{word.translation}</h3>

        <span className={styles.tag}>{word.partOfSpeech}</span>
      </article>

      <section className={styles.section}>
        <h2>Значение</h2>

        <p>{word.definition}</p>
        <p>{word.russianDefinition}</p>
      </section>

      <section className={styles.section}>
        <h2>Примеры</h2>

        <ul className={styles.examples}>
          {word.examples.map((example) => (
            <li key={example.english}>
              <strong>{example.english}</strong>
              <p>{example.russian}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Статистика</h2>

        <div className={styles.statistics}>
          <div>
            <span>Правильных ответов</span>
            <strong>18</strong>
          </div>

          <div>
            <span>Ошибок</span>
            <strong>3</strong>
          </div>

          <div>
            <span>Точность</span>
            <strong>86%</strong>
          </div>

          <div>
            <span>Последний повтор</span>
            <strong>12.06.2026</strong>
          </div>
        </div>
      </section>

      <button className={styles.primaryButton} type="button">
        ✓ Добавлено
      </button>
    </section>
  );
}

export default WordPage;
