export default function ListSkeleton({ length = 8 }) {
	return (
		<ul className="flex flex-col gap-4">
			{Array(length)
				.fill(0)
				.map((_, i) => (
					<li key={i} className="flex flex-col gap-2">
						<span className="h-[1ch] w-[10ch] animate-pulse rounded-xl bg-accent-40" />
						<span className="h-[1ch] w-[15ch] animate-pulse rounded-xl bg-accent-40" />
					</li>
				))}
		</ul>
	);
}
