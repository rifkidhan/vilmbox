import { Suspense } from "react";
import { getTv } from "$/lib/tmdb";
import { BannerTitle, Poster } from "./banner-title";
import { Banner, BannerHead, BannerSkeleton } from "$/components/banner";

export default async function MovieDetailLayout(props: LayoutProps<"/tv-show/[id]">) {
	const { id } = await props.params;
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
			{props.children}
		</>
	);
}
