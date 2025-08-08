import { EPISODE_SUFFIXES } from "$/lib/constants";
import { getTv } from "$/lib/tmdb";
import { formatDate, formatPlural } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import s from "./page.module.css";

export default async function TVSeasonPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const tv = await getTv(id);

	return (
		<div className={s.list}>
			{tv.seasons.map((item) => (
				<Card
					key={item.id}
					title={item.name}
					url={`/tv-show/${id}/season/${item.season_number}`}
					shadow
					className={s.card}
				>
					<CardThumbnail title={item.name} img={item.poster_path} />
					<CardContent slotted>
						<h2>
							<span>{item.name}</span>
						</h2>
						<p>
							{item.episode_count}{" "}
							{formatPlural(item.episode_count, EPISODE_SUFFIXES)}
						</p>
						{item.air_date ? (
							<p>Premiered on {formatDate(item.air_date)}</p>
						) : null}
						{item.overview ? (
							<p className={s.overview}>{item.overview}</p>
						) : null}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
