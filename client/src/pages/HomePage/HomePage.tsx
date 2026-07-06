import styles from "./HomePage.module.css";

const learningData = {
  learningToday: 5,
  learningTotal: 100,
  learningStreak: 3,
  learningAccuracy: 95,
};

const settingsData = {
  quizQuestions: 10,
};

function HomePage() {
  const progressMessage =
    learningData.learningToday >= 10 ? "Отлично!" : "Может быть лучше";

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1>Главная</h1>
          <p>Продолжай своё путешествие</p>
        </div>

        <menu className={styles.actions} aria-label="Быстрые действия">
          <li className={styles.actionItem}>
            <button className={styles.actionButton} type="button">
              Поиск
            </button>
          </li>
          <li className={styles.actionItem}>
            <button className={styles.actionButton} type="button">
              Уведомления
            </button>
          </li>
          <li className={styles.actionItem}>
            <button className={styles.actionButton} type="button">
              Профиль
            </button>
          </li>
        </menu>
      </header>

      <section
        className={styles.todayProgress}
        aria-labelledby="today-progress-title"
      >
        <p className={styles.progressLabel} id="today-progress-title">
          Сегодня выучено
        </p>
        <strong className={styles.progressValue}>
          {learningData.learningToday}
        </strong>
        <p className={styles.progressMessage}>{progressMessage}</p>
      </section>

      <section
        className={styles.learningStats}
        aria-labelledby="learning-stats-title"
      >
        <h2 className={styles.statsTitle} id="learning-stats-title">
          Статистика обучения
        </h2>

        <ul className={styles.statsList}>
          <li className={styles.statCard}>
            <span className={styles.statIcon} aria-hidden="true" />
            <h3>Всего слов</h3>
            <p>{learningData.learningTotal}</p>
          </li>
          <li className={styles.statCard}>
            <span className={styles.statIcon} aria-hidden="true" />
            <h3>Текущая серия</h3>
            <p>{learningData.learningStreak}</p>
          </li>
          <li className={styles.statCard}>
            <span className={styles.statIcon} aria-hidden="true" />
            <h3>Точность</h3>
            <p>{learningData.learningAccuracy}%</p>
          </li>
        </ul>
      </section>

      <section
        className={styles.quizPreview}
        aria-labelledby="quiz-preview-title"
      >
        <div className={styles.quizContent}>
          <h2 id="quiz-preview-title">Пройти тест</h2>
          <p>Состоит из {settingsData.quizQuestions} вопросов</p>
        </div>

        <button className={styles.primaryAction} type="button">
          Начать тест
        </button>
      </section>
    </section>
  );
}

export default HomePage;
