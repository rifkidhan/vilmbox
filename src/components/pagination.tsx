"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Button from "./button";
import Icon from "./icon";

export default function Pagination({ max = 50 }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const page = useMemo(() => {
		const now = searchParams.get("page");

		if (now) {
			return Number(now);
		} else {
			return 1;
		}
	}, [searchParams]);

	const pagesToShow = useMemo(() => {
		const show = [1, Math.max(max, 1)];
		const firstItems = 3;
		const lastItems = max - 3;

		if (firstItems > lastItems) {
			for (let i = 2; i <= max - 1; i++) {
				show.push(i);
			}
		} else if (page < firstItems) {
			for (let i = 2; i <= Math.min(firstItems, max); i++) {
				show.push(i);
			}
		} else if (page > lastItems) {
			for (let i = max - 1; i >= Math.max(lastItems, 2); i--) {
				show.push(i);
			}
		} else {
			for (let i = Math.max(page - 1, 2); i <= Math.min(page + 1, max); i++) {
				show.push(i);
			}
		}

		const items: {
			type: "page" | "ellipsis";
			value: number;
		}[] = [];

		let lastNumber = 0;

		for (const page of show.sort((a, b) => a - b)) {
			if (page - lastNumber > 1) {
				items.push({ type: "ellipsis", value: 0 });
			}
			items.push({ type: "page", value: page });
			lastNumber = page;
		}

		return items;
	}, [max, page]);

	return (
		<div className="mx-auto flex max-w-[92dvw] flex-wrap items-center-safe justify-evenly gap-2">
			<Button
				onClick={() => {
					const param = page >= 3 ? `?page=${page - 1}` : "";
					router.push(`${pathname}${param}` as Route);
				}}
				disabled={page <= 1}
				size="square"
				variant="ghost"
			>
				<Icon name="chevron-left" isHidden />
				<span className="sr-only">Previous page</span>
			</Button>
			{pagesToShow.map((item, i) => {
				if (item.type === "ellipsis")
					return (
						<span
							key={i}
							className="inline-flex size-9 items-center justify-center"
							aria-hidden="true"
						>
							<Icon name="ellipsis" isHidden />
						</span>
					);
				else if (item.value === 1)
					return (
						<Button
							key={i}
							onClick={() => {
								router.push(`${pathname}` as Route);
							}}
							disabled={page === item.value}
							size="square"
							variant="ghost"
						>
							{item.value}
						</Button>
					);
				else
					return (
						<Button
							key={i}
							onClick={() => {
								router.push(`${pathname}?page=${item.value}` as Route);
							}}
							disabled={page === item.value}
							size="square"
							variant="ghost"
						>
							{item.value}
						</Button>
					);
			})}
			<Button
				onClick={() => {
					router.push(`${pathname}?page=${page + 1}` as Route);
				}}
				disabled={page >= max}
				size="square"
				variant="ghost"
			>
				<Icon name="chevron-right" isHidden />
				<span className="sr-only">Next page</span>
			</Button>
		</div>
	);
}
