import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TestType } from "../../entities/test/model/types";
import styles from "./TestsPage.module.css";

type TestCard = {
  type: TestType;
  title: string;
  description: string;
  badge: string;
  icon: string;
};

type TestHistoryItem = {
  id: number;
  title: string;
  questionsCount: number;
  correctAnswers: number;
  percent: number;
  date: string;
};

const testCards: TestCard[] = [
  {
    type: "random",
    title: "Случайный тест",
    description: "Случайные слова из всего списка",
    badge: "Рекомендуется",
    icon: "✦",
  },
  {
    type: "new",
    title: "Новые слова",
    description: "Только недавно добавленные слова",
    badge: "Новое",
    icon: "✧",
  },
  {
    type: "learning",
    title: "Изучаемые слова",
    description: "Слова, которые вы сейчас изучаете",
    badge: "Изучаю",
    icon: "◇",
  },
  {
    type: "learned",
    title: "Изученные слова",
    description: "Слова, которые вы уже изучили",
    badge: "Повторение",
    icon: "✷",
  },
];

const historyItems: TestHistoryItem[] = [
  {
    id: 1,
    title: "Случайный тест",
    questionsCount: 10,
    correctAnswers: 8,
    percent: 80,
    date: "12.06.2026",
  },
  {
    id: 2,
    title: "Новые слова",
    questionsCount: 15,
    correctAnswers: 11,
    percent: 73,
    date: "11.06.2026",
  },
  {
    id: 3,
    title: "Изучаемые слова",
    questionsCount: 10,
    correctAnswers: 9,
    percent: 90,
    date: "10.06.2026",
  },
];

const questionPresets = [5, 10, 15, 20, 25];

function TestsPage() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<TestType>("random");
  const [questionsCount, setQuestionsCount] = useState(10);

  const handleStartTest = () => {
    navigate("/tests/session", {
      state: {
        type: selectedType,
        questionsCount,
      },
    });
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          type="button"
          onClick={() => navigate("/")}
        >
          ←
        </button>

        <h1>Тесты</h1>
      </header>

      <section className={styles.panel}>
        <div className={styles.sectionHeader}>
          <h2>Выберите тест</h2>
          <p>Проверьте знания слов и отслеживайте свой прогресс</p>
        </div>

        <div className={styles.cards}>
          {testCards.map((card) => (
            <button
              key={card.type}
              className={
                selectedType === card.type
                  ? `${styles.testCard} ${styles.activeCard}`
                  : styles.testCard
              }
              type="button"
              aria-pressed={selectedType === card.type}
              onClick={() => setSelectedType(card.type)}
            >
              <span className={styles.cardIcon}>{card.icon}</span>
              <strong>{card.title}</strong>
              <span>{card.description}</span>
              <small>{card.badge}</small>
            </button>
          ))}
        </div>

        <div className={styles.settings}>
          <h2>Настройки теста</h2>

          <div className={styles.settingGroup}>
            <h3>Количество вопросов</h3>

            <div className={styles.questionControls}>
              {questionPresets.map((count) => (
                <button
                  key={count}
                  className={
                    questionsCount === count ? styles.activeOption : ""
                  }
                  type="button"
                  onClick={() => setQuestionsCount(count)}
                >
                  {count}
                </button>
              ))}

              <input
                className={styles.customCount}
                type="number"
                min={1}
                max={100}
                value={questionsCount}
                aria-label="Своё количество вопросов"
                onChange={(event) =>
                  setQuestionsCount(Number(event.target.value))
                }
              />
            </div>
          </div>

          <button
            className={styles.startButton}
            type="button"
            onClick={handleStartTest}
          >
            ✦ Начать тест
          </button>
        </div>
      </section>

      <section className={styles.history}>
        <div className={styles.historyHeader}>
          <h2>История тестов</h2>
          <button type="button">Смотреть все ›</button>
        </div>

        <ul className={styles.historyList}>
          {historyItems.map((item) => (
            <li key={item.id} className={styles.historyItem}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.questionsCount} вопросов</span>
              </div>

              <div>
                <strong>
                  {item.correctAnswers}/{item.questionsCount}
                </strong>
                <span>Правильно</span>
              </div>

              <div>
                <strong>{item.percent}%</strong>
                <span>Результат</span>
              </div>

              <time>{item.date}</time>
              <button type="button">›</button>
            </li>
          ))}
        </ul>

        <p className={styles.total}>Всего тестов: 24</p>
      </section>
    </section>
  );
}

export default TestsPage;
