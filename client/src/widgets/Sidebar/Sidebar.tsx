import { NavLink } from "react-router-dom";
import {
  BookMarked,
  BookOpenCheck,
  ChartColumn,
  GraduationCap,
  Settings,
} from "lucide-react";
import sidebarCharacter from "../../shared/assets/images/sidebar-character.png";
import sidebarImage from "../../shared/assets/images/sidebar-image.png";
import styles from "./Sidebar.module.css";

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <img className={styles.brandMark} src={sidebarImage} alt="" />
        <div>
          <h1>Lexicon</h1>
          <p>Учёба как приключение</p>
        </div>
      </div>

      <nav className={styles.navigation} aria-label="Основная навигация">
        <ul>
          <li>
            <NavLink to="/" className={getLinkClassName}>
              <GraduationCap size={20} />
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/words" className={getLinkClassName}>
              <BookMarked size={20} />
              Слова
            </NavLink>
          </li>
          <li>
            <NavLink to="/tests" className={getLinkClassName}>
              <BookOpenCheck size={20} />
              Тесты
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" className={getLinkClassName}>
              <ChartColumn size={20} />
              Статистика
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={getLinkClassName}>
              <Settings size={20} />
              Настройки
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <img src={sidebarCharacter} alt="" />
        <p>Знания - это сокровища, которые всегда с тобой.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
