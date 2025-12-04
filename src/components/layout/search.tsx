"use client";

import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search({
	action = "/search",
	...props
}: React.ComponentProps<typeof Form>) {
	const searchParam = useSearchParams();

	return (
		<Form
			action={action}
			className="flex w-full flex-row items-center justify-between gap-2 divide-x divide-accent-30 rounded-sm border border-accent-30 bg-accent-20 px-2 py-1 focus-within:divide-accent-90 focus-within:border-accent-90"
			{...props}
		>
			<input
				key={searchParam.get("q")}
				type="text"
				placeholder="Search..."
				name="q"
				autoComplete="off"
				defaultValue={searchParam.get("q") || ""}
				minLength={2}
				className="w-full bg-none text-vb-sm focus:outline-0"
			/>
			<SearchIcon aria-hidden className="size-4 shrink-0" />
		</Form>
	);
}

export function SearchSkeleton() {
	return (
		<form className="flex w-full flex-row items-center justify-between gap-2 divide-x divide-accent-30 rounded-sm border border-accent-30 bg-accent-20 px-2 py-1 focus-within:divide-accent-90 focus-within:border-accent-90">
			<input placeholder="Search..." className="w-full bg-none text-vb-sm focus:outline-0" />
			<SearchIcon aria-hidden className="size-4 shrink-0" />
		</form>
	);
}
