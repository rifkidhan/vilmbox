export default function isNull(item?: unknown) {
	if (Array.isArray(item) && item.length === 0) return true;

	if (item || (typeof item === "number" && item > 0)) {
		return false;
	}

	return true;
}
