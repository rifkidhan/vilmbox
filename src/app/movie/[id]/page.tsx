import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
	getMovieCredits,
	getMovieDetails,
	getMovieImages,
	getMovieRecommendations,
	getMovieVideos,
	getPreference,
} from "$/lib/tmdb";
import {
	formatCountryName,
	formatCurrency,
	formatDate,
	formatLanguage,
	formatRuntime,
	getYear,
} from "$/utils/format";
import isNull from "$/utils/isNull";
import Button from "$/components/button";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import {
	Carousel,
	CarouselButtons,
	CarouselViewport,
} from "$/components/carousel";
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
import ListItem from "$/components/list-item";
import OfficialSite from "$/components/official-site";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const { region } = await getPreference();
	const movie = await getMovieDetails(id, region);

	return {
		title: movie.title
			? movie.release_date
				? `${movie.title} (${getYear(movie.release_date)})`
				: movie.title
			: undefined,
		description: movie.overview,
	};
}
export default async function MovieDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await getMovieDetails(id);

	const [videos, credits, images, recommendations] = await Promise.all([
		getMovieVideos(id),
		getMovieCredits(id),
		getMovieImages(id),
		getMovieRecommendations(id),
	]);

	const directors = credits.crew.filter((v) => v.job === "Director");
	const writers = credits.crew.filter((v) => v.department === "Writing");

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={movie.backdrop_path}>
					<HeroPoster title={movie.title} poster_path={movie.poster_path} />
					<HeroTitle tagline={movie.tagline}>
						<h1>{movie.title}</h1>
					</HeroTitle>
					<HeroOverview overview={movie.overview} />
					<HeroMisc>
						{movie.certificate ? (
							<span>{movie.certificate.certificate}</span>
						) : null}
						{movie.release_date ? (
							<span>{getYear(movie.release_date)}</span>
						) : null}
						{movie.runtime ? <span>{formatRuntime(movie.runtime)}</span> : null}
					</HeroMisc>
					<HeroAction
						vote_average={movie.vote_average}
						vote_count={movie.vote_count}
						videos={videos}
					/>
					<HeroGenres genres={movie.genres} />
					<Suspense fallback={<div>loading...</div>}>
						<HeroCredits>
							<div className="creators">
								<span>Director</span>
								<div className="list-with-dot">
									{directors.map((item) => (
										<span key={item.credit_id}>{item.name}</span>
									))}
								</div>
							</div>
							<div className="creators">
								<span>Writer</span>
								<div className="list-with-dot">
									{writers.map((item) => (
										<span key={item.credit_id}>{item.name}</span>
									))}
								</div>
							</div>
						</HeroCredits>
					</Suspense>
				</Hero>
			</Suspense>

			<section>
				<h2 className="section-title">
					<span>Cast</span>
				</h2>
				<Carousel>
					<CarouselViewport>
						<Suspense fallback={<CarouselSkeleton />}>
							{credits.cast.slice(0, 9).map((item) => (
								<Card
									key={item.id}
									title={item.name}
									shadow
									url={`/people/${item.id}`}
								>
									<CardThumbnail title={item.name} img={item.profile_path} />
									<CardContent title={item.name}>
										<p className="cast-role">{item.character}</p>
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
						{movie.original_title && movie.original_title !== movie.title
							? movie.original_title
							: null}
					</ListItem>
					<ListItem head="Status">{movie.status}</ListItem>
					<ListItem head="Release Date">
						{movie.release_date ? formatDate(movie.release_date) : null}
					</ListItem>
					<ListItem head="Original Language">
						{movie.original_language
							? formatLanguage(movie.original_language)
							: null}
					</ListItem>
					<ListItem head="Official Site">
						<OfficialSite
							homepage={movie.homepage}
							twitter_id={movie.external_ids.twitter_id}
							facebook_id={movie.external_ids.facebook_id}
							instagram_id={movie.external_ids.instagram_id}
						/>
					</ListItem>
					<ListItem head="Production Countries">
						{!isNull(movie.production_countries)
							? movie.production_countries.map((item) => (
									<span key={item.name}>
										{formatCountryName(item.iso_3166_1)}
									</span>
								))
							: null}
					</ListItem>
					<ListItem head="Production Companies">
						{!isNull(movie.production_companies)
							? movie.production_companies.map((item) => (
									<span key={item.id}>{item.name}</span>
								))
							: null}
					</ListItem>
					<ListItem head="Production Budget">
						{!isNull(movie.budget) ? formatCurrency(movie.budget) : null}
					</ListItem>
					<ListItem head="Production Revenue">
						{!isNull(movie.revenue) ? formatCurrency(movie.revenue) : null}
					</ListItem>
					<ListItem head="Keywords">
						{!isNull(movie.keywords.keywords)
							? movie.keywords.keywords.map((item) => (
									<span key={item.id}>{item.name}</span>
								))
							: null}
					</ListItem>
				</ul>
			</section>
			<section>
				<h2 className="section-title">
					<span>Media</span>
				</h2>
				{images.length > 0 ? (
					<GridImages title={movie.title} images={images.slice(0, 10)} />
				) : null}
				<Button asChild variant="text">
					<Link href={`/movie/${id}/media`}>View all media</Link>
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
										/>
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
