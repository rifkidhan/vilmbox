import type { Metadata } from "next";
import { getMovie, getMovieCredits } from "$/lib/tmdb";
import { grouping } from "$/utils/array";
import { getYear } from "$/utils/format";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import { Grid, GridItem } from "$/components/grid/grid";

export async function generateMetada(props: PageProps<"/movie/[id]/credit">): Promise<Metadata> {
	const { id } = await props.params;

	const movie = await getMovie(id);

	return {
		title: movie.title
			? movie.release_date
				? `${movie.title} (${getYear(movie.release_date)}) - Credits`
				: `${movie.title} - Credits`
			: undefined,
		description: movie.overview,
	};
}

export default async function CreditMoviePage(props: PageProps<"/movie/[id]/credit">) {
	const { id } = await props.params;
	const credits = await getMovieCredits(id);
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
									<p className="card-role">{item.character}</p>
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
													<CardThumbnail title={item.name} img={item.profile_path} />
													<CardContent slotted>
														<p className="card-title">{item.name}</p>
														<p className="card-role">{item.job}</p>
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
