export const formatCurrency = (amount: number) => {
	const currency = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return currency.format(amount);
};

export const formatRuntime = (time: number) => {
	const hour = Math.floor(time / 60);
	const minute = Math.floor(time % 60);

	const formatHour = hour > 0 ? `${hour}h ` : "";
	const formatMinute = minute > 0 ? `${minute}min` : "";

	return formatHour + formatMinute;
};

export const formatDate = (time: string) => {
	const date = new Date(time);
	const dateTime = new Intl.DateTimeFormat(undefined, {
		dateStyle: "long",
	});

	return dateTime.format(date);
};

export const getYear = (time: string) => {
	const date = new Date(time);

	return date.getFullYear();
};

export const formatCountryName = (name: string) => {
	const displayName = new Intl.DisplayNames(["en"], {
		type: "region",
	});

	return displayName.of(name);
};

export const formatLanguage = (lang: string) => {
	const language = new Intl.DisplayNames(["en"], {
		type: "language",
	});

	return language.of(lang);
};

/**
 * format plural using cardinal format
 * suffixes key is 'one' and 'other'
 */
export const formatPlural = (
	length: number,
	suffixes: Record<string, string>,
) => {
	const rule = new Intl.PluralRules("en-US").select(length);
	const suffix = suffixes[rule];

	return suffix;
};

export const listFormat = (lists: string[]) => {
	const format = new Intl.ListFormat("en-US", {
		style: "long",
		type: "conjunction",
	});

	return format.format(lists);
};
