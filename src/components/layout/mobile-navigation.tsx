"use client";

import Link from "next/link";
import { useRef } from "react";
import { NAVIGATIONS } from "$/lib/constants";
import Button from "../button";
import Icon from "../icon";
import s from "./header.module.css";

export default function MobileNavigation() {
	const ref = useRef<HTMLDivElement | null>(null);
	return (
		<div id="mobile-navigation" className={s.mobile} popover="auto" ref={ref}>
			<div className={s.head}>
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
			<nav>
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
