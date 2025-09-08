import type { Metadata } from "next";
import { Suspense } from "react";
import { getPopularPerson } from "$/lib/tmdb";
import { listFormat } from "$/utils/format";
import Subtitle from "./subtitle";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import GridSkeleton from "$/components/grid/grid-skeleton";
import Pagination from "$/components/pagination";
import { MinimalHeader } from "$/components/section";

export const metadata: Metadata = {
	title: "Person",
	description: "People credits from movies or tv show.",
	alternates: {
		canonical: "/people",
	},
	openGraph: {
		type: "website",
		siteName: "vilmbox",
		url: "/people",
	},
};

export default async function PeoplePage(props: PageProps<"/people">) {
	const searchParam = await props.searchParams;
	const { page } = searchParam as { [key: string]: string | undefined };
	const persons = await getPopularPerson(page);

	return (
		<>
			<MinimalHeader title="Popular Person">
				<Subtitle />
			</MinimalHeader>
			<div className="mx-auto grid w-[92dvw] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<Suspense fallback={<GridSkeleton length={20} />}>
					{persons.results.map((item) => (
						<Card key={item.id} title={item.name} url={`/people/${item.id}`} shadow>
							<CardThumbnail title={item.name} img={item.profile_path} />
							<CardContent title={item.name}>
								<div className="flex flex-col gap-1 text-vb-sm">
									<div className="font-semibold">Known for</div>
									<div className="leading-none wrap-break-word text-accent-70">
										{listFormat(item.known_for.map((v) => v.title ?? v.name ?? ""))}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</Suspense>
			</div>
			<Pagination />
		</>
	);
}
