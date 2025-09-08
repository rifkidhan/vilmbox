import type { Metadata } from "next";
import Link from "next/link";
import { getTVSeasonDetail } from "$/lib/tmdb";
import { formatDate } from "$/utils/format";
import isNull from "$/utils/isNull";
import GridVideos from "$/components/grid/grid-videos";
import Image from "$/components/image";
import Section from "$/components/section";

export const generateMetadata = async (
	props: PageProps<"/tv-show/[id]/season/[seasonId]">,
): Promise<Metadata> => {
	const { id, seasonId } = await props.params;
	const season = await getTVSeasonDetail(id, seasonId);

	return {
		title: season.name ? season.name : `Season ${season.season_number}`,
	};
};

export default async function TvSeasonPage(props: PageProps<"/tv-show/[id]/season/[seasonId]">) {
	const { id, seasonId } = await props.params;

	const season = await getTVSeasonDetail(id, seasonId);

	return (
		<>
			{season.overview ? (
				<Section name="Overview">
					<div>{season.overview}</div>
				</Section>
			) : null}
			<Section name="Episodes">
				<ul className="flex flex-col gap-4">
					{season.episodes.map((item, i) => (
						<li key={i}>
							<details
								name="episode"
								open={i === 0}
								className="relative flex flex-col overflow-hidden rounded-lg text-vb-sm shadow-lg shadow-black/50 details-content:h-0 details-content:overflow-y-clip details-content:opacity-0 details-content:transition-all details-content:transition-discrete details-content:duration-500 details-content:ease-in-out open:gap-4 open:details-content:h-fit open:details-content:opacity-100"
							>
								<summary className="@container/card block w-full cursor-pointer">
									<div className="relative flex size-full flex-col items-center gap-2 overflow-hidden rounded-lg bg-accent-5 select-none @min-[200px]/card:flex-row @min-[200px]/card:p-2 @md/card:gap-4 @md/card:p-4">
										<div className="relative h-auto w-[100cqw] shrink-0 overflow-hidden rounded-lg empty:hidden @min-[200px]/card:w-[30cqw] @md/card:w-[23cqw] @4xl/card:w-[18cqw]">
											{item.still_path ? (
												<Image
													src={item.still_path}
													type="still"
													alt={item.name ?? `Episode ${item.episode_number}`}
												/>
											) : null}
										</div>
										<hgroup>
											<h3 className="flex gap-2 text-vb-normal font-medium">
												<span className="shrink-0">{item.episode_number}.</span>
												<span>{item.name ?? `Episode ${item.episode_number}`}</span>
											</h3>
											{item.air_date ? <p>Premiered on {formatDate(item.air_date)}.</p> : null}
										</hgroup>
									</div>
								</summary>
								<div className="flex flex-col gap-6 p-4">
									<div className="flex flex-col gap-2">
										<h4 className="font-semibold text-primary-dark">Overview</h4>
										<p>{item.overview ? item.overview : "No overview"}</p>
									</div>
									<div className="flex flex-col gap-2">
										<h4 className="font-semibold text-primary-dark">Guest Star</h4>
										{!isNull(item.guest_stars) ? (
											<ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
												{item.guest_stars.map((cast, i) => (
													<li key={i}>
														<Link
															href={`/people/${cast.id}`}
															className="group flex flex-col gap-1 leading-none"
														>
															<span className="group-hover:underline">{cast.name}</span>
															<span className="text-accent-70">{cast.character}</span>
														</Link>
													</li>
												))}
											</ul>
										) : (
											<p>No guest star on this episode.</p>
										)}
										<div className="flex flex-col gap-2">
											<h4 className="font-semibold text-primary-dark">Crew</h4>
											{!isNull(item.crew) ? (
												<ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
													{item.crew.map((cast, i) => (
														<li key={i}>
															<Link
																href={`/people/${cast.id}`}
																className="group flex flex-col gap-1 leading-none"
															>
																<span className="group-hover:underline">{cast.name}</span>
																<span className="text-accent-70">{cast.job}</span>
															</Link>
														</li>
													))}
												</ul>
											) : (
												<p>No extra crew on this episode.</p>
											)}
										</div>
									</div>
								</div>
							</details>
						</li>
					))}
				</ul>
			</Section>
			{!isNull(season.videos.results) && (
				<Section name="Videos">
					<GridVideos videos={season.videos.results} />
				</Section>
			)}
		</>
	);
}
