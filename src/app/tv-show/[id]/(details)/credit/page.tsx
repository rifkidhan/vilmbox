import type { Metadata } from "next";
import { EPISODE_SUFFIXES } from "$/lib/constants";
import { getTv, getTvCredits } from "$/lib/tmdb";
import { grouping } from "$/utils/array";
import { formatPlural } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import { Grid, GridItem } from "$/components/grid/grid";

export async function generateMetada({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	const tv = await getTv(id);

	return {
		title: tv.name ? `${tv.name} - Media` : "Untitled - Media",
		description: tv.overview,
	};
}

export default async function CreditMoviePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const credits = await getTvCredits(id);
	const crews = grouping(credits.crew, (v) => v.department ?? "crew");

	return (
		<>
			<section>
				<h2 className="section-title">
					<span>Cast</span>
				</h2>
				<Grid>
					{credits.cast.map((item, i) => (
						<GridItem key={i}>
							<Card
								title={item.name}
								url={`/people/${item.id}`}
								shadow
								className="custom-card-credit"
							>
								<CardThumbnail title={item.name} img={item.profile_path} />
								<CardContent slotted>
									<p className="card-title">{item.name}</p>
									<p className="card-role">{item.roles[0].character}</p>
								</CardContent>
							</Card>
						</GridItem>
					))}
				</Grid>
			</section>
			<section>
				<h2 className="section-title">
					<span>Crew</span>
				</h2>
				{crews.keys.map((cat) => {
					const category = crews.collection(cat);
					return (
						<div key={cat} className="subsection">
							<h3>{cat}</h3>
							<Grid>
								{category
									? category.map((item, i) => (
											<GridItem key={i}>
												<Card
													title={item.name}
													url={`/people/${id}`}
													shadow
													className="custom-card-credit"
												>
													<CardThumbnail
														title={item.name}
														img={item.profile_path}
													/>
													<CardContent slotted>
														<p className="card-title">{item.name}</p>
														<ul>
															{item.jobs.map((job, i) => (
																<li key={i} className="cast-role">
																	<span>{job.job}</span>
																	<span>
																		({job.episode_count}
																		{formatPlural(
																			job.episode_count,
																			EPISODE_SUFFIXES,
																		)}
																		)
																	</span>
																</li>
															))}
														</ul>
													</CardContent>
												</Card>
											</GridItem>
										))
									: null}
							</Grid>
						</div>
					);
				})}
			</section>
		</>
	);
}
