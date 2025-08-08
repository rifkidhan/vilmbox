import Link from "next/link";
import { NAVIGATIONS, TITLE_PAGE } from "$/lib/constants";
import Button from "../button";
import Icon from "../icon";
import MobileNavigation from "./mobile-navigation";
import ThemeTogle from "./theme-toggle";
import s from "./header.module.css";

export default function Header() {
	return (
		<header className={s.header}>
			<nav>
				<Link href="/" className={s.home}>
					{TITLE_PAGE}
				</Link>
				<div className={s.navigation}>
					<ul className={s.items}>
						{NAVIGATIONS.map((item) => (
							<li key={item.url}>
								<Link href={item.url}>{item.title}</Link>
							</li>
						))}
					</ul>
					<div className={s.items}>
						<ThemeTogle />
						<Button
							type="button"
							variant="ghost"
							size="square"
							popoverTarget="mobile-navigation"
							popoverTargetAction="show"
							className={s.navbutton}
						>
							<Icon name="menu" isHidden />
							<span className="sr-only">open navigation</span>
						</Button>
					</div>
				</div>
			</nav>
			<MobileNavigation />
		</header>
	);
}
