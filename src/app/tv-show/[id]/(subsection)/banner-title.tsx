"use client";

import type { SimpleSeason } from "$/lib/tmdb/types";
import { useSelectedLayoutSegments } from "next/navigation";
import Image from "$/components/image";

export function BannerTitle({ seasons }: { seasons: SimpleSeason[] }) {
	const segments = useSelectedLayoutSegments();

	const season = segments[1]
		? seasons.find((v) => v.season_number === parseInt(segments[1], 10))
		: undefined;

	return (
		<h1 className="text-vb-xl leading-none font-semibold capitalize">
			{season ? season.name : segments[0]}
		</h1>
	);
}

export function Poster({
	seasons,
	poster_path,
	name,
}: {
	seasons: SimpleSeason[];
	poster_path?: string;
	name: string;
}) {
	const segments = useSelectedLayoutSegments();

	const season = segments[1]
		? seasons.find((v) => v.season_number === parseInt(segments[1], 10))
		: undefined;
	const title = season?.season_number ? `${name} season ${season.season_number}` : name;

	return <Image src={season?.poster_path ? season.poster_path : poster_path} alt={title} />;
}
