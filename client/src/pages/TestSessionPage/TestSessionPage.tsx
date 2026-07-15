import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { TestType } from "../../entities/test/model/types";
import { BackButton } from "../../shared/ui/BackButton";
import { Button } from "../../shared/ui/Button";
import styles from "./TestSessionPage.module.css";

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
        <BackButton onClick={() => navigate("/tests")} />

        <h1>Тест</h1>

        <Button
          size="small"
          type="button"
          variant="secondary"
          onClick={() => navigate("/tests")}
        >
          Завершить
        </Button>
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

      <Button
        fullWidth
        size="large"
        type="button"
        disabled={!answer.trim()}
        onClick={handleCheckAnswer}
      >
        Проверить
      </Button>

      <Button
        fullWidth
        type="button"
        variant="ghost"
        onClick={handleSkipQuestion}
      >
        Не знаю
      </Button>
    </section>
  );
}

export default TestSessionPage;
