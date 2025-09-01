import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EPISODE_SUFFIXES, SEASON_SUFFIXES } from "$/lib/constants";
import {
	getTvCredits,
	getTvDetails,
	getTvImages,
	getTvRecommendations,
	getTvVideos,
} from "$/lib/tmdb";
import {
	formatCountryName,
	formatDate,
	formatLanguage,
	formatPlural,
	formatRuntime,
	getYear,
} from "$/utils/format";
import isNull from "$/utils/isNull";
import Button from "$/components/button";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import { Carousel, CarouselButtons, CarouselViewport } from "$/components/carousel";
import CarouselSkeleton from "$/components/carousel/carousel-skeleton";
import GridImages from "$/components/grid/grid-images";
import {
	Hero,
	HeroAction,
	HeroCredits,
	HeroGenres,
	HeroMisc,
	HeroOverview,
	HeroPoster,
	HeroSkeleton,
	HeroTitle,
} from "$/components/hero";
import Icon from "$/components/icon";
import Image from "$/components/image";
import ListItem from "$/components/list-item";
import OfficialSite from "$/components/official-site";
import Truncate from "$/components/truncate";

export async function generateMetadata(props: PageProps<"/tv-show/[id]">): Promise<Metadata> {
	const { id } = await props.params;

	const tv = await getTvDetails(id);

	return {
		title: tv.name ? tv.name : "Untitled",
		description: tv.overview,
	};
}

export default async function TVDetailPage(props: PageProps<"/tv-show/[id]">) {
	const { id } = await props.params;
	const tv = await getTvDetails(id);
	const [videos, credits, images, recommendations] = await Promise.all([
		getTvVideos(id),
		getTvCredits(id),
		getTvImages(id),
		getTvRecommendations(id),
	]);

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={tv.backdrop_path}>
					<HeroPoster poster_path={tv.poster_path} title={tv.name} />
					<HeroTitle tagline={tv.tagline}>
						<h1>{tv.name}</h1>
					</HeroTitle>
					<HeroOverview overview={tv.overview} />
					<HeroMisc>
						{tv.certificate ? <span>{tv.certificate.rating}</span> : null}
						{tv.first_air_date ? <span>{getYear(tv.first_air_date)}</span> : null}
						{tv.episode_run_time[0] ? <span>{formatRuntime(tv.episode_run_time[0])}</span> : null}
					</HeroMisc>
					<HeroAction vote_average={tv.vote_average} vote_count={tv.vote_count} videos={videos} />
					<HeroGenres genres={tv.genres} />
					<HeroCredits>
						{tv.created_by.length > 0 ? (
							<div className="creators">
								<span>Creators</span>
								<div className="list-with-dot">
									{tv.created_by.map((item, i) => (
										<span key={i}>{item.name}</span>
									))}
								</div>
							</div>
						) : null}
					</HeroCredits>
				</Hero>
			</Suspense>

			<section>
				<h2 className="section-title">
					<span>Episodes</span>
				</h2>
				<div className="episodes">
					{tv.next_episode_to_air ? (
						<Card shadow title={tv.next_episode_to_air.name}>
							{tv.next_episode_to_air.still_path ? (
								<CardThumbnail>
									<Image
										src={tv.next_episode_to_air.still_path}
										alt={`Season ${tv.next_episode_to_air.season_number}${tv.next_episode_to_air.name}`}
										type="still"
									/>
								</CardThumbnail>
							) : null}
							<CardContent slotted className="content">
								<h3 className="episode-section">Next Episode</h3>
								<hgroup>
									<h4 className="title">
										<span>
											S{tv.next_episode_to_air.season_number}:E
											{tv.next_episode_to_air.episode_number}
										</span>
										<span>{tv.next_episode_to_air.name}</span>
									</h4>
									<p className="date">
										{tv.next_episode_to_air.air_date
											? formatDate(tv.next_episode_to_air.air_date)
											: null}
									</p>
								</hgroup>
								<Truncate>{tv.next_episode_to_air.overview}</Truncate>
							</CardContent>
						</Card>
					) : null}
					{tv.last_episode_to_air ? (
						<Card shadow title={tv.last_episode_to_air.name}>
							{tv.last_episode_to_air.still_path ? (
								<CardThumbnail>
									<Image
										src={tv.last_episode_to_air.still_path}
										alt={`Season ${tv.last_episode_to_air.season_number}${tv.last_episode_to_air.name}`}
										type="still"
									/>
								</CardThumbnail>
							) : null}
							<CardContent slotted className="content">
								<h3 className="episode-section">Last Episode To Air</h3>
								<hgroup>
									<h4 className="title">
										<span>
											S{tv.last_episode_to_air.season_number}:E
											{tv.last_episode_to_air.episode_number}
										</span>
										<span>{tv.last_episode_to_air.name}</span>
									</h4>
									<p className="date">
										{tv.last_episode_to_air.air_date
											? formatDate(tv.last_episode_to_air.air_date)
											: null}
									</p>
								</hgroup>
								<Truncate>{tv.last_episode_to_air.overview}</Truncate>
							</CardContent>
						</Card>
					) : null}
				</div>
				<div>
					<Button asChild variant="text">
						<Link href={`/tv-show/${tv.id}/season`}>View all seasons</Link>
					</Button>
				</div>
			</section>

			<section>
				<h2 className="section-title">
					<span>Cast</span>
				</h2>
				<Carousel>
					<CarouselViewport>
						<Suspense fallback={<CarouselSkeleton />}>
							{credits.cast.slice(0, 9).map((item) => (
								<Card key={item.id} title={item.name} shadow url={`/people/${item.id}`}>
									<CardThumbnail title={item.name} img={item.profile_path} />
									<CardContent title={item.name}>
										<p className="cast-role">{item.roles[0].character}</p>
									</CardContent>
								</Card>
							))}
							<div className="view-more-card">
								<Link href={`/movie/${id}/credit`}>
									<Icon name="arrow-right" isHidden size={36} />
									<span>View more</span>
								</Link>
							</div>
						</Suspense>
					</CarouselViewport>
					<CarouselButtons />
				</Carousel>
			</section>

			<section>
				<h2 className="section-title">
					<span>Details</span>
				</h2>
				<ul className="info-details">
					<ListItem head="Original Title">
						{tv.original_name && tv.original_name !== tv.name ? tv.original_name : null}
					</ListItem>
					<ListItem head="Status">{tv.status}</ListItem>
					<ListItem head="Total Season">
						{tv.number_of_seasons} {formatPlural(tv.number_of_seasons, SEASON_SUFFIXES)}
					</ListItem>
					<ListItem head="Total Episode">
						{tv.number_of_episodes} {formatPlural(tv.number_of_episodes, EPISODE_SUFFIXES)}
					</ListItem>
					<ListItem head="First Air Date">
						{tv.first_air_date ? formatDate(tv.first_air_date) : null}
					</ListItem>
					<ListItem head="Series type">{tv.type}</ListItem>
					<ListItem head="Original Language">
						{tv.original_language ? formatLanguage(tv.original_language) : null}
					</ListItem>
					<ListItem head="Official Site">
						<OfficialSite
							homepage={tv.homepage}
							twitter_id={tv.external_ids.twitter_id}
							facebook_id={tv.external_ids.facebook_id}
							instagram_id={tv.external_ids.instagram_id}
						/>
					</ListItem>
					<ListItem head="Production Countries">
						{!isNull(tv.production_countries)
							? tv.production_countries.map((item) => (
									<span key={item.name}>{formatCountryName(item.iso_3166_1)}</span>
								))
							: null}
					</ListItem>
					<ListItem head="Production Companies">
						{!isNull(tv.production_companies)
							? tv.production_companies.map((item) => <span key={item.id}>{item.name}</span>)
							: null}
					</ListItem>
					<ListItem head="Network">
						{!isNull(tv.networks)
							? tv.networks.map((item) => <span key={item.id}>{item.name}</span>)
							: null}
					</ListItem>
					<ListItem head="Keywords">
						{!isNull(tv.keywords.results)
							? tv.keywords.results.map((item) => <span key={item.id}>{item.name}</span>)
							: null}
					</ListItem>
				</ul>
			</section>
			<section>
				<h2 className="section-title">
					<span>Media</span>
				</h2>
				{images.length > 0 ? <GridImages title={tv.name} images={images.slice(0, 10)} /> : null}
				<Button asChild variant="text">
					<Link href={`/tv-show/${id}/media`}>View all media</Link>
				</Button>
			</section>
			{!isNull(recommendations) ? (
				<section>
					<h2 className="section-title">
						<span>Recommendations</span>
					</h2>
					<Carousel>
						<CarouselViewport>
							<Suspense fallback={<CarouselSkeleton />}>
								{recommendations.map((item) => (
									<Card key={item.id} title={item.name} url={`/tv-show/${item.id}`} shadow>
										<CardThumbnail title={item.name} img={item.poster_path} />
										<CardContent rating={item.vote_average} title={item.name} />
									</Card>
								))}
							</Suspense>
						</CarouselViewport>
						<CarouselButtons />
					</Carousel>
				</section>
			) : null}
		</>
	);
}
