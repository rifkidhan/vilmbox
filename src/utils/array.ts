export const groupBy = <V, K>(list: V[], get: (input: V) => K) => {
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

	return mapping;
};

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

export const find = <V, K>(array: V[], get: (input: V) => K) => {
	return array.find(get);
};

export const filter = <V, K>(array: V[], get: (input: V) => K) => {
	return array.filter(get);
};
