import { Suspense } from "react";
import { getMovie } from "$/lib/tmdb";
import BannerTitle from "./banner-title";
import {
	Banner,
	BannerHead,
	BannerPoster,
	BannerSkeleton,
} from "$/components/banner";

export default async function MovieDetailLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await getMovie(id);

	return (
		<>
			<Suspense fallback={<BannerSkeleton />}>
				<Banner>
					<BannerPoster
						poster_path={movie.poster_path}
						content_title={movie.poster_path}
					/>
					<BannerHead>
						<BannerTitle />
						<h2>{movie.title}</h2>
					</BannerHead>
				</Banner>
			</Suspense>
			{children}
		</>
	);
}
