export const TITLE_PAGE = "vilmbox";
export const DESCRIPTION_PAGE = "The movie and tv show database website";
export const IMAGE_URL = "https://image.tmdb.org/t/p/";

export const NAVIGATIONS = [
	{
		id: null,
		slug: "/",
		name: "All",
	},
	{
		id: "movie",
		slug: "/movie",
		name: "Movies",
	},
	{
		id: "tv-show",
		slug: "/tv-show",
		name: "TV Shows",
	},
	{
		id: "people",
		slug: "/people",
		name: "People",
	},
];

export const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: "http://localhost:3000";

export const EPISODE_SUFFIXES = {
	one: "episode",
	other: "episodes",
};

export const SEASON_SUFFIXES = {
	one: "season",
	other: "seasons",
};

/**
 * must be n + 1
 */
export const RELEASE_TYPE = [
	"Premiere",
	"Theatrical",
	"Theatrical (limited)",
	"Physical",
	"Digital",
	"TV",
];
