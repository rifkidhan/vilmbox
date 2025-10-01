"use client";

import cn from "clsx";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { NAVIGATIONS } from "$/lib/constants";

export default function SideNavigation() {
	const segment = useSelectedLayoutSegment();
	const searchParams = useSearchParams();

	return (
		<ul className="flex flex-row gap-1 md:flex-col md:gap-2">
			{NAVIGATIONS.map((item) => (
				<li key={item.name}>
					<Link
						href={{
							pathname: `/search${item.slug}`,
							query: {
								q: searchParams.get("q"),
							},
						}}
						className={cn("font-semibold", {
							"text-primary-dark": segment === item.id,
						})}
					>
						{item.name}
					</Link>
				</li>
			))}
		</ul>
	);
}

export function SideNavigationSkeleton() {
	return (
		<ul className="flex flex-row gap-1 md:flex-col md:gap-2">
			{NAVIGATIONS.map((item) => (
				<li key={item.name} className="font-semibold">
					{item.name}
				</li>
			))}
		</ul>
	);
}
