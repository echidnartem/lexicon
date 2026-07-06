import { useMemo, useState } from "react";
import { paginate, getTotalPages } from "../../shared/lib/pagination";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./WordsPage.module.css";

type WordStatus = "new" | "learning" | "learned";
type ActiveFilter = "all" | WordStatus;

type Word = {
  id: number;
  title: string;
  translation: string;
  status: WordStatus;
  date: string;
  isFavorite: boolean;
};

const mockWords: Word[] = [
  {
    id: 1,
    title: "Serenity",
    translation: "спокойствие, безмятежность",
    status: "learning",
    date: "12.06.2026",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Wanderer",
    translation: "путешественник, странник",
    status: "learned",
    date: "11.06.2026",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Ethereal",
    translation: "неземной, эфирный",
    status: "learned",
    date: "10.06.2026",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Luminary",
    translation: "светило, знаменитость",
    status: "new",
    date: "09.06.2026",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Sublime",
    translation: "возвышенный, величественный",
    status: "learning",
    date: "09.06.2026",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Ephemeral",
    translation: "мимолётный, скоротечный",
    status: "learning",
    date: "08.06.2026",
    isFavorite: false,
  },
  {
    id: 7,
    title: "Elysian",
    translation: "блаженный, райский",
    status: "new",
    date: "07.06.2026",
    isFavorite: false,
  },
  {
    id: 8,
    title: "Solitude",
    translation: "одиночество, уединение",
    status: "learned",
    date: "07.06.2026",
    isFavorite: false,
  },
];

const filters: { value: ActiveFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "new", label: "Новое" },
  { value: "learning", label: "Изучаю" },
  { value: "learned", label: "Изученное" },
];

function WordsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const wordsOnPage = 10;
  const totalWordsCount = 248; // временный mock, потом придёт с backend

  const handleFavoriteClick = (wordId: number) => {
    // TODO: Toggle favorite status locally and persist changes via API.
  };

  const filteredWords = useMemo(() => {
    return mockWords.filter((word) => {
      const matchesQuery =
        word.title.toLowerCase().includes(query.toLowerCase()) ||
        word.translation.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || word.status === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  const totalPages = getTotalPages(filteredWords.length, wordsOnPage);
  const words = paginate(filteredWords, currentPage, wordsOnPage);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          ←
        </button>

        <h1>Мои слова</h1>

        <NavLink to="/words/add" className={styles.addButton}>
          + Добавить слово
        </NavLink>
      </header>

      <div className={styles.searchRow}>
        <div className={styles.search}>
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Поиск слова..."
          />
        </div>
      </div>

      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={
              activeFilter === filter.value
                ? styles.activeFilter
                : styles.filter
            }
            onClick={() => {
              setActiveFilter(filter.value);
              setCurrentPage(1);
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {words.map((word) => (
          <li key={word.id} className={styles.wordItem}>
            <div className={styles.icon}>✦</div>

            <div className={styles.wordInfo}>
              <strong>{word.title}</strong>
              <span>{word.translation}</span>
            </div>

            <span className={styles.status}>{word.status}</span>
            <span className={styles.date}>{word.date}</span>

            <button
              className={styles.favoriteButton}
              onClick={() => handleFavoriteClick(word.id)}
            >
              {word.isFavorite ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>

      <footer className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          ← Назад
        </button>

        <div className={styles.pages}>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                className={currentPage === page ? styles.activePage : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Вперед →
        </button>
      </footer>

      <p className={styles.total}>Всего слов: {totalWordsCount}</p>
    </section>
  );
}

export default WordsPage;
