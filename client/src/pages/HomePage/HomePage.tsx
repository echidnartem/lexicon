function HomePage() {
  const learningData = {
    learningToday: 5,
    learningTotal: 100,
    learningStreak: 3,
    learningAccuracy: 95,
  }

  const settingsData = {
    quizQuestions: 10,
  }

  return (
    <div>
      <div> {/* header */}
        <div>
          <h1>Главная</h1>
          <p>Продолжай своё путешествие</p>
        </div>
        <div> {/* flex container for search/notifications/profile */}
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>

      <div> {/* hero section */}
        <p>Сегодня выучено</p>
        <p>{learningData.learningToday}</p>
        <p>{learningData.learningToday >= 10 ? 'Отлично!' : 'Может быть лучше'}</p>
      </div>

      <div> {/* learning stats section */}
        <div>
          <p>Всего слов</p>
          <p>{learningData.learningTotal}</p>
          <img src="path/to/total-words-image.jpg" alt="Total Words" />
        </div>
        <div>
          <p>Текущая серия</p>
          <p>{learningData.learningStreak}</p>
          <img src="path/to/streak-image.jpg" alt="Learning Streak" />
        </div>
        <div>
          <p>Точность</p>
          <p>{learningData.learningAccuracy}%</p>
          <img src="path/to/accuracy-image.jpg" alt="Learning Accuracy" />
        </div>
      </div>

    <div> {/* quiz test section */}
      <h2>Пройти тест</h2>
      <div>
        <div>
          <img src="path/to/quiz-image.jpg" alt="Quiz Test" />
          <p>{'Состоит из ' + settingsData.quizQuestions + ' вопросов'}</p>
        </div>
        <button>Начать тест</button>
      </div>
    </div>

    </div>
  );
}

export default HomePage;