import { Suspense } from "react";
import { TITLE_PAGE } from "$/lib/constants";
import { getMovieTrending, getTvTrending } from "$/lib/tmdb";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import {
	Carousel,
	CarouselButtons,
	CarouselViewport,
} from "$/components/carousel";
import CarouselSkeleton from "$/components/carousel/carousel-skeleton";

export default async function Home() {
	const [movies, tvs] = await Promise.all([
		getMovieTrending(),
		getTvTrending(),
	]);

	return (
		<>
			<h1 className="sr-only">Welcome to {TITLE_PAGE}</h1>
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
