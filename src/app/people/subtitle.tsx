"use client";

import { useSearchParams } from "next/navigation";

export default function Subtitle() {
	const searchParams = useSearchParams();

	const page = searchParams.get("page");

	return page ? <h2 className="text-vb-lg">Page {page}</h2> : null;
}
