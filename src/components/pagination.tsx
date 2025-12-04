"use client";

import type { Route } from "next";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Button from "./button";

export default function Pagination({ max = 50 }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const newParams = new URLSearchParams(searchParams.toString());

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
		<div className="flex max-w-[92dvw] flex-wrap items-center-safe justify-center-safe gap-2 md:gap-4 lg:gap-6">
			<Button
				onClick={() => {
					if (page >= 3) {
						newParams.set("page", `${page - 1}`);
					} else {
						newParams.delete("page");
					}
					const param = newParams.toString();
					router.push(`${pathname}${param.length ? "?" : ""}${param}` as Route);
				}}
				disabled={page <= 1}
				size="square"
				variant="ghost"
			>
				<ChevronLeftIcon aria-hidden />
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
							<EllipsisIcon aria-hidden />
						</span>
					);
				else if (item.value === 1)
					return (
						<Button
							key={i}
							onClick={() => {
								newParams.delete("page");
								const param = newParams.toString();

								router.push(`${pathname}${param.length ? "?" : ""}${param}` as Route);
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
								newParams.set("page", `${item.value}`);
								const param = newParams.toString();
								router.push(`${pathname}${param.length ? "?" : ""}${param}` as Route);
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
					newParams.set("page", `${page + 1}`);
					const param = newParams.toString();
					router.push(`${pathname}${param.length ? "?" : ""}${param}` as Route);
				}}
				disabled={page >= max}
				size="square"
				variant="ghost"
			>
				<ChevronRightIcon aria-hidden />
				<span className="sr-only">Next page</span>
			</Button>
		</div>
	);
}
