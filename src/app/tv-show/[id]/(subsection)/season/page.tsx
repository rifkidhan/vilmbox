import type { Metadata } from "next";
import { EPISODE_SUFFIXES } from "$/lib/constants";
import { getTv } from "$/lib/tmdb";
import { formatDate, formatPlural } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";

export const metadata: Metadata = {
	title: "All Season",
};

export default async function TvSeasonsPage(props: PageProps<"/tv-show/[id]/season">) {
	const { id } = await props.params;
	const tv = await getTv(id);

	return (
		<div className="mx-auto flex w-[92dvw] flex-col gap-12">
			{tv.seasons.map((item) => (
				<Card
					key={item.id}
					title={item.name}
					url={`/tv-show/${id}/season/${item.season_number}`}
					shadow
				>
					<CardThumbnail title={item.name} img={item.poster_path ?? tv.poster_path} />
					<CardContent slotted>
						<h2 className="text-vb-md font-semibold group-hover/card:underline">
							<span>{item.name}</span>
						</h2>
						<p>
							{item.episode_count} {formatPlural(item.episode_count, EPISODE_SUFFIXES)}
						</p>
						{item.air_date ? <p>Premiered on {formatDate(item.air_date)}</p> : null}
						{item.overview ? (
							<p className="line-clamp-3 text-vb-sm text-accent-70">{item.overview}</p>
						) : null}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
