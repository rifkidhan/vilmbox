import Link from "next/link";
import { NAVIGATIONS, TITLE_PAGE } from "$/lib/constants";
import Button from "../button";
import Icon from "../icon";
import MobileNavigation from "./mobile-navigation";
import ThemeTogle from "./theme-toggle";

export default function Header() {
	return (
		<header className="sticky top-0 left-0 z-[5] block h-(--header-height) w-full bg-accent-20">
			<nav className="mx-auto flex h-full max-w-[92dvw] flex-row items-center justify-between">
				<Link
					href="/"
					className="text-[clamp(1rem,calc(0.5rem+5vw),2rem)] leading-none font-bold text-primary"
				>
					{TITLE_PAGE}
				</Link>
				<div className="flex flex-row items-center gap-6">
					<ul className="hidden flex-row gap-3 md:inline-flex">
						{NAVIGATIONS.map((item) => (
							<li key={item.url}>
								<Link href={item.url}>{item.title}</Link>
							</li>
						))}
					</ul>
					<div className="inline-flex flex-row gap-2">
						<ThemeTogle />
						<Button
							type="button"
							variant="ghost"
							size="square"
							popoverTarget="mobile-navigation"
							popoverTargetAction="show"
							className="md:hidden"
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
