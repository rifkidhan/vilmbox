import type { Metadata } from "next";
import { Suspense } from "react";
import { TITLE_PAGE } from "$/lib/constants";
import { getMovie } from "$/lib/tmdb";
import { getYear } from "$/utils/format";
import BannerTitle from "./banner-title";
import { Hero, HeroSkeleton } from "$/components/hero";
import Image from "$/components/image";

export const generateMetadata = async (props: LayoutProps<"/movie/[id]">): Promise<Metadata> => {
	const { id } = await props.params;
	const movie = await getMovie(id);
	const defaultTitle = movie.title
		? movie.release_date
			? `${movie.title} (${getYear(movie.release_date)})`
			: movie.title
		: "untitled";

	return {
		title: {
			default: `${defaultTitle} | ${TITLE_PAGE}`,
			template: `${defaultTitle} - %s | ${TITLE_PAGE}`,
		},
		openGraph: {
			title: {
				default: `${defaultTitle} | ${TITLE_PAGE}`,
				template: `${defaultTitle} - %s | ${TITLE_PAGE}`,
			},
		},
	};
};

export default async function MovieSubsectionLayout(props: LayoutProps<"/movie/[id]">) {
	const { id } = await props.params;
	const movie = await getMovie(id);

	return (
		<>
			<Suspense fallback={<HeroSkeleton type="banner" />}>
				<Hero backdrop_path={movie.backdrop_path}>
					<div className="w-full py-8 backdrop-blur-2xl backdrop-brightness-50">
						<div className="mx-auto flex max-w-[92dvw] gap-4">
							<div className="hidden h-fit w-[10%] shrink-0 overflow-hidden rounded-lg shadow-md md:block">
								<Image src={movie.poster_path} alt={movie.title ?? "untitled"} />
							</div>
							<hgroup className="flex flex-col-reverse">
								<h2 className="text-vb-lg">{movie.title ?? "untitled"}</h2>
								<BannerTitle />
							</hgroup>
						</div>
					</div>
				</Hero>
			</Suspense>
			{props.children}
		</>
	);
}
