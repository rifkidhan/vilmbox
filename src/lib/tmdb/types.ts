export type MediaType = "tv" | "movie" | "person";

interface Base {
	id: number;
	adult: boolean;
	popularity: number;
	vote_count: number;
	vote_average: number;
}

interface MovieType extends Base {
	backdrop_path?: string;
	genre_ids: number[];
	original_language?: string;
	original_title?: string;
	overview?: string;
	media_type: MediaType;
	poster_path?: string;
	release_date?: string;
	title?: string;
	video?: boolean;
}

interface TvType extends Base {
	poster_path?: string;
	overview?: string;
	backdrop_path?: string;
	media_type: MediaType;
	first_air_date?: string;
	origin_country: string[];
	genre_ids: number[];
	original_language?: string;
	name?: string;
	original_name?: string;
}

export interface PersonType extends Omit<Base, "vote_count" | "vote_average"> {
	profile_path?: string;
	name?: string;
	media_type: MediaType;
	known_for_department?: string;
	known_for: (MovieType & TvType)[];
}

// piece of type
type MovieStatus =
	| "Rumored"
	| "Planned"
	| "In Production"
	| "Post Production"
	| "Released"
	| "Canceled";

type SeriesType =
	| "Documentary"
	| "News"
	| "Miniseries"
	| "Reality"
	| "Scripted"
	| "Talk Show"
	| "Video";

type SeriesStatus =
	| "Returning Series"
	| "Planned"
	| "In Production"
	| "Ended"
	| "Canceled"
	| "Pilot";

interface AlternativeTitle {
	iso_3166_1?: string;
	title?: string;
	type?: string;
}

interface ReleaseDate {
	certification?: string;
	iso_639_1?: string;
	release_date?: string;
	type: number;
	note?: string;
}

export interface Video {
	id?: string;
	iso_639_1?: string;
	iso_3166_1?: string;
	key: string;
	name?: string;
	official: boolean;
	published_at?: string;
	site?: string;
	size: 360 | 480 | 720 | 1080;
	type:
		| "Trailer"
		| "Teaser"
		| "Clip"
		| "Behind The Scenes"
		| "Bloopers"
		| "Featurette"
		| "Opening Credits";
}

interface SimpleEpisode extends Omit<Base, "adult" | "popularity"> {
	air_date?: string;
	episode_number: number;
	name?: string;
	order: number;
	overview?: string;
	production_code?: string;
	rating: number;
	season_number: number;
	show_id: number;
	still_path?: string;
	episode_type?: string;
	runtime: number;
}

export interface SimpleSeason extends Pick<Base, "id" | "vote_average"> {
	air_date?: string;
	episode_count: number;
	name?: string;
	overview?: string;
	poster_path?: string;
	season_number: number;
}

export interface BaseImage {
	aspect_ratio: number;
	file_path?: string;
	height: number;
	vote_average: number;
	vote_count: number;
	width: number;
	iso_639_1?: string;
}

interface SimplePerson extends Pick<PersonType, "id" | "name" | "profile_path"> {
	credit_id?: string;
	gender: number;
}

interface Cast extends Omit<PersonType, "media_type" | "known_for"> {
	cast_id: number;
	character?: string;
	credit_id?: string;
	gender: number;
	order: number;
	original_name?: string;
}

interface Crew extends Omit<Cast, "cast_id" | "character"> {
	department?: string;
	job?: string;
}

interface AggregateCast extends Omit<Cast, "credit_id" | "cast_id" | "character"> {
	roles: { credit_id?: string; character?: string; episode_count: number }[];
	total_episode_count: number;
}

interface AggregateCrew extends Omit<Crew, "credit_id" | "job"> {
	jobs: { credit_id?: string; job?: string; episode_count: number }[];
	total_episode_count: number;
}

export interface Genre {
	id: number;
	name: string;
}

interface ProductionCompany {
	name?: string;
	id: number;
	logo_path?: string;
	origin_country?: string;
}

interface ProductionCountry {
	name?: string;
	iso_3166_1: string;
}

interface SpokenLanguage {
	iso_639_1?: string;
	name?: string;
}

interface BelongCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

interface Network {
	name: string;
	id: number;
	logo_path?: string;
	origin_country?: string;
}

interface Keyword {
	id: number;
	name: string;
}

export interface ExternalIds {
	imdb_id?: string;
	wikidata_id?: string;
	freebase_id?: string;
	freebase_mid?: string;
	tvdb_id?: number;
	tvrage_id?: number;
	facebook_id?: string;
	instagram_id?: string;
	twitter_id?: string;
	tiktok_id?: string;
	youtube_id?: string;
}

export interface CombineImage extends BaseImage {
	backdrop?: boolean;
}

// results
interface PaginationResult {
	page: number;
	total_pages: number;
	total_results: number;
}

export type MovieTV = MovieType & TvType;

export type All = MovieType & TvType & PersonType;

export interface TrendingAll extends PaginationResult {
	results: All[];
}

export interface MovieTrending extends PaginationResult {
	results: MovieType[];
}

export interface TVTrending extends PaginationResult {
	results: TvType[];
}

export interface PeopleTrending extends PaginationResult {
	results: PersonType[];
}

export interface MovieDiscover extends PaginationResult {
	results: Omit<MovieType, "media_type">[];
}

export interface TVDiscover extends PaginationResult {
	results: Omit<TvType, "media_type">[];
}

export interface PersonPopular extends PaginationResult {
	results: Omit<PersonType, "media_type">[];
}

type CombineSeachType = Omit<MovieType, "media_type"> &
	Omit<TvType, "media_type"> &
	Omit<PersonType, "media_type">;

export interface CombineSearch extends PaginationResult {
	results: CombineSeachType[];
}

export interface MovieDetail extends Omit<MovieType, "genre_ids" | "media_type"> {
	belongs_to_collection?: BelongCollection;
	budget: number;
	genres: Genre[];
	homepage?: string;
	imdb_id?: string;
	origin_country: string[];
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: MovieStatus;
	tagline?: string;

	// videos
	videos: {
		results: Video[];
	};

	// release dates
	release_dates: {
		results: { iso_3166_1?: string; release_dates: ReleaseDate[] }[];
	};

	// credits
	credits: {
		cast: Cast[];
		crew: Crew[];
	};

	// alternative titles
	alternative_titles: {
		titles: AlternativeTitle[];
	};

	// external ids
	external_ids: Pick<
		ExternalIds,
		"imdb_id" | "wikidata_id" | "facebook_id" | "instagram_id" | "twitter_id"
	>;

	recommendations: {
		results: MovieType[];
	};

	keywords: {
		keywords: Keyword[];
	};

	images: {
		id: number;
		backdrops: BaseImage[];
		posters: BaseImage[];
	};
}

export interface TvSeriesDetail extends Omit<TvType, "genre_ids" | "adult" | "media_type"> {
	created_by: SimplePerson[];
	episode_run_time: number[];
	genres: Genre[];
	homepage?: string;
	in_production: boolean;
	languages: string[];
	last_air_date?: string;
	last_episode_to_air?: SimpleEpisode;
	next_episode_to_air?: SimpleEpisode;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: SimpleSeason[];
	spoken_languages: SpokenLanguage[];
	status: SeriesStatus;
	tagline?: string;
	type: SeriesType;

	// videos
	videos: {
		results: Video[];
	};

	aggregate_credits: {
		cast: AggregateCast[];
		crew: AggregateCrew[];
	};

	alternative_titles: {
		results: { iso_3166_1: string; title: string; type?: string }[];
	};

	content_ratings: {
		results: { iso_3166_1: string; rating: string }[];
	};

	external_ids: Omit<ExternalIds, "tiktok_id" | "youtube_id">;

	recommendations: {
		results: TvType[];
	};

	keywords: {
		results: Keyword[];
	};

	images: {
		id: number;
		backdrops: BaseImage[];
		posters: BaseImage[];
	};
}

interface Cast extends Omit<PersonType, "known_for" | "media_type"> {
	credit_id?: string;
	order: number;
	character?: string;
}

interface Crew extends Omit<PersonType, "known_for" | "media_type"> {
	credit_id?: string;
	order: number;
	department?: string;
}

export type CombineCast = MovieTV & {
	episode_count?: number;
	character?: string;
	credit_id?: string;
	order?: number;
	roles: {
		credit_id?: string;
		character?: string;
		episode_count?: number;
		order?: number;
	}[];
};

export type CombineCrew = Omit<CombineCast, "character" | "roles"> & {
	department?: string;
	job?: string;
	jobs: {
		credit_id?: string;
		job?: string;
		episode_count?: number;
		order?: number;
	}[];
};

export interface PersonDetail extends Omit<PersonType, "media_type" | "known_for"> {
	birthday?: string;
	deathday?: string;
	also_known_as: string[];
	gender: number;
	biography?: string;
	place_of_birth?: string;
	imdb_id?: string;
	homepage?: string;

	external_ids: ExternalIds;

	combined_credits: {
		cast: CombineCast[];
		crew: CombineCrew[];
	};
}

type Episode = SimpleEpisode & {
	crew: Crew[];
	guest_stars: Cast[];
};

export interface SeasonDetail extends SimpleSeason {
	episodes: Episode[];

	videos: {
		results: Video[];
	};

	aggregate_credits: {
		cast: AggregateCast[];
		crew: AggregateCrew[];
	};
}

export interface Collection {
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview?: string;
	poster_path?: string;
	backdrop_path?: string;
	parts: MovieType[];
}
