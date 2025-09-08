export default function throttle<T extends () => void>(fn: T, ms: number) {
	let id: ReturnType<typeof setTimeout> | undefined | null;

	const cancel = () => {
		if (id !== null) {
			clearTimeout(id);
		}
	};
	const debouncedFn = () => {
		cancel();
		id = setTimeout(() => {
			id = null;
			fn();
		}, ms);
	};
	debouncedFn._cancel = cancel;
	return debouncedFn;
}
