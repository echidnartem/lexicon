import { useLocation, useNavigate } from "react-router-dom";
import type { TestType } from "../../entities/test/model/types";
import styles from "./TestResultPage.module.css";

type ResultState = {
  correctAnswersCount: number;
  totalQuestions: number;
  type?: TestType;
  questionsCount?: number;
};

function TestResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ResultState | null;

  const correct = state?.correctAnswersCount ?? 0;
  const total = Math.max(state?.totalQuestions ?? 10, 1);
  const mistakes = Math.max(total - correct, 0);
  const accuracy = Math.min(100, Math.round((correct / total) * 100));
  const retryState = {
    type: state?.type ?? "random",
    questionsCount: state?.questionsCount ?? total,
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          type="button"
          onClick={() => navigate("/tests")}
        >
          ←
        </button>
        <h1>Результат теста</h1>
      </header>

      <div className={styles.resultCard}>
        <div className={styles.medal}>✦</div>

        <h2>{accuracy >= 80 ? "Отлично!" : "Хорошая работа!"}</h2>
        <p>Ты завершил тест</p>

        <div className={styles.stats}>
          <div>
            <span>Правильных</span>
            <strong>{correct}</strong>
          </div>

          <div>
            <span>Ошибок</span>
            <strong>{mistakes}</strong>
          </div>

          <div>
            <span>Точность</span>
            <strong>{accuracy}%</strong>
          </div>
        </div>

        <button
          className={styles.primaryButton}
          type="button"
          onClick={() => navigate("/tests/session", { state: retryState })}
        >
          Повторить тест
        </button>

        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => navigate("/words")}
        >
          Вернуться к словам
        </button>
      </div>
    </section>
  );
}

export default TestResultPage;
