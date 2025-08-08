import Link from "next/link";
import { getTVSeasonDetail } from "$/lib/tmdb";
import { formatDate } from "$/utils/format";
import isNull from "$/utils/isNull";
import Button from "$/components/button";
import GridVideos from "$/components/grid/grid-videos";
import Image from "$/components/image";
import s from "./page.module.css";

export default async function SeasonDetailPage({
	params,
}: {
	params: Promise<{ id: string; season: string }>;
}) {
	const { id, season: season_id } = await params;
	const season = await getTVSeasonDetail(id, season_id);

	return (
		<>
			{season.overview ? (
				<section>
					<h2 className="section-title">
						<span>{season.overview}</span>
					</h2>
				</section>
			) : null}
			<section>
				<h2 className="section-title">
					<span>List of Episodes</span>
				</h2>
				<ul className={s.episodes}>
					{season.episodes.map((item, i) => (
						<li key={item.id}>
							<details name="episode" open={i === 0} className={s.episode}>
								<summary className="pf-card">
									<div className="card">
										<div className="thumbnail">
											<Image
												src={item.still_path}
												type="still"
												alt={item.name ?? `Episode ${item.episode_number}`}
											/>
										</div>
										<div className="content">
											<h3>
												<span>{item.episode_number}.</span>
												<span>{item.name}</span>
											</h3>
											{item.air_date ? (
												<p>Premiered on {formatDate(item.air_date)}.</p>
											) : null}
										</div>
									</div>
								</summary>
								<div className={s.details}>
									<div className={s.overview}>
										<h4>Overview</h4>
										<p>{item.overview ? item.overview : "No overview."}</p>
									</div>
									<ul className={s.credits}>
										<h4>Guest Stars</h4>
										{!isNull(item.guest_stars) ? (
											item.guest_stars.map((cast) => (
												<li key={cast.id}>
													<Button asChild variant="text">
														<Link href={`/people/${cast.id}`}>{cast.name}</Link>
													</Button>
												</li>
											))
										) : (
											<li>No guest star on this episode.</li>
										)}
									</ul>
									<ul className={s.credits}>
										<h4>Crew</h4>
										{!isNull(item.crew) ? (
											item.guest_stars.map((crew) => (
												<li key={crew.id}>
													<Button asChild variant="text">
														<Link href={`/people/${crew.id}`}>{crew.name}</Link>
													</Button>
												</li>
											))
										) : (
											<li>No guest star on this episode.</li>
										)}
									</ul>
								</div>
							</details>
						</li>
					))}
				</ul>
			</section>
			{!isNull(season.videos.results) ? (
				<section>
					<h2 className="section-title">
						<span>Videos</span>
					</h2>
					<GridVideos videos={season.videos.results} />
				</section>
			) : null}
		</>
	);
}
