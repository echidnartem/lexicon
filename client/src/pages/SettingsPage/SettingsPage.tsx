import styles from "./SettingsPage.module.css";

function SettingsPage() {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Настройки</h1>
          <p>Здесь будут отображаться настройки приложения.</p>
        </div>
      </header>

      <section className={styles.panel}>
        <h2>Профиль обучения</h2>
        <p>Скоро здесь появятся параметры тестов, темы и уведомлений.</p>
      </section>
    </section>
  );
}

export default SettingsPage;
