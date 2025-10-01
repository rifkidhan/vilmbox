import type { Metadata } from "next";
import { getMultiSearch } from "$/lib/tmdb";
import { formatDate } from "$/utils/format";
import mediaType from "$/utils/media-type";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import Pagination from "$/components/pagination";

export const metadata: Metadata = {
	title: "Search",
	description: "Search a movie, tv-show, and person.",
	alternates: {
		canonical: "/search",
	},
	openGraph: {
		type: "website",
		siteName: "vilmbox",
		url: "/search",
	},
};

export default async function MultiSearchPage(props: PageProps<"/search">) {
	const searchParams = await props.searchParams;

	const { q, page } = searchParams as { [key: string]: string | undefined };
	const data = await getMultiSearch(q, page);

	return (
		<div className="flex flex-col gap-10">
			<div className="w-full">
				<p>Search for "{q}"</p>
				{data ? <p>Total result {data.total_results}</p> : null}
			</div>

			<div className="flex flex-col gap-6">
				{!data || data.results.length < 1 ? (
					<div>No Results</div>
				) : (
					data.results.map((item) => (
						<Card
							key={`${item.media_type}_${item.id}`}
							url={`/${mediaType(item.media_type).id}/${item.id}`}
							shadow
							title={item.title || item.name}
						>
							<CardThumbnail
								title={item.title || item.name}
								img={item.poster_path || item.profile_path}
								size="sm"
							/>
							<CardContent slotted>
								<div>
									<div className="text-vb-md font-semibold">{item.title ?? item.name}</div>
									{item.first_air_date || item.release_date ? (
										<div className="text-accent-70">
											{formatDate(item.release_date || item.first_air_date || "")}
										</div>
									) : null}
								</div>
								<div className="text-vb-sm text-accent-70">{mediaType(item.media_type).name}</div>
							</CardContent>
						</Card>
					))
				)}
			</div>

			{data && data.total_pages > 1 ? <Pagination max={data.total_pages} /> : null}
		</div>
	);
}
