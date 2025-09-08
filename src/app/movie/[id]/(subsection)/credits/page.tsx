import type { Metadata } from "next";
import { Suspense } from "react";
import { getMovieCredits } from "$/lib/tmdb";
import { grouping } from "$/utils/array";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import GridSkeleton from "$/components/grid/grid-skeleton";
import Section from "$/components/section";

export const metadata: Metadata = {
	title: "Credits",
};

export default async function MovieCreditsPage(props: PageProps<"/movie/[id]/credits">) {
	const { id } = await props.params;
	const credits = await getMovieCredits(id);
	const crews = grouping(credits.crew, (v) => v.department ?? "crew");

	return (
		<>
			<Section name="Cast">
				<Suspense fallback={<GridSkeleton />}>
					<ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
						{credits.cast.map((item, i) => (
							<li key={i}>
								<Card title={item.name} url={`/people/${item.id}`} shadow>
									<CardThumbnail title={item.name} img={item.profile_path} />
									<CardContent slotted>
										<div className="font-medium group-hover/card:underline">{item.name}</div>
										<div className="text-vb-sm text-accent-70">{item.character}</div>
									</CardContent>
								</Card>
							</li>
						))}
					</ul>
				</Suspense>
			</Section>
			<Section name="Crew">
				<Suspense fallback={<GridSkeleton />}>
					{crews.keys.map((cat) => {
						const category = crews.collection(cat);
						return (
							<div key={cat} className="flex flex-col gap-3">
								<h3 className="text-vb-md font-semibold">{cat}</h3>
								<ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
									{category
										? category.map((item, i) => (
												<li key={i}>
													<Card title={item.name} url={`/people/${item.id}`} shadow>
														<CardThumbnail title={item.name} img={item.profile_path} />
														<CardContent slotted>
															<div className="font-medium group-hover/card:underline">
																{item.name}
															</div>
															<div className="text-vb-sm text-accent-70">{item.job}</div>
														</CardContent>
													</Card>
												</li>
											))
										: null}
								</ul>
							</div>
						);
					})}
				</Suspense>
			</Section>
		</>
	);
}
