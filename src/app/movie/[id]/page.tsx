import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { IMAGE_URL } from "$/lib/constants";
import {
	getCollection,
	getMovieCredits,
	getMovieDetails,
	getMovieImages,
	getPreference,
} from "$/lib/tmdb";
import {
	formatCountryName,
	formatCurrency,
	formatDate,
	formatLanguage,
	formatRuntime,
	getYear,
	listFormat,
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

export const generateMetadata = async (props: PageProps<"/movie/[id]">): Promise<Metadata> => {
	const { id } = await props.params;
	const { region } = await getPreference();
	const movie = await getMovieDetails(id, region);

	return {
		title: movie.title
			? movie.release_date
				? `${movie.title} (${getYear(movie.release_date)})`
				: movie.title
			: "untitled",
		description: movie.overview,
		alternates: {
			canonical: `/movie/${id}`,
		},
		openGraph: {
			type: "website",
			siteName: "vilmbox",
			url: `/movie/${id}`,
			images: movie.poster_path ? `${IMAGE_URL}w342${movie.poster_path}` : undefined,
		},
	};
};

export default async function MoviePage(props: PageProps<"/movie/[id]">) {
	const { id } = await props.params;
	const { region } = await getPreference();

	const movie = await getMovieDetails(id, region);

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={movie.backdrop_path}>
					<HeroWrapper>
						<HeroPoster poster_path={movie.poster_path} title={movie.title} />
						<HeroContent>
							<HeroTitle title={movie.title} tagline={movie.tagline} />
							<HeroMisc>
								{movie.certificate ? <li>{movie.certificate.certificate}</li> : null}
								{movie.release_date ? <li>{getYear(movie.release_date)}</li> : null}
								{movie.runtime ? <li>{formatRuntime(movie.runtime)}</li> : null}
							</HeroMisc>
							<HeroGenres genres={movie.genres} />
							<HeroAction
								vote_average={movie.vote_average}
								vote_count={movie.vote_count}
								videos={movie.videos.results}
							/>
							<HeroOverview overview={movie.overview} />
						</HeroContent>
					</HeroWrapper>
				</Hero>
			</Suspense>
			<CastCarousel id={id} />
			<Section name="Details">
				<ul className="flex flex-col gap-4">
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
						{movie.original_language ? formatLanguage(movie.original_language) : null}
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
									<span key={item.name}>{formatCountryName(item.iso_3166_1)}</span>
								))
							: null}
					</ListItem>
					<ListItem head="Production Companies">
						{!isNull(movie.production_companies)
							? movie.production_companies.map((item) => <span key={item.id}>{item.name}</span>)
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
							? movie.keywords.keywords.map((item) => <span key={item.id}>{item.name}</span>)
							: null}
					</ListItem>
				</ul>
			</Section>
			<MovieImages id={id} />
			{movie.belongs_to_collection ? (
				<Suspense fallback={null}>
					<BelongToCollection id={movie.belongs_to_collection.id.toString()} />
				</Suspense>
			) : null}
			{!isNull(movie.recommendations.results) ? (
				<Section name="Recommendations">
					<Carousel>
						<CarouselViewport>
							{movie.recommendations.results.map((item) => (
								<Card key={item.id} title={item.title} shadow url={`/movie/${item.id}`}>
									<CardThumbnail title={item.title} img={item.poster_path} />
									<CardContent rating={item.vote_average} title={item.title}></CardContent>
								</Card>
							))}
						</CarouselViewport>
						<CarouselButtons />
					</Carousel>
				</Section>
			) : null}
		</>
	);
}

const CastCarousel = async ({ id }: { id: string }) => {
	const casts = await getMovieCredits(id);
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
									<div className="text-vb-sm text-accent-70">{item.character}</div>
								</CardContent>
							</Card>
						))}
						<div className="group block rounded-xl shadow-lg shadow-black/30 transition-shadow select-none hover:shadow-xl">
							<Link
								href={`/movie/${id}/credits`}
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

const MovieImages = async ({ id }: { id: string }) => {
	const images = await getMovieImages(id);

	return (
		<Section name="Media">
			<Suspense fallback={null}>
				<GridImages images={images.slice(0, 10)} />
			</Suspense>
			<Button asChild variant="text">
				<Link href={`/movie/${id}/media`}>View all media</Link>
			</Button>
		</Section>
	);
};

const BelongToCollection = async ({ id }: { id: string }) => {
	const collection = await getCollection(id);

	return (
		<Hero backdrop_path={collection.backdrop_path}>
			<div className="@container/section w-full py-4 backdrop-blur-2xl backdrop-brightness-50 md:py-10">
				<div className="mx-auto grid max-w-[92dvw] grid-cols-1 place-items-center-safe items-center-safe gap-4 @3xl/section:grid-cols-[auto_minmax(0,1fr)] @3xl/section:gap-6">
					<div className="block h-fit w-[30cqw] overflow-hidden rounded-xl shadow-md @3xl/section:w-[20cqw] @5xl/section:w-[15cqw]">
						<Image src={collection.poster_path} alt={collection.name} />
					</div>
					<div className="w-full text-center @3xl/section:text-left">
						<h2 className="mb-2 text-vb-lg leading-none font-semibold @3xl/section:mb-4">
							Part of the {collection.name}
						</h2>
						<div className="mb-4 @3xl/section:mb-8">
							Includes {listFormat(collection.parts.map((v) => v.title ?? ""))}
						</div>
						<Button asChild variant="theme">
							<Link href={`/collection/${id}`}>Go to {collection.name}</Link>
						</Button>
					</div>
				</div>
			</div>
		</Hero>
	);
};
