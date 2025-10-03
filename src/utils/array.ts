import type { Genre } from "$/lib/tmdb/types";

export const grouping = <V, K>(list: V[], get: (input: V) => K) => {
	const mapping = new Map<K, Array<V>>();

	for (const item of list) {
		const key = get(item);
		const collection = mapping.get(key);

		if (!collection) {
			mapping.set(key, [item]);
		} else {
			collection.push(item);
		}
	}

	return {
		size: mapping.size,
		keys: Array.from(mapping.keys()),
		collection: (key: K) => mapping.get(key),
	};
};

export const shuffle = <T>(array: T[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const r = Math.floor(Math.random() * (i + 1));

		[array[i], array[r]] = [array[r], array[i]];
	}

	return array;
};

export const randomize = <T>(array: T[]) => {
	return array[Math.floor(Math.random() * array.length)];
};

export const movieGenre = (ids: number[]) => {
	const allGenres = [...new Set(ids)];

	const genres: Genre[] = [
		{
			id: 28,
			name: "Action",
		},
		{
			id: 12,
			name: "Adventure",
		},
		{
			id: 16,
			name: "Animation",
		},
		{
			id: 35,
			name: "Comedy",
		},
		{
			id: 80,
			name: "Crime",
		},
		{
			id: 99,
			name: "Documentary",
		},
		{
			id: 18,
			name: "Drama",
		},
		{
			id: 10751,
			name: "Family",
		},
		{
			id: 14,
			name: "Fantasy",
		},
		{
			id: 36,
			name: "History",
		},
		{
			id: 27,
			name: "Horror",
		},
		{
			id: 10402,
			name: "Music",
		},
		{
			id: 9648,
			name: "Mystery",
		},
		{
			id: 10749,
			name: "Romance",
		},
		{
			id: 878,
			name: "Science Fiction",
		},
		{
			id: 10770,
			name: "TV Movie",
		},
		{
			id: 53,
			name: "Thriller",
		},
		{
			id: 10752,
			name: "War",
		},
		{
			id: 37,
			name: "Western",
		},
	];

	const result = allGenres.map((v) => genres.find(({ id }) => v === id));

	return result;
};
