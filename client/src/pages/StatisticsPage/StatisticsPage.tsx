import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import styles from "./StatisticsPage.module.css";

const activityData = [
  { date: "07.06", words: 25 },
  { date: "08.06", words: 30 },
  { date: "09.06", words: 25 },
  { date: "10.06", words: 30 },
  { date: "11.06", words: 20 },
  { date: "12.06", words: 19 },
];

const overview = [
  {
    title: "Выучено слов",
    value: "+24",
    subtitle: "за 7 дней",
    icon: "◇",
  },
  {
    title: "Пройдено тестов",
    value: "7",
    subtitle: "за 7 дней",
    icon: "↗",
  },
  {
    title: "Точность",
    value: "86%",
    subtitle: "средняя",
    icon: "◌",
  },
  {
    title: "Макс. серия",
    value: "7 дней",
    subtitle: "подряд",
    icon: "✦",
  },
];

function StatisticsPage() {
  const navigate = useNavigate();

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

        <h1>Статистика</h1>
      </header>

      <div className={styles.tabs}>
        <button className={styles.activeTab} type="button">
          Общая
        </button>
        <button className={styles.tab} type="button">
          Слова
        </button>
        <button className={styles.tab} type="button">
          Тесты
        </button>
      </div>

      <section className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h2>Активность</h2>
          <select className={styles.periodSelect} defaultValue="7">
            <option value="7">7 дней</option>
            <option value="30">30 дней</option>
          </select>
        </div>

        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={activityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Bar dataKey="words" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.overview}>
        <h2>Обзор</h2>

        <div className={styles.cards}>
          {overview.map((item) => (
            <article key={item.title} className={styles.card}>
              <div>
                <h3>{item.title}</h3>
                <strong>{item.value}</strong>
                <p>{item.subtitle}</p>
              </div>

              <span className={styles.icon}>{item.icon}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default StatisticsPage;
