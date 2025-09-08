"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function BannerTitle() {
	const segment = useSelectedLayoutSegment();

	return <h1 className="text-vb-xl leading-none font-semibold capitalize">{segment}</h1>;
}
