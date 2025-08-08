import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EPISODE_SUFFIXES } from "$/lib/constants";
import { getPersonDetails } from "$/lib/tmdb";
import { grouping } from "$/utils/array";
import { formatDate, formatPlural, getYear } from "$/utils/format";
import isNull from "$/utils/isNull";
import { Hero, HeroPoster, HeroSkeleton, HeroTitle } from "$/components/hero";
import Icon from "$/components/icon";
import Image from "$/components/image";
import ListItem from "$/components/list-item";
import OfficialSite from "$/components/official-site";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const person = await getPersonDetails(id);

	return {
		title: person.name,
		description: person.biography,
	};
}

export default async function PersonDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const person = await getPersonDetails(id);
	const crews = isNull(person.combine_crew)
		? undefined
		: grouping(person.combine_crew, (v) => v.department ?? "crew");

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={person.profile_path}>
					<HeroPoster title={person.name} poster_path={person.profile_path} />
					<HeroTitle>
						<h1>{person.name}</h1>
					</HeroTitle>
				</Hero>
			</Suspense>
			<section>
				<h2 className="section-title">
					<span>Personal Info</span>
				</h2>
				<ul className="info-details">
					<ListItem head="Known for">
						<span>{person.known_for_department}</span>
					</ListItem>
					<ListItem head="Born">
						{person.birthday ? (
							<>
								<span>{formatDate(person.birthday)}</span>
								<span>{person.place_of_birth}</span>
							</>
						) : null}
					</ListItem>
					<ListItem head="Died">
						{person.deathday ? (
							<span>{formatDate(person.deathday)}</span>
						) : null}
					</ListItem>
					<ListItem head="Also known as">
						{!isNull(person.also_known_as)
							? person.also_known_as.map((item, i) => (
									<span key={i}>{item}</span>
								))
							: null}
					</ListItem>
					<ListItem head="Official site">
						<OfficialSite
							homepage={person.homepage}
							twitter_id={person.external_ids.twitter_id}
							facebook_id={person.external_ids.facebook_id}
							tiktok_id={person.external_ids.tiktok_id}
							youtube_id={person.external_ids.youtube_id}
							instagram_id={person.external_ids.instagram_id}
						/>
					</ListItem>
				</ul>
			</section>
			{person.biography ? (
				<section>
					<h2 className="section-title">
						<span>Biography</span>
					</h2>
					<p>{person.biography}</p>
				</section>
			) : null}
			<section>
				<h2 className="section-title">
					<span>Credits</span>
				</h2>
				<Details section="Acting" name="credits" open>
					{person.combine_cast.map((item) => (
						<DetailsItem
							key={`${item.id + item.media_type}`}
							id={`${item.id}`}
							title={item.name ?? item.title}
							isMovie={item.media_type === "movie"}
							poster_path={item.poster_path}
							date={item.release_date ?? item.first_air_date}
						>
							{item.roles.map((role) => (
								<li key={role.credit_id} className="list-with-dot">
									<span>{role.character ? role.character : "-"}</span>
									{role.episode_count ? (
										<span>
											{role.episode_count}{" "}
											{formatPlural(role.episode_count, EPISODE_SUFFIXES)}
										</span>
									) : null}
								</li>
							))}
						</DetailsItem>
					))}
				</Details>
				{crews && crews.size > 0
					? crews.keys.map((key) => {
							const category = crews.collection(key);
							return (
								<Details key={key} section={key} name="credits">
									{category
										? category.map((item) => (
												<DetailsItem
													key={`${item.id}-${item.media_type}`}
													id={`${item.id}`}
													title={item.title ?? item.name}
													date={item.release_date ?? item.first_air_date}
													isMovie={item.media_type === "movie"}
													poster_path={item.poster_path}
												>
													{item.jobs.map((job) => (
														<li key={job.credit_id} className="list-with-dot">
															<span>{job.job ? job.job : "-"}</span>
															{job.episode_count ? (
																<span>
																	{job.episode_count}{" "}
																	{formatPlural(
																		job.episode_count,
																		EPISODE_SUFFIXES,
																	)}
																</span>
															) : null}
														</li>
													))}
												</DetailsItem>
											))
										: null}
								</Details>
							);
						})
					: null}
			</section>
		</>
	);
}

const Details = ({
	section,
	...props
}: { section: string } & React.ComponentProps<"details">) => {
	return (
		<details className="credit-details" {...props}>
			<summary>
				<h3>
					<span>{section}</span>
					<Icon name="chevron-down" isHidden />
				</h3>
			</summary>
			<ul className="credits">{props.children}</ul>
		</details>
	);
};

const DetailsItem = ({
	id,
	title,
	date,
	isMovie,
	poster_path,
	children,
}: {
	id: string;
	title?: string;
	isMovie: boolean;
	date?: string;
	poster_path?: string;
	children?: React.ReactNode;
}) => {
	const name = title ? title : "Untitled";
	const type = isMovie ? "movie" : "tv-show";
	return (
		<li className="credit">
			<Link href={`/${type}/${id}`} aria-label={`${name} ${type}`} />
			<div className="thumbnail">
				<Image src={poster_path} alt={name} />
			</div>
			<div className="item">
				<h4>{name}</h4>
				<ul>{children}</ul>
			</div>
			<div className="date">{date ? getYear(date) : "-"}</div>
		</li>
	);
};
