"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function BannerTitle() {
	const segment = useSelectedLayoutSegment();

	return <h1>{segment}</h1>;
}
