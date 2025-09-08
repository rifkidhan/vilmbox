"use client";

import Link from "next/link";
import { useRef } from "react";
import { NAVIGATIONS } from "$/lib/constants";
import Button from "../button";
import Icon from "../icon";

export default function MobileNavigation() {
	const ref = useRef<HTMLDivElement | null>(null);

	return (
		<div
			id="mobile-navigation"
			className="top-0 right-0 mx-auto h-dvh w-max min-w-[50dvw] px-6 shadow-md"
			popover="auto"
			ref={ref}
		>
			<div className="flex h-(--header-height) items-center justify-end gap-6">
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
					{NAVIGATIONS.map((item) => (
						<li key={item.url}>
							<Link
								href={item.url}
								onNavigate={() => {
									ref.current?.hidePopover();
								}}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
