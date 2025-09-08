import type { Metadata } from "next";
import { Suspense } from "react";
import { EPISODE_SUFFIXES } from "$/lib/constants";
import { getTvCredits } from "$/lib/tmdb";
import { grouping } from "$/utils/array";
import { formatPlural } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import GridSkeleton from "$/components/grid/grid-skeleton";
import Section from "$/components/section";

export const metadata: Metadata = {
	title: "Credits",
};

export default async function MovieCreditsPage(props: PageProps<"/tv-show/[id]/credits">) {
	const { id } = await props.params;
	const credits = await getTvCredits(id);
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
										<ul className="flex flex-col text-vb-sm font-medium text-accent-80">
											{item.roles.map((role, i) => (
												<li key={i} className="block">
													<span>{role.character}</span>
													<span className="ml-1 text-accent-60">
														({role.episode_count}{" "}
														{formatPlural(role.episode_count, EPISODE_SUFFIXES)})
													</span>
												</li>
											))}
										</ul>
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
															<ul className="flex flex-col text-vb-sm font-medium text-accent-80">
																{item.jobs.map((role, i) => (
																	<li key={i} className="block">
																		<span>{role.job}</span>
																		<span className="ml-1 text-accent-60">
																			({role.episode_count}{" "}
																			{formatPlural(role.episode_count, EPISODE_SUFFIXES)})
																		</span>
																	</li>
																))}
															</ul>
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
