import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMovieSearch, getPersonSearch, getTvSearch } from "$/lib/tmdb";
import { formatDate, listFormat } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import Pagination from "$/components/pagination";

const getData = async (param: string, query?: string, page?: string) => {
	if (!query || query === "") {
		return undefined;
	}

	switch (param) {
		case "movie":
			return await getMovieSearch(query, page);
		case "tv-show":
			return await getTvSearch(query, page);
		case "people":
			return await getPersonSearch(query, page);
	}
};

const isMediaType = (type: string) => {
	return type === "movie" || type === "tv-show" || type === "people";
};

export const generateMetadata = async (props: PageProps<"/search/[type]">): Promise<Metadata> => {
	const params = await props.params;
	const type = isMediaType(params.type);

	if (!type) {
		notFound();
	}

	return {
		title: `Search ${params.type}`,
		description: `Search ${params.type} in vilmbox.`,
		alternates: {
			canonical: `/search/${params.type}`,
		},
		openGraph: {
			type: "website",
			siteName: "vilmbox",
			url: `/search/${params.type}`,
		},
	};
};

export default async function SearchPage(props: PageProps<"/search/[type]">) {
	const params = await props.params;

	const type = isMediaType(params.type);
	if (!type) {
		notFound();
	}

	const searchParams = await props.searchParams;
	const { q, page } = searchParams as { [key: string]: string | undefined };

	const data = await getData(params.type, q, page);

	return (
		<div className="flex flex-col gap-10">
			<div className="w-full">Search for "{q}"</div>

			<div className="flex flex-col gap-6">
				{!data || data.results.length < 1 ? (
					<div>No Results</div>
				) : (
					data.results.map((item) => (
						<Card
							key={`${item.id}`}
							url={`/${params.type}/${item.id}`}
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
								{item.known_for ? (
									<div className="text-vb-sm">
										<div className="font-semibold">Known for</div>
										<div className="leading-none wrap-break-word text-accent-70">
											{listFormat(item.known_for.map((v) => v.title ?? v.name ?? ""))}
										</div>
									</div>
								) : null}
							</CardContent>
						</Card>
					))
				)}
			</div>
			{data && data.total_pages > 1 ? <Pagination max={data.total_pages} /> : null}
		</div>
	);
}
