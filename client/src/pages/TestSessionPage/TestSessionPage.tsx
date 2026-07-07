import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TestSessionPage.module.css";

type TestType = "random" | "new" | "learning" | "learned";

type SessionState = {
  type: TestType;
  questionsCount: number;
};

type TestQuestion = {
  id: number;
  word: string;
  translation: string;
  correctAnswer: string;
};

const mockQuestions: TestQuestion[] = [
  {
    id: 1,
    word: "спокойствие",
    translation: "спокойствие, безмятежность",
    correctAnswer: "serenity",
  },
  {
    id: 2,
    word: "путешественник",
    translation: "путешественник, странник",
    correctAnswer: "wanderer",
  },
  {
    id: 3,
    word: "неземной",
    translation: "неземной, эфирный",
    correctAnswer: "ethereal",
  },
];

function TestSessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionState = location.state as SessionState | null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const questions = useMemo(() => {
    const requestedCount = sessionState?.questionsCount ?? mockQuestions.length;
    const safeCount = Number.isFinite(requestedCount)
      ? Math.max(1, requestedCount)
      : mockQuestions.length;

    return mockQuestions.slice(0, Math.min(safeCount, mockQuestions.length));
  }, [sessionState?.questionsCount]);

  const currentQuestion = questions[currentQuestionIndex] ?? mockQuestions[0]!;

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  const goToNextQuestion = (nextCorrectAnswersCount = correctAnswersCount) => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      navigate("/tests/result", {
        state: {
          correctAnswersCount: nextCorrectAnswersCount,
          totalQuestions: questions.length,
          type: sessionState?.type ?? "random",
          questionsCount: sessionState?.questionsCount ?? questions.length,
        },
      });

      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    setAnswer("");
  };

  const handleCheckAnswer = () => {
    const isCorrect =
      answer.trim().toLowerCase() ===
      currentQuestion.correctAnswer.toLowerCase();
    const nextCorrectAnswersCount = isCorrect
      ? correctAnswersCount + 1
      : correctAnswersCount;

    if (isCorrect) {
      setCorrectAnswersCount(nextCorrectAnswersCount);
    }

    goToNextQuestion(nextCorrectAnswersCount);
  };

  const handleSkipQuestion = () => {
    goToNextQuestion();
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

        <h1>Тест</h1>

        <button
          className={styles.finishButton}
          type="button"
          onClick={() => navigate("/tests")}
        >
          Завершить
        </button>
      </header>

      <div className={styles.progress}>
        <div
          className={styles.progressLine}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className={styles.counter}>
        Вопрос {currentQuestionIndex + 1} из {questions.length}
      </p>

      <div className={styles.card}>
        <p className={styles.label}>Введите слово на английском</p>

        <h2>{currentQuestion.word}</h2>

        <input
          value={answer}
          placeholder="Ваш ответ..."
          onChange={(event) => setAnswer(event.target.value)}
        />

        <span className={styles.decoration}>✦</span>
      </div>

      <button
        className={styles.checkButton}
        type="button"
        disabled={!answer.trim()}
        onClick={handleCheckAnswer}
      >
        Проверить
      </button>

      <button
        className={styles.skipButton}
        type="button"
        onClick={handleSkipQuestion}
      >
        Не знаю
      </button>
    </section>
  );
}

export default TestSessionPage;
