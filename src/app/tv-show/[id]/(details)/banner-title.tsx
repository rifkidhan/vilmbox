"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import type { SimpleSeason } from "$/lib/tmdb/types";
import { BannerPoster } from "$/components/banner";

export function BannerTitle({ seasons }: { seasons: SimpleSeason[] }) {
	const segments = useSelectedLayoutSegments();

	const season = segments[1]
		? seasons.find((v) => v.season_number === parseInt(segments[1]))
		: undefined;

	return <h1>{season ? season.name : segments[0]}</h1>;
}

export function Poster({
	seasons,
	poster_path,
}: {
	seasons: SimpleSeason[];
	poster_path?: string;
}) {
	const segments = useSelectedLayoutSegments();

	const season = segments[1]
		? seasons.find((v) => v.season_number === parseInt(segments[1]))
		: undefined;

	return (
		<BannerPoster
			poster_path={season?.poster_path ? season.poster_path : poster_path}
		/>
	);
}
