import type { Metadata } from "next";
import { Suspense } from "react";
import { TITLE_PAGE } from "$/lib/constants";
import { getTv } from "$/lib/tmdb";
import { getYear } from "$/utils/format";
import { BannerTitle, Poster } from "./banner-title";
import { Hero, HeroSkeleton } from "$/components/hero";

export const generateMetadata = async (props: LayoutProps<"/tv-show/[id]">): Promise<Metadata> => {
	const { id } = await props.params;
	const tv = await getTv(id);
	const defaultTitle = tv.name
		? tv.first_air_date
			? `${tv.name} (${getYear(tv.first_air_date)})`
			: tv.name
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

export default async function TvSubsectionLayout(props: LayoutProps<"/tv-show/[id]">) {
	const { id } = await props.params;
	const tv = await getTv(id);

	return (
		<>
			<Suspense fallback={<HeroSkeleton type="banner" />}>
				<Hero backdrop_path={tv.backdrop_path}>
					<div className="w-full py-8 backdrop-blur-2xl backdrop-brightness-50">
						<div className="mx-auto flex max-w-[92dvw] gap-4">
							<div className="hidden h-fit w-[10%] shrink-0 overflow-hidden rounded-lg shadow-md md:block">
								<Poster
									seasons={tv.seasons}
									name={tv.name ?? "untitled"}
									poster_path={tv.poster_path}
								/>
							</div>
							<hgroup className="flex flex-col-reverse">
								<h2 className="text-vb-lg">{tv.name ?? "untitled"}</h2>
								<BannerTitle seasons={tv.seasons} />
							</hgroup>
						</div>
					</div>
				</Hero>
			</Suspense>
			{props.children}
		</>
	);
}
