import { Suspense } from "react";
import { getTv } from "$/lib/tmdb";
import { BannerTitle, Poster } from "./banner-title";
import { Banner, BannerHead, BannerSkeleton } from "$/components/banner";

export default async function MovieDetailLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const tv = await getTv(id);

	return (
		<>
			<Suspense fallback={<BannerSkeleton />}>
				<Banner backdrop_path={tv.backdrop_path}>
					<Poster seasons={tv.seasons} poster_path={tv.poster_path} />
					<BannerHead>
						<BannerTitle seasons={tv.seasons} />
						<h2>{tv.name}</h2>
					</BannerHead>
				</Banner>
			</Suspense>
			{children}
		</>
	);
}
