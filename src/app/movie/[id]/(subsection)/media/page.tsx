import type { Metadata } from "next";
import { Suspense } from "react";
import { getMovieImages, getMovieVideos } from "$/lib/tmdb";
import GridImages from "$/components/grid/grid-images";
import GridSkeleton from "$/components/grid/grid-skeleton";
import GridVideos from "$/components/grid/grid-videos";
import Section from "$/components/section";

export const metadata: Metadata = {
	title: "Media",
};

export default async function MovieMediaPage(props: PageProps<"/movie/[id]/media">) {
	const { id } = await props.params;

	return (
		<>
			<Section name="Images">
				<Suspense fallback={<GridSkeleton />}>
					<MovieImages id={id} />
				</Suspense>
			</Section>
			<Section name="Videos">
				<Suspense fallback={<GridSkeleton />}>
					<MovieVideos id={id} />
				</Suspense>
			</Section>
		</>
	);
}

const MovieImages = async (props: { id: string }) => {
	const images = await getMovieImages(props.id);

	return <GridImages images={images} />;
};

const MovieVideos = async (props: { id: string }) => {
	const videos = await getMovieVideos(props.id);

	return <GridVideos videos={videos} />;
};
