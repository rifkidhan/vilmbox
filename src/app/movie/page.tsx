import type { Metadata } from "next";
import { Suspense } from "react";
import { getMovieOnCinema, getMoviePopular, getMovieTopRated, getMovieTrending } from "$/lib/tmdb";
import { randomize } from "$/utils/array";
import { Card, CardContent, CardSkeleton, CardThumbnail } from "$/components/card";
import { Carousel, CarouselButtons, CarouselViewport } from "$/components/carousel";
import { Hero, HeroMinimal, HeroSkeleton } from "$/components/hero";
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
	const trending = await getMovieTrending("day");
	const randomMovie = randomize(trending.results);

	return (
		<>
			<Suspense fallback={<HeroSkeleton type="minimal" />}>
				<Hero backdrop_path={randomMovie.backdrop_path} minimal>
					<HeroMinimal
						id={randomMovie.id}
						name={randomMovie.title}
						type={randomMovie.media_type}
						date={randomMovie.release_date}
						vote_average={randomMovie.vote_average}
						overview={randomMovie.overview}
					/>
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
