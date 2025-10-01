"use client";

import type { Route } from "next";
import Link from "next/link";
import { Suspense, useRef } from "react";
import { NAVIGATIONS } from "$/lib/constants";
import Button from "../button";
import Icon from "../icon";
import Search, { SearchSkeleton } from "./search";

export default function MobileNavigation() {
	const ref = useRef<HTMLDivElement | null>(null);

	return (
		<div
			id="mobile-navigation"
			className="top-0 right-0 mx-auto h-dvh w-max min-w-[70dvw] translate-x-50 px-6 transition-all transition-discrete duration-500 open:translate-0 starting:open:translate-x-50"
			popover="auto"
			ref={ref}
		>
			<div className="flex h-(--header-height) items-center justify-end gap-6">
				<Suspense fallback={<SearchSkeleton />}>
					<Search />
				</Suspense>
				<Button
					variant="ghost"
					size="square"
					popoverTarget="mobile-navigation"
					popoverTargetAction="hide"
				>
					<Icon name="close" isHidden />
					<span className="sr-only">close navigation</span>
				</Button>
			</div>
			<nav className="text-vb-xl">
				<ul>
					{NAVIGATIONS.slice(1).map((item) => (
						<li key={item.name}>
							<Link
								href={item.slug as Route}
								onNavigate={() => {
									ref.current?.hidePopover();
								}}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
