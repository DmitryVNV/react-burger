import headerStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = (props) => {
    return (
		<header>
			<nav className={headerStyles.navbar}>
				<ul className={headerStyles.list}>
					<li>
						<a className={headerStyles.link_active} href="/">
							<BurgerIcon type="primary" />
							<span className="text_type_main-default pl-2">Конструктор</span>
						</a>
					</li>

					<li>
						<div className={headerStyles.link}>
							<ListIcon type="secondary" />
							<span className="text_type_main-default pl-2">Лента заказов</span>
						</div>
					</li>
				</ul>

				<a className={headerStyles.logo} href="/">
					<Logo/>
				</a> 
					
				<ul className={headerStyles.list}>   
					<li>
						<div className={headerStyles.link}>
							<ProfileIcon type="secondary"/>
							<span className="text_type_main-default pl-2">Личный кабинет</span>
						</div>
					</li>
				</ul> 
			</nav>      
		</header>
    );
}

export default AppHeader;