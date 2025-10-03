import type { Metadata } from "next";
import { Suspense } from "react";
import { IMAGE_URL } from "$/lib/constants";
import { getCollection, getCollectionImages } from "$/lib/tmdb";
import { movieGenre } from "$/utils/array";
import { formatDate } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import GridImages from "$/components/grid/grid-images";
import GridSkeleton from "$/components/grid/grid-skeleton";
import {
	Hero,
	HeroAction,
	HeroContent,
	HeroOverview,
	HeroPoster,
	HeroSkeleton,
	HeroTitle,
	HeroWrapper,
} from "$/components/hero";
import Section from "$/components/section";

const calculateNumber = (nums: number[]) => {
	let total = 0;

	for (const num of nums) {
		total += num;
	}

	return total / nums.length;
};

export const generateMetadata = async (props: PageProps<"/collection/[id]">): Promise<Metadata> => {
	const { id } = await props.params;
	const collection = await getCollection(id);
	return {
		title: collection.name,
		description: collection.overview,
		alternates: {
			canonical: `/collection/${id}`,
		},
		openGraph: {
			type: "website",
			siteName: "vilmbox",
			url: `/collection/${id}`,
			images: collection.poster_path ? `${IMAGE_URL}w342${collection.poster_path}` : undefined,
		},
	};
};

export default async function CollectionPage(props: PageProps<"/collection/[id]">) {
	const { id } = await props.params;
	const collection = await getCollection(id);
	const genres = movieGenre(collection.parts.flatMap((v) => v.genre_ids));

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={collection.backdrop_path}>
					<HeroWrapper>
						<HeroPoster poster_path={collection.poster_path} title={collection.name} />
						<HeroContent>
							<HeroTitle title={collection.name} />
							<ul className="list-with-dot flex-wrap @5xl/hero:col-span-2">
								{genres.map((item) => (item ? <li key={item.id}>{item.name}</li> : null))}
							</ul>
							<HeroAction
								vote_average={calculateNumber(collection.parts.map((v) => v.vote_average))}
								vote_count={calculateNumber(collection.parts.map((v) => v.vote_count))}
							/>
							<HeroOverview overview={collection.overview} />
						</HeroContent>
					</HeroWrapper>
				</Hero>
			</Suspense>
			<Section name="Movies">
				<Suspense fallback={<MoviesSkeleton />}>
					<div className="flex flex-col gap-4 md:gap-6">
						{collection.parts.map((item) => (
							<Card key={item.id} title={item.title} url={`/movie/${item.id}`} shadow>
								<CardThumbnail title={item.title} img={item.poster_path} size="sm" />
								<CardContent title={item.title}>
									{item.release_date ? <div>{formatDate(item.release_date)}</div> : null}
									<div className="line-clamp-2 text-vb-sm text-accent-70">{item.overview}</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Suspense>
			</Section>
			<CollectionImages id={id} />
		</>
	);
}

const CollectionImages = async ({ id }: { id: string }) => {
	const images = await getCollectionImages(id);

	return (
		<Section name="Media">
			<Suspense fallback={<GridSkeleton length={20} />}>
				<GridImages images={images} />
			</Suspense>
		</Section>
	);
};

const MoviesSkeleton = () => {
	return (
		<ul className="flex flex-col gap-4 md:gap-6">
			{Array(12)
				.fill(0)
				.map((_, i) => (
					<li key={i} className="h-[10rem] w-full animate-pulse rounded-xl bg-accent-40" />
				))}
		</ul>
	);
};
