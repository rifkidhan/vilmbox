import { Suspense } from "react";
import { TITLE_PAGE } from "$/lib/constants";
import { getAllTrending, getMovieTrending, getTvTrending } from "$/lib/tmdb";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import {
	Carousel,
	CarouselButtons,
	CarouselViewport,
	CarouselDotButtons,
} from "$/components/carousel";
import CarouselSkeleton from "$/components/carousel/carousel-skeleton";
import { Hero, HeroMinimal } from "$/components/hero";

export default async function Home() {
	const [all, movies, tvs] = await Promise.all([
		getAllTrending(),
		getMovieTrending(),
		getTvTrending(),
	]);

	const allTrending = all.results.slice(0, 8);

	return (
		<>
			<h1 className="sr-only">Welcome to {TITLE_PAGE}</h1>
			<Carousel full>
				<CarouselViewport>
					{allTrending.map((item, i) => (
						<Hero key={i} backdrop_path={item.backdrop_path} minimal>
							<HeroMinimal
								id={item.id}
								title={item.name ?? item.title}
								type={item.media_type}
								date={item.release_date ?? item.first_air_date}
								vote_average={item.vote_average}
								overview={item.overview}
							/>
						</Hero>
					))}
				</CarouselViewport>
				<CarouselDotButtons length={allTrending.length} />
			</Carousel>
			<section>
				<div>
					<h2 className="section-title">
						<span>Trending Movie</span>
					</h2>
					<p>Trending Movie on this Week</p>
				</div>
				<Carousel>
					<CarouselViewport>
						<Suspense fallback={<CarouselSkeleton />}>
							{movies.results.map((item) => (
								<Card
									key={item.id}
									title={item.title}
									url={`/movie/${item.id}`}
									shadow
								>
									<CardThumbnail title={item.title} img={item.poster_path} />
									<CardContent
										rating={item.vote_average}
										title={item.title}
									></CardContent>
								</Card>
							))}
						</Suspense>
					</CarouselViewport>
					<CarouselButtons />
				</Carousel>
			</section>
			<section>
				<div>
					<h2 className="section-title">
						<span>Trending TV series</span>
					</h2>
					<p>Trending TV series on this Week</p>
				</div>
				<Carousel>
					<CarouselViewport>
						<Suspense fallback={<CarouselSkeleton />}>
							{tvs.results.map((item) => (
								<Card
									key={item.id}
									title={item.name}
									url={`/tv-show/${item.id}`}
									shadow
								>
									<CardThumbnail title={item.name} img={item.poster_path} />
									<CardContent rating={item.vote_average} title={item.name} />
								</Card>
							))}
						</Suspense>
					</CarouselViewport>
					<CarouselButtons />
				</Carousel>
			</section>
		</>
	);
}
