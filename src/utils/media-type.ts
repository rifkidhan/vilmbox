import type { MediaType } from "$/lib/tmdb/types";

export default function mediaType(type: MediaType) {
	switch (type) {
		case "tv":
			return {
				id: "tv-show",
				name: "TV Show",
			};
		case "movie":
			return {
				id: "movie",
				name: "Movie",
			};
		case "person":
			return {
				id: "people",
				name: "People",
			};
	}
}
