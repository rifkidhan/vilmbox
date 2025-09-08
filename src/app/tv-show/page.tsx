import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
	getPreference,
	getTvDetails,
	getTvPopular,
	getTvTopRated,
	getTvTrending,
} from "$/lib/tmdb";
import { randomize } from "$/utils/array";
import { formatRuntime, getYear } from "$/utils/format";
import Button from "$/components/button";
import { Card, CardContent, CardSkeleton, CardThumbnail } from "$/components/card";
import { Carousel, CarouselButtons, CarouselViewport } from "$/components/carousel";
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
import Section from "$/components/section";

export const metadata: Metadata = {
	title: "TV Show",
	description: "TV show database.",
	alternates: {
		canonical: "/tv-show",
	},
	openGraph: {
		type: "website",
		siteName: "vilmbox",
		url: "/tv-show",
	},
};

export default async function TVPage() {
	const { region } = await getPreference();
	const trending = await getTvTrending("day");
	const randomTv = await getTvDetails(`${randomize(trending.results).id}`, region);

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={randomTv.backdrop_path}>
					<HeroWrapper>
						<HeroPoster poster_path={randomTv.poster_path} title={randomTv.name} />
						<HeroContent>
							<HeroTitle title={randomTv.name} tagline={randomTv.tagline} />
							<HeroMisc>
								{randomTv.certificate ? <li>{randomTv.certificate.rating}</li> : null}
								{randomTv.first_air_date ? <li>{getYear(randomTv.first_air_date)}</li> : null}
								{randomTv.episode_run_time[0] ? (
									<li>{formatRuntime(randomTv.episode_run_time[0])}</li>
								) : null}
							</HeroMisc>
							<HeroGenres genres={randomTv.genres} />
							<HeroAction
								vote_average={randomTv.vote_average}
								vote_count={randomTv.vote_count}
								videos={randomTv.videos.results}
							/>

							<HeroOverview overview={randomTv.overview} />

							<Button asChild variant="theme" size="lg" className="w-full">
								<Link href={`/tv-show/${randomTv.id}`}>
									<span>Go to {randomTv.name}</span>
									<Icon name="arrow-right" isHidden />
								</Link>
							</Button>
						</HeroContent>
					</HeroWrapper>
				</Hero>
			</Suspense>
			<Section name="Trending" subtitle="Trending tv show on this day.">
				<Carousel>
					<CarouselViewport>
						<Suspense
							fallback={Array(8)
								.fill(0)
								.map((_, i) => (
									<CardSkeleton key={i} />
								))}
						>
							{trending.results.map((item) => (
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
			<PopularMovies />
			<TopRatedTv />
		</>
	);
}

const PopularMovies = async () => {
	const popular = await getTvPopular();

	return (
		<Section name="Popular">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{popular.results.map((item) => (
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
const TopRatedTv = async () => {
	const topRated = await getTvTopRated();

	return (
		<Section name="Top Rated">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{topRated.results.map((item) => (
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
