import { NavLink } from "react-router-dom";

function Sidebar() {
  return (<div>
    <div> {/* header */}
      <img src="path/to/image.jpg" alt="Header Image" />
      <div>
        <h1>Sidebar</h1>
        <p>Учёба как приложение</p>
      </div>
    </div>

    <div> {/* список ссылок */}
      <ul>
        <li><NavLink to="/">Главная</NavLink></li>
        <li><NavLink to="/words">Слова</NavLink></li>
        <li><NavLink to="/tests">Тесты</NavLink></li>
        <li><NavLink to="/statistics">Статистика</NavLink></li>
        <li><NavLink to="/settings">Настройки</NavLink></li>
      </ul>
    </div>

    <div> {/* footer */}
      <img src="path/to/footer-image.jpg" alt="Footer Image" />
      <p>Знания — это сокровища, которые всегда с тобой</p>
    </div>
  </div>)
}

export default Sidebar;