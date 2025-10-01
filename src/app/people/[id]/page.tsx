import type { Metadata, Route } from "next";
import { Suspense } from "react";
import { EPISODE_SUFFIXES } from "$/lib/constants";
import { getPersonDetails } from "$/lib/tmdb";
import { grouping } from "$/utils/array";
import { formatDate, formatPlural, getYear } from "$/utils/format";
import isNull from "$/utils/isNull";
import { Card, CardContent, CardThumbnail } from "$/components/card";
import { Carousel, CarouselButtons, CarouselViewport } from "$/components/carousel";
import {
	Hero,
	HeroContent,
	HeroPoster,
	HeroSkeleton,
	HeroTitle,
	HeroWrapper,
} from "$/components/hero";
import Icon from "$/components/icon";
import Image from "$/components/image";
import Link from "$/components/link";
import ListItem from "$/components/list-item";
import OfficialSite from "$/components/official-site";
import Section from "$/components/section";

export const generateMetadata = async (props: PageProps<"/people/[id]">): Promise<Metadata> => {
	const { id } = await props.params;
	const person = await getPersonDetails(id);
	return {
		title: person.name,
	};
};

export default async function PersonPage(props: PageProps<"/people/[id]">) {
	const { id } = await props.params;
	const person = await getPersonDetails(id);
	const crews = isNull(person.combine_crew)
		? undefined
		: grouping(person.combine_crew, (v) => v.department ?? "crew");

	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero backdrop_path={person.profile_path}>
					<HeroWrapper>
						<HeroPoster poster_path={person.profile_path} title={person.name} />
						<HeroContent>
							<HeroTitle title={person.name} />
							<div className="block w-full @5xl/hero:col-span-2">
								<h2 className="text-vb-md font-medium">Popular Credits</h2>
								<Carousel>
									<CarouselViewport>
										{person.known_for_department === "Acting"
											? person.popular_cast.map((item, i) => (
													<Card
														key={i}
														title={item.name ?? item.title}
														shadow
														url={`/${item.media_type === "tv" ? "tv-show" : "movie"}/${item.id}`}
														className="text-accent-80"
													>
														<CardThumbnail title={item.name ?? item.title} img={item.poster_path} />
														<CardContent
															rating={item.vote_average}
															title={item.name ?? item.title}
														></CardContent>
													</Card>
												))
											: person.popular_crew.map((item, i) => (
													<Card
														key={i}
														title={item.name ?? item.title}
														shadow
														url={`/${item.media_type === "tv" ? "tv-show" : "movie"}/${item.id}`}
													>
														<CardThumbnail title={item.name ?? item.title} img={item.poster_path} />
														<CardContent
															rating={item.vote_average}
															title={item.name ?? item.title}
														></CardContent>
													</Card>
												))}
									</CarouselViewport>
									<CarouselButtons />
								</Carousel>
							</div>
						</HeroContent>
					</HeroWrapper>
				</Hero>
			</Suspense>
			<Section name="Personal Info">
				<ul className="flex flex-col gap-4">
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
						{person.deathday ? <span>{formatDate(person.deathday)}</span> : null}
					</ListItem>
					<ListItem head="Also known as">
						{!isNull(person.also_known_as)
							? person.also_known_as.map((item, i) => <span key={i}>{item}</span>)
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
			</Section>
			{person.biography ? (
				<Section name="Biography">
					<p>{person.biography}</p>
				</Section>
			) : null}
			<Section name="Credits">
				{!isNull(person.combine_cast) ? (
					<Details section="Acting" name="credits">
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
												{role.episode_count} {formatPlural(role.episode_count, EPISODE_SUFFIXES)}
											</span>
										) : null}
									</li>
								))}
							</DetailsItem>
						))}
					</Details>
				) : null}
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
																	{formatPlural(job.episode_count, EPISODE_SUFFIXES)}
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
			</Section>
		</>
	);
}

const Details = ({ section, ...props }: { section: string } & React.ComponentProps<"details">) => {
	return (
		<details
			className="group/details relative flex flex-col overflow-hidden rounded-lg shadow-lg shadow-black/30 details-content:h-0 details-content:overflow-y-clip details-content:transition-all details-content:transition-discrete details-content:duration-500 details-content:ease-in-out open:gap-4 open:details-content:h-fit"
			{...props}
		>
			<summary className="block cursor-pointer bg-accent-5 py-4 font-semibold">
				<h3 className="flex items-center-safe justify-between px-4">
					<span>{section}</span>
					<Icon name="chevron-down" className="transition group-open/details:rotate-180" isHidden />
				</h3>
			</summary>
			<ul className="flex flex-col divide-y">{props.children}</ul>
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
		<li className="group/item relative flex w-full items-center-safe gap-2 px-4 py-2 hover:bg-accent-30">
			<Link
				href={`/${type}/${id}` as Route}
				aria-label={`${name} ${type}`}
				className="absolute top-0 left-0 z-[1] size-full"
			/>
			<div className="block h-fit w-12 shrink-0 overflow-hidden rounded-md">
				<Image src={poster_path} alt={name} />
			</div>
			<div className="flex w-full flex-col gap-2">
				<h4 className="font-semibold group-hover/item:underline">{name}</h4>
				<ul className="ml-2 text-vb-sm text-accent-70">{children}</ul>
			</div>
			<div className="shrink-0 text-primary-dark">{date ? getYear(date) : "-"}</div>
		</li>
	);
};
