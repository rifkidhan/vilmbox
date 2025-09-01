import { unstable_cacheLife as cacheLife } from "next/cache";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { shuffle } from "$/utils/array";
import type {
	CombineCast,
	CombineCrew,
	CombineImage,
	MovieDetail,
	MovieTrending,
	PersonDetail,
	SeasonDetail,
	TrendingAll,
	TVTrending,
	TvSeriesDetail,
} from "./types";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_SECRET;

export const getPreference = async (): Promise<{
	lang: string;
	region: string;
}> => {
	const cookie = await cookies();
	// biome-ignore lint/style/noNonNullAssertion: has value
	const preference = cookie.get("preference")?.value!;

	return JSON.parse(preference);
};

const api = async <T>({
	endpoint,
	query,
}: {
	endpoint: string;
	query?: Record<string, string>;
}): Promise<T | never> => {
	if (!API_KEY || !API_URL) {
		throw new Error("API_KEY and API_URL must be provide.");
	}

	const url = new URL(API_URL + endpoint);

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			url.searchParams.set(key, value);
		}
	}

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				Accept: "application/json",
			},
		});

		if (res.status === 404) notFound();

		if (!res.ok) {
			throw new Error(res.statusText);
		}

		return await res.json();
	} catch (e) {
		console.error(e);
		throw {
			error: e,
		};
	}
};

// const getDate = (date: number) => {
// 	const dateFormat = new Date(date);

// 	return new Intl.DateTimeFormat("fr-CA", {
// 		year: "numeric",
// 		month: "2-digit",
// 		day: "2-digit",
// 	}).format(dateFormat);
// };
// const day = 86400000;
// const week = 604800000;

const getCertificate = (
	release_dates: MovieDetail["release_dates"]["results"],
	origin_country: string[],
	region = "US",
) => {
	let certificate: { iso_3166_1: string; certificate: string } | undefined;

	originLoop: for (const origin of origin_country) {
		releaseLoop: for (const releases of release_dates) {
			if (releases.iso_3166_1 === region) {
				for (const cert of releases.release_dates) {
					if (cert.certification) {
						certificate = {
							iso_3166_1: releases.iso_3166_1,
							certificate: cert.certification,
						};
						break originLoop;
					}
				}
			}
			if (releases.iso_3166_1 === origin) {
				for (const cert of releases.release_dates) {
					if (cert.certification) {
						certificate = {
							iso_3166_1: releases.iso_3166_1,
							certificate: cert.certification,
						};
						continue releaseLoop;
					}
				}
			}
			if (!certificate) {
				for (const cert of releases.release_dates) {
					if (cert.certification) {
						certificate = {
							iso_3166_1: releases.iso_3166_1 as string,
							certificate: cert.certification,
						};
						continue releaseLoop;
					}
				}
			}
		}
	}

	return certificate;
};

const getRating = (
	ratings: TvSeriesDetail["content_ratings"]["results"],
	origin_country: string[],
	region = "US",
) => {
	let certificate: { iso_3166_1: string; rating: string } | undefined;

	originLoop: for (const origin of origin_country) {
		for (const rating of ratings) {
			if (rating.iso_3166_1 === region) {
				certificate = {
					iso_3166_1: rating.iso_3166_1,
					rating: rating.rating,
				};

				break originLoop;
			}
			if (rating.iso_3166_1 === origin && origin !== "US") {
				certificate = {
					iso_3166_1: rating.iso_3166_1,
					rating: rating.rating,
				};
			}

			if (!certificate) {
				if (rating.iso_3166_1 === "US") {
					certificate = {
						iso_3166_1: rating.iso_3166_1,
						rating: rating.rating,
					};
				}
				certificate = {
					iso_3166_1: rating.iso_3166_1,
					rating: rating.rating,
				};
			}
		}
	}

	return certificate;
};

// trending data

export const getAllTrending = async () => {
	"use cache";
	cacheLife("days");

	const data = await api<TrendingAll>({ endpoint: "/trending/all/day" });

	return data;
};

export const getMovieTrending = async (time = "week") => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieTrending>({
		endpoint: `/trending/movie/${time}`,
	});

	return data;
};

export const getTvTrending = async (time = "week") => {
	"use cache";
	cacheLife("days");

	const data = await api<TVTrending>({ endpoint: `/trending/tv/${time}` });

	return data;
};

export const getMovie = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieDetail>({
		endpoint: `/movie/${id}`,
	});

	return data;
};

export const getMovieImages = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieDetail["images"]>({
		endpoint: `/movie/${id}/images`,
		query: {
			include_image_language: "en,null",
		},
	});

	const backdropImage = data.backdrops.map((image) => ({
		...image,
		backdrop: true,
	}));

	const images = [...data.posters, ...backdropImage] as CombineImage[];

	return shuffle(images);
};

export const getMovieVideos = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieDetail["videos"]>({
		endpoint: `/movie/${id}/videos`,
	});

	return data.results;
};

export const getMovieCredits = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieDetail["credits"]>({
		endpoint: `/movie/${id}/credits`,
	});

	return data;
};

export const getMovieRecommendations = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieDetail["recommendations"]>({
		endpoint: `/movie/${id}/recommendations`,
	});

	return data.results;
};

export const getMovieDetails = async (id: string, region = "US") => {
	"use cache";
	cacheLife("days");

	const data = await api<MovieDetail>({
		endpoint: `/movie/${id}`,
		query: {
			append_to_response: "release_dates,alternative_titles,keywords,external_ids",
		},
	});

	const { release_dates, origin_country, ...res } = data;
	const certificate = getCertificate(release_dates.results, origin_country, region);

	return {
		...res,
		release_dates: release_dates.results,
		certificate,
	};
};

// TV show data

export const getTv = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<TvSeriesDetail>({
		endpoint: `/tv/${id}`,
	});

	return data;
};

export const getTvImages = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<TvSeriesDetail["images"]>({
		endpoint: `/tv/${id}/images`,
		query: {
			include_image_language: "en,null",
		},
	});

	const backdropImage = data.backdrops.map((image) => ({
		...image,
		backdrop: true,
	}));

	const images = [...data.posters, ...backdropImage] as CombineImage[];

	return shuffle(images);
};

export const getTvVideos = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<TvSeriesDetail["videos"]>({
		endpoint: `/tv/${id}/videos`,
	});

	return data.results;
};

export const getTvCredits = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<TvSeriesDetail["aggregate_credits"]>({
		endpoint: `/tv/${id}/aggregate_credits`,
	});

	return data;
};

export const getTvRecommendations = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<TvSeriesDetail["recommendations"]>({
		endpoint: `/tv/${id}/recommendations`,
	});

	return data.results;
};

export const getTvDetails = async (id: string, region = "US") => {
	"use cache";
	cacheLife("days");

	const data = await api<TvSeriesDetail>({
		endpoint: `/tv/${id}`,
		query: {
			append_to_response: "alternative_titles,content_ratings,external_ids,keywords",
		},
	});

	const { content_ratings, origin_country, ...res } = data;

	const certificate = getRating(content_ratings.results, origin_country, region);

	return {
		...res,
		content_ratings: content_ratings.results,
		certificate,
	};
};

export const getTVSeasonDetail = async (tv_id: string, season_number: string) => {
	const data = await api<SeasonDetail>({
		endpoint: `/tv/${tv_id}/season/${season_number}`,
		query: {
			append_to_response: "videos,aggregate_credits",
		},
	});

	return data;
};

// Person data

export const getPersonDetails = async (id: string) => {
	"use cache";
	cacheLife("days");

	const data = await api<PersonDetail>({
		endpoint: `/person/${id}`,
		query: {
			append_to_response: "external_ids,combined_credits",
		},
	});

	const { combined_credits, ...res } = data;

	const cast_credits = new Map<string, CombineCast>();
	const crew_credits = new Map<string, CombineCrew>();

	for (const credit of combined_credits.cast) {
		const id = btoa(`${credit.id}-${credit.media_type}`);

		if (cast_credits.has(id)) {
			cast_credits.get(id)?.roles.push({
				credit_id: credit.credit_id,
				character: credit.character,
				episode_count: credit.episode_count,
				order: credit.order,
			});
		} else {
			cast_credits.set(id, {
				...credit,
				roles: [
					{
						credit_id: credit.credit_id,
						character: credit.character,
						episode_count: credit.episode_count,
						order: credit.order,
					},
				],
			});
		}
	}

	for (const credit of combined_credits.crew) {
		const id = btoa(`${credit.id}-${credit.media_type}`);

		if (crew_credits.has(id)) {
			crew_credits.get(id)?.jobs.push({
				credit_id: credit.credit_id,
				job: credit.job,
				episode_count: credit.episode_count,
				order: credit.order,
			});
		} else {
			crew_credits.set(id, {
				...credit,
				jobs: [
					{
						credit_id: credit.credit_id,
						job: credit.job,
						episode_count: credit.episode_count,
						order: credit.order,
					},
				],
			});
		}
	}

	const popular_cast = cast_credits
		.values()
		.toArray()
		.sort(
			(a, b) =>
				(b.vote_count * b.vote_average) / b.popularity -
				(a.vote_count * a.vote_average) / a.popularity,
		)
		.slice(0, 10);
	const popular_crew = crew_credits
		.values()
		.toArray()
		.sort(
			(a, b) =>
				(b.vote_count * b.vote_average) / b.popularity -
				(a.vote_count * a.vote_average) / a.popularity,
		)
		.slice(0, 10);

	const cast_sort = cast_credits
		.values()
		.toArray()
		.map((item) => {
			const getDate = item.release_date ?? item.first_air_date;
			const date = getDate ? new Date(getDate) : Date.now();

			return {
				...item,
				date,
			};
		})
		.sort((a, b) => b.date.valueOf() - a.date.valueOf());

	const crew_sort = crew_credits
		.values()
		.toArray()
		.map((item) => {
			const getDate = item.release_date ?? item.first_air_date;
			const date = getDate ? new Date(getDate) : Date.now();

			return {
				...item,
				date,
			};
		})
		.sort((a, b) => b.date.valueOf() - a.date.valueOf());

	return {
		...res,
		combine_cast: cast_sort,
		combine_crew: crew_sort,
		popular_cast: popular_cast,
		popular_crew: popular_crew,
	};
};
