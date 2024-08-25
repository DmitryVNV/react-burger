import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import OrderHistory from "../components/order-history/order-history";
import UserProfile from "../components/user-profile/user-profile";
import { logoutUserEnhancer } from "../services/actions/user";

import styles from "./profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const pathname: string = useLocation().pathname;
  const onLogout = () => {
    dispatch(logoutUserEnhancer() as any);
  };

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.menuContainer}>
          <ul className="mt-30">
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text_type_main-medium pl-2 ${isActive && pathname === "/profile" ? styles.activeLink : "text_color_inactive"} ${styles.link}`
                }
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `text_type_main-medium pl-2 ${isActive ? styles.activeLink : "text_color_inactive"} ${styles.link}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                end
                className={`text_type_main-medium pl-2 text_color_inactive ${styles.link}`}
                onClick={onLogout}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          {pathname === "/profile" && (
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          )}
          {pathname === "/profile/orders" && (
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          )}
        </div>
        {pathname === "/profile" && <UserProfile />}
        {pathname === "/profile/orders" && <OrderHistory />}
      </section>
    </main>
  );
};

export default ProfilePage;