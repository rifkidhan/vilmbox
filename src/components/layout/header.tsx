import type { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NAVIGATIONS, TITLE_PAGE } from "$/lib/constants";
import Button from "../button";
import Icon from "../icon";
import MobileNavigation from "./mobile-navigation";
import Search, { SearchSkeleton } from "./search";
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
				<div className="grid grid-cols-2 items-center gap-2 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6">
					<div className="hidden md:block">
						<Suspense fallback={<SearchSkeleton />}>
							<Search />
						</Suspense>
					</div>
					<ul className="hidden shrink-0 flex-row gap-3 md:inline-flex">
						{NAVIGATIONS.slice(1).map((item) => (
							<li key={item.name}>
								<Link href={item.slug as Route} className="hover:underline">
									{item.name}
								</Link>
							</li>
						))}
					</ul>
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
			</nav>
			<MobileNavigation />
		</header>
	);
}
