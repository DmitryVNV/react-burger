import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header>
      <nav className={headerStyles.navbar}>
        <ul className={headerStyles.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? headerStyles.link_active : headerStyles.link}`
              }
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p className={`text_type_main-default pl-2`}>Конструктор</p>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `${isActive ? headerStyles.link_active : headerStyles.link}`
              }
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p className={`text_type_main-default pl-2`}>Лента заказов</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <NavLink to="/" className={headerStyles.logo}>
          <Logo />
        </NavLink>

        <ul className={headerStyles.list}>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text_type_main-default pl-2 ${isActive ? headerStyles.link_active : headerStyles.link}`
              }
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;