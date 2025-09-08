import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
	getMovieDetails,
	getMovieOnCinema,
	getMoviePopular,
	getMovieTopRated,
	getMovieTrending,
	getPreference,
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
	title: "Movies",
	description: "Movies database.",
	alternates: {
		canonical: "/movie",
	},
	openGraph: {
		type: "website",
		siteName: "vilmbox",
		url: "/movie",
	},
};

export default async function MoviePage() {
	const { region } = await getPreference();
	const trending = await getMovieTrending("day");
	const randomMovie = await getMovieDetails(`${randomize(trending.results).id}`, region);

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={randomMovie.backdrop_path}>
					<HeroWrapper>
						<HeroPoster poster_path={randomMovie.poster_path} title={randomMovie.title} />
						<HeroContent>
							<HeroTitle title={randomMovie.title} tagline={randomMovie.tagline} />
							<HeroMisc>
								{randomMovie.certificate ? <li>{randomMovie.certificate.certificate}</li> : null}
								{randomMovie.release_date ? <li>{getYear(randomMovie.release_date)}</li> : null}
								{randomMovie.runtime ? <li>{formatRuntime(randomMovie.runtime)}</li> : null}
							</HeroMisc>
							<HeroGenres genres={randomMovie.genres} />
							<HeroAction
								vote_average={randomMovie.vote_average}
								vote_count={randomMovie.vote_count}
								videos={randomMovie.videos.results}
							/>
							<HeroOverview overview={randomMovie.overview} />
							<Button asChild variant="theme" size="lg" className="w-full">
								<Link href={`/movie/${randomMovie.id}`}>
									<span>Go to {randomMovie.title}</span>
									<Icon name="arrow-right" isHidden />
								</Link>
							</Button>
						</HeroContent>
					</HeroWrapper>
				</Hero>
			</Suspense>
			<Section name="Trending" subtitle="Trending movie on this day.">
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
								<Card key={item.id} title={item.title} shadow url={`/movie/${item.id}`}>
									<CardThumbnail title={item.title} img={item.poster_path} />
									<CardContent rating={item.vote_average} title={item.title}></CardContent>
								</Card>
							))}
						</Suspense>
					</CarouselViewport>
					<CarouselButtons />
				</Carousel>
			</Section>
			<PopularMovies />
			<TopRatedMovies />
			<OnTheatreMovies />
		</>
	);
}

const PopularMovies = async () => {
	const popular = await getMoviePopular();

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
							<Card key={item.id} title={item.title} shadow url={`/movie/${item.id}`}>
								<CardThumbnail title={item.title} img={item.poster_path} />
								<CardContent rating={item.vote_average} title={item.title}></CardContent>
							</Card>
						))}
					</Suspense>
				</CarouselViewport>
				<CarouselButtons />
			</Carousel>
		</Section>
	);
};
const TopRatedMovies = async () => {
	const topRated = await getMovieTopRated();

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
							<Card key={item.id} title={item.title} shadow url={`/movie/${item.id}`}>
								<CardThumbnail title={item.title} img={item.poster_path} />
								<CardContent rating={item.vote_average} title={item.title}></CardContent>
							</Card>
						))}
					</Suspense>
				</CarouselViewport>
				<CarouselButtons />
			</Carousel>
		</Section>
	);
};

const OnTheatreMovies = async () => {
	const playings = await getMovieOnCinema();

	return (
		<Section name="Movie on Theatre" subtitle="Movie currently play on theatre.">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{playings.results.map((item) => (
							<Card key={item.id} title={item.title} shadow url={`/movie/${item.id}`}>
								<CardThumbnail title={item.title} img={item.poster_path} />
								<CardContent rating={item.vote_average} title={item.title}></CardContent>
							</Card>
						))}
					</Suspense>
				</CarouselViewport>
				<CarouselButtons />
			</Carousel>
		</Section>
	);
};
