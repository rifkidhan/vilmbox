import type { Metadata } from "next";
import { getMovie, getMovieImages, getMovieVideos } from "$/lib/tmdb";
import { getYear } from "$/utils/format";
import GridImages from "$/components/grid/grid-images";
import GridVideos from "$/components/grid/grid-videos";

export async function generateMetada({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	const movie = await getMovie(id);

	return {
		title: movie.title
			? movie.release_date
				? `${movie.title} (${getYear(movie.release_date)}) - Media`
				: `${movie.title} - Media`
			: undefined,
		description: movie.overview,
	};
}

export default async function MovieMediaPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const movie = await getMovie(id);

	const [images, videos] = await Promise.all([
		getMovieImages(id),
		getMovieVideos(id),
	]);

	return (
		<>
			<section>
				<h2 className="section-title">
					<span>Images</span>
				</h2>
				<GridImages images={images} title={movie.title} />
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
