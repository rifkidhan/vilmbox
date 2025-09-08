import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EPISODE_SUFFIXES, IMAGE_URL, SEASON_SUFFIXES } from "$/lib/constants";
import {
	getPreference,
	getTvCredits,
	getTvDetails,
	getTvImages,
	getTvRecommendations,
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
import { Card, CardContent, CardSkeleton, CardThumbnail } from "$/components/card";
import { Carousel, CarouselButtons, CarouselViewport } from "$/components/carousel";
import GridImages from "$/components/grid/grid-images";
import {
	Hero,
	HeroAction,
	HeroContent,
	HeroGenres,
	HeroMisc,
	HeroOverview,
	HeroPoster,
	HeroSkeleton,
	HeroTitle,
	HeroWrapper,
} from "$/components/hero";
import Icon from "$/components/icon";
import Image from "$/components/image";
import ListItem from "$/components/list-item";
import OfficialSite from "$/components/official-site";
import Section from "$/components/section";

export const generateMetadata = async (props: PageProps<"/tv-show/[id]">): Promise<Metadata> => {
	const { id } = await props.params;
	const { region } = await getPreference();
	const tv = await getTvDetails(id, region);

	return {
		title: tv.name
			? tv.first_air_date
				? `${tv.name} (${getYear(tv.first_air_date)})`
				: tv.name
			: "untitled",
		alternates: {
			canonical: `/tv-show/${id}`,
		},
		openGraph: {
			type: "website",
			siteName: "vilmbox",
			url: `/tv-show/${id}`,
			images: tv.poster_path ? `${IMAGE_URL}w342${tv.poster_path}` : undefined,
		},
	};
};

export default async function TvPage(props: PageProps<"/tv-show/[id]">) {
	const { id } = await props.params;
	const { region } = await getPreference();
	const tv = await getTvDetails(id, region);

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={tv.backdrop_path}>
					<HeroWrapper>
						<HeroPoster poster_path={tv.poster_path} title={tv.name} />
						<HeroContent>
							<HeroTitle title={tv.name} tagline={tv.tagline} />
							<HeroMisc>
								{tv.certificate ? <li>{tv.certificate.rating}</li> : null}
								{tv.first_air_date ? <li>{getYear(tv.first_air_date)}</li> : null}
								{tv.episode_run_time[0] ? <li>{formatRuntime(tv.episode_run_time[0])}</li> : null}
							</HeroMisc>
							<HeroGenres genres={tv.genres} />
							<HeroAction
								vote_average={tv.vote_average}
								vote_count={tv.vote_count}
								videos={tv.videos.results}
							/>

							<HeroOverview overview={tv.overview} />
						</HeroContent>
					</HeroWrapper>
				</Hero>
			</Suspense>
			<Section name="Episodes">
				<div className="flex flex-col gap-4 xl:flex-row">
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
							<CardContent slotted>
								<h3 className="text-vb-md font-semibold">Upcoming Episode</h3>
								<hgroup className="leading-none text-accent-80">
									<h4 className="flex gap-2">
										<span>
											S{tv.next_episode_to_air.season_number}:E
											{tv.next_episode_to_air.episode_number}
										</span>
										<span className="font-medium">{tv.next_episode_to_air.name}</span>
									</h4>
									<p className="text-vb-sm">
										{tv.next_episode_to_air.air_date
											? formatDate(tv.next_episode_to_air.air_date)
											: null}
									</p>
								</hgroup>
								<div className="line-clamp-2 text-vb-sm text-accent-70">
									{tv.next_episode_to_air.overview}
								</div>
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
							<CardContent slotted>
								<h3 className="text-vb-md font-semibold">Last Episode To Air</h3>
								<hgroup className="leading-none text-accent-80">
									<h4 className="flex gap-2">
										<span>
											S{tv.last_episode_to_air.season_number}:E
											{tv.last_episode_to_air.episode_number}
										</span>
										<span className="font-medium">{tv.last_episode_to_air.name}</span>
									</h4>
									<p className="text-vb-sm">
										{tv.last_episode_to_air.air_date
											? formatDate(tv.last_episode_to_air.air_date)
											: null}
									</p>
								</hgroup>
								<div className="line-clamp-2 text-vb-sm text-accent-70">
									{tv.last_episode_to_air.overview}
								</div>
							</CardContent>
						</Card>
					) : null}
				</div>
				<Button asChild variant="text">
					<Link href={`/tv-show/${id}/season`}>View all season</Link>
				</Button>
			</Section>
			<CastCarousel id={id} />
			<Section name="Details">
				<ul className="flex flex-col gap-4">
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
			</Section>
			<TvImages id={id} />
			<Recommendation id={id} />
		</>
	);
}

const CastCarousel = async (props: { id: string }) => {
	const casts = await getTvCredits(props.id);
	return (
		<Section name="Cast">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{casts.cast.slice(0, 9).map((item) => (
							<Card key={item.id} title={item.name} url={`/people/${item.id}`} shadow>
								<CardThumbnail title={item.name} img={item.profile_path} />
								<CardContent title={item.name}>
									<div className="flex flex-col text-vb-sm text-accent-70">
										<span>{item.roles[0].character}</span>
										<span className="text-accent-60">
											{item.total_episode_count}{" "}
											{formatPlural(item.total_episode_count, EPISODE_SUFFIXES)}
										</span>
									</div>
								</CardContent>
							</Card>
						))}
						<div className="group block rounded-xl shadow-lg shadow-black/30 transition-shadow select-none hover:shadow-xl">
							<Link
								href={`/tv-show/${props.id}/credits`}
								className="flex size-full flex-col items-center-safe justify-center-safe"
							>
								<Icon
									name="arrow-right"
									isHidden
									size={36}
									className="transition-transform group-hover:translate-x-1"
								/>
								<span className="group-hover:underline">View more</span>
							</Link>
						</div>
					</Suspense>
				</CarouselViewport>
				<CarouselButtons />
			</Carousel>
		</Section>
	);
};

const TvImages = async (props: { id: string }) => {
	const images = await getTvImages(props.id);

	return (
		<Section name="Media">
			<Suspense fallback={null}>
				<GridImages images={images.slice(0, 10)} />
			</Suspense>
			<Button asChild variant="text">
				<Link href={`/tv-show/${props.id}/media`}>View all media</Link>
			</Button>
		</Section>
	);
};

const Recommendation = async (props: { id: string }) => {
	const recommendations = await getTvRecommendations(props.id);

	return (
		<Section name="Recommendations">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{recommendations.map((item) => (
							<Card key={item.id} title={item.name} shadow url={`/tv-show/${item.id}`}>
								<CardThumbnail title={item.name} img={item.poster_path} />
								<CardContent rating={item.vote_average} title={item.name}></CardContent>
							</Card>
						))}
					</Suspense>
				</CarouselViewport>
				<CarouselButtons />
			</Carousel>
		</Section>
	);
};
