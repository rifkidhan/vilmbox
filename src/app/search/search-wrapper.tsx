"use client";

import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function SearchWrapper({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();

	return (
		<Fragment key={`${searchParams.get("q") || ""}_${searchParams.get("page") || ""}`}>
			{children}
		</Fragment>
	);
}
