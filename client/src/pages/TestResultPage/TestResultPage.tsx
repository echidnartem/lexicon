import { useLocation, useNavigate } from "react-router-dom";
import type { TestType } from "../../entities/test/model/types";
import testPageResultImage from "../../shared/assets/images/test-page-result.png";
import { BackButton } from "../../shared/ui/BackButton";
import { Button } from "../../shared/ui/Button";
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
        <BackButton onClick={() => navigate("/tests")} />
        <h1>Результат теста</h1>
      </header>

      <div className={styles.resultCard}>
        <img src={testPageResultImage} alt="Test Result Image" />

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

        <Button
          fullWidth
          size="large"
          type="button"
          onClick={() => navigate("/tests/session", { state: retryState })}
        >
          Повторить тест
        </Button>

        <Button
          fullWidth
          size="large"
          type="button"
          variant="secondary"
          onClick={() => navigate("/words")}
        >
          Вернуться к словам
        </Button>
      </div>
    </section>
  );
}

export default TestResultPage;
