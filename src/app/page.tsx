import type { Metadata } from "next";
import { Suspense } from "react";
import { DESCRIPTION_PAGE, TITLE_PAGE } from "$/lib/constants";
import { getAllTrending, getMovieTrending, getTvTrending } from "$/lib/tmdb";
import { Card, CardContent, CardSkeleton, CardThumbnail } from "$/components/card";
import {
	Carousel,
	CarouselButtons,
	CarouselDotButtons,
	CarouselViewport,
} from "$/components/carousel";
import { Hero, HeroMinimal, HeroSkeleton } from "$/components/hero";
import Section from "$/components/section";

export const metadata: Metadata = {
	description: DESCRIPTION_PAGE,
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		siteName: "vilmbox",
		url: "/",
	},
};

export default async function Home() {
	return (
		<>
			<h1 className="sr-only">Welcome to {TITLE_PAGE}</h1>
			<Suspense fallback={<HeroSkeleton type="minimal" />}>
				<AllTrending />
			</Suspense>
			<MovieTrending />
			<TvTrending />
		</>
	);
}

const AllTrending = async () => {
	const getTrending = await getAllTrending();
	const trendings = getTrending.results.slice(0, 8);
	return (
		<Carousel full>
			<CarouselViewport>
				{trendings.map((item, i) => (
					<Hero key={i} backdrop_path={item.backdrop_path} minimal>
						<HeroMinimal
							id={item.id}
							name={item.title ?? item.name}
							type={item.media_type}
							date={item.release_date ?? item.first_air_date}
							vote_average={item.vote_average}
							overview={item.overview}
						/>
					</Hero>
				))}
			</CarouselViewport>
			<CarouselDotButtons length={trendings.length} />
		</Carousel>
	);
};

const MovieTrending = async () => {
	const movies = await getMovieTrending();
	return (
		<Section name="Trending Movie" subtitle="Trending movie on this week.">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{movies.results.map((item) => (
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

const TvTrending = async () => {
	const tv = await getTvTrending();
	return (
		<Section name="Trending TV Show" subtitle="Trending tv show on this week.">
			<Carousel>
				<CarouselViewport>
					<Suspense
						fallback={Array(8)
							.fill(0)
							.map((_, i) => (
								<CardSkeleton key={i} />
							))}
					>
						{tv.results.map((item) => (
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
