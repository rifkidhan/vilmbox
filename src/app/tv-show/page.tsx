import type { Metadata } from "next";
import { Suspense } from "react";
import { getTvPopular, getTvTopRated, getTvTrending } from "$/lib/tmdb";
import { randomize } from "$/utils/array";
import { Card, CardContent, CardSkeleton, CardThumbnail } from "$/components/card";
import { Carousel, CarouselButtons, CarouselViewport } from "$/components/carousel";
import { Hero, HeroMinimal, HeroSkeleton } from "$/components/hero";
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
	const trending = await getTvTrending("day");
	const randomTv = randomize(trending.results);

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={randomTv.backdrop_path} minimal>
					<HeroMinimal
						id={randomTv.id}
						name={randomTv.name}
						type={randomTv.media_type}
						date={randomTv.first_air_date}
						vote_average={randomTv.vote_average}
						overview={randomTv.overview}
					/>
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
