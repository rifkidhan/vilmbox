import type { Metadata } from "next";
import { getTv, getTvImages, getTvVideos } from "$/lib/tmdb";
import GridImages from "$/components/grid/grid-images";
import GridVideos from "$/components/grid/grid-videos";

export async function generateMetada({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	const tv = await getTv(id);

	return {
		title: tv.name ? `${tv.name} - Media` : "Untitled - Media",
		description: tv.overview,
	};
}

export default async function MovieMediaPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const tv = await getTv(id);

	const [images, videos] = await Promise.all([
		getTvImages(id),
		getTvVideos(id),
	]);

	return (
		<>
			<section>
				<h2 className="section-title">
					<span>Images</span>
				</h2>
				<GridImages images={images} title={tv.name} />
			</section>
			<section>
				<h2 className="section-title">
					<span>Videos</span>
				</h2>
				<GridVideos videos={videos} />
			</section>
		</>
	);
}
