"use client";

import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { NAVIGATIONS } from "$/lib/constants";

export default function SearchSegment() {
	const segment = useSelectedLayoutSegment();
	const searchParams = useSearchParams();
	const navigation = NAVIGATIONS.find((v) => v.id === segment);

	return navigation ? (
		<Form
			action={segment ? `/search/${segment}` : "/search"}
			className="flex w-full flex-row items-center justify-between gap-2 divide-x divide-accent-30 rounded-sm border border-accent-30 bg-accent-20 px-[4dvw] py-1 text-accent-80 focus-within:divide-accent-90 focus-within:border-accent-90"
		>
			<input
				key={searchParams.get("q")}
				type="text"
				placeholder={segment ? `Search a ${segment}` : "Search movie, tv-show, or person"}
				name="q"
				autoComplete="off"
				defaultValue={searchParams.get("q") || undefined}
				minLength={2}
				className="w-full bg-none focus:outline-0"
			/>
			<SearchIcon aria-hidden className="size-4 shrink-0" />
		</Form>
	) : null;
}

export function SearchSegmentSkeleton() {
	return (
		<form className="flex w-full flex-row items-center justify-between gap-2 divide-x divide-accent-30 rounded-sm border border-accent-30 bg-accent-20 px-[4dvw] py-1 text-accent-80 focus-within:divide-accent-90 focus-within:border-accent-90">
			<input
				type="text"
				placeholder="Search movie, tv-show, or person"
				className="w-full bg-none focus:outline-0"
			/>
			<SearchIcon aria-hidden className="size-4 shrink-0" />
		</form>
	);
}
