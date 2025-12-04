export default function GridSkeleton({ length = 16 }) {
	return (
		<ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
			{Array(length)
				.fill(0)
				.map((_, i) => (
					<li key={i} className="h-40 w-full animate-pulse rounded-xl bg-accent-40" />
				))}
		</ul>
	);
}
