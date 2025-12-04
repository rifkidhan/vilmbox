export default function Loading() {
	return (
		<ul className="mx-auto flex max-w-[92dvw] flex-col gap-8">
			{Array(8)
				.fill(0)
				.map((_, i) => (
					<li key={i} className="h-40 w-full animate-pulse rounded-xl bg-accent-40" />
				))}
		</ul>
	);
}
