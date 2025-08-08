export const TITLE_PAGE = "vilmbox";
export const IMAGE_URL = "https://image.tmdb.org/t/p/";

export const NAVIGATIONS = [
	{
		title: "Movies",
		url: "/movie",
	},
	{
		title: "TV Shows",
		url: "/tv-show",
	},
	{
		title: "People",
		url: "/people",
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
