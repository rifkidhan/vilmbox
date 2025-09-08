import type { Metadata } from "next";
import { Suspense } from "react";
import { getTvImages, getTvVideos } from "$/lib/tmdb";
import GridImages from "$/components/grid/grid-images";
import GridSkeleton from "$/components/grid/grid-skeleton";
import GridVideos from "$/components/grid/grid-videos";
import Section from "$/components/section";

export const metadata: Metadata = {
	title: "Media",
};

export default async function TvMediaPage(props: PageProps<"/tv-show/[id]/media">) {
	const { id } = await props.params;

	return (
		<>
			<TvImages id={id} />
			<TvVideos id={id} />
		</>
	);
}

const TvImages = async (props: { id: string }) => {
	const images = await getTvImages(props.id);

	return (
		<Section name="Images">
			<Suspense fallback={<GridSkeleton />}>
				<GridImages images={images} />
			</Suspense>
		</Section>
	);
};

const TvVideos = async (props: { id: string }) => {
	const videos = await getTvVideos(props.id);

	return (
		<Section name="Media">
			<Suspense fallback={<GridSkeleton />}>
				<GridVideos videos={videos} />
			</Suspense>
		</Section>
	);
};
