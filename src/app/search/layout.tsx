import { Suspense } from "react";
import SideNavigation, { SideNavigationSkeleton } from "./navigation";
import SearchSegment, { SearchSegmentSkeleton } from "./search";
import SearchWrapper from "./search-wrapper";

export default async function SearchLayout(props: LayoutProps<"/search">) {
	return (
		<>
			<div className="sticky top-(--header-height) z-[2]">
				<Suspense fallback={<SearchSegmentSkeleton />}>
					<SearchSegment />
				</Suspense>
			</div>
			<div className="mx-auto grid w-[92dvw] grid-cols-1 gap-10 md:grid-cols-[auto_minmax(0,1fr)]">
				<div>
					<div className="sticky top-[calc(var(--header-height)+3rem)] w-full md:w-[20dvw] md:rounded-lg md:bg-accent-5 md:p-4">
						<h1 className="mb-6 hidden text-vb-lg font-semibold md:block">Search</h1>
						<Suspense fallback={<SideNavigationSkeleton />}>
							<SideNavigation />
						</Suspense>
					</div>
				</div>
				<Suspense fallback={null}>
					<SearchWrapper>{props.children}</SearchWrapper>
				</Suspense>
			</div>
		</>
	);
}
