import type { Route } from "next";
import type { Genre, MediaType, Video } from "$/lib/tmdb/types";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { getYear } from "$/utils/format";
import mediaType from "$/utils/media-type";
import { cn } from "$/utils/merge";
import Button from "./button";
import Image from "./image";
import Truncate from "./truncate";
import { VideoButton } from "./video";

const defaultTitle = (title?: string) => (title && title !== "" ? title : "untitled");

export const Hero = ({
	backdrop_path,
	minimal,
	className,
	...props
}: { backdrop_path?: string; minimal?: boolean } & React.ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"relative block h-max w-full text-white",
				{ "select-none": minimal },
				className,
			)}
			{...props}
		>
			<div
				className={cn("block size-full bg-accent-80", {
					"relative z-[-1] mask-linear-180 mask-linear-from-20% mask-linear-to-90% max-md:h-72 max-sm:h-54 md:absolute md:right-0 md:left-[unset] md:w-4/5 md:mask-linear-270 md:mask-linear-from-0% md:mask-linear-to-90% lg:mask-linear-from-20% lg:mask-linear-to-90%":
						minimal,
					"absolute top-0 left-0": !minimal,
				})}
			>
				{backdrop_path ? (
					<Image src={backdrop_path} type="backdrop" full fill priority alt="" aria-hidden="true" />
				) : null}
			</div>
			{props.children}
		</div>
	);
};

export const HeroWrapper = (props: { children?: React.ReactNode }) => {
	return (
		<div className="@container/hero w-full pt-[calc(var(--header-height)+2rem)] pb-8 backdrop-blur-3xl backdrop-brightness-50">
			<div className="mx-auto grid max-w-[92dvw] grid-cols-1 place-items-center-safe gap-12 @3xl/hero:grid-cols-[auto_minmax(0,1fr)] @3xl/hero:place-items-start @5xl/hero:grid-cols-[auto_repeat(2,minmax(0,1fr))]">
				{props.children}
			</div>
		</div>
	);
};

export const HeroPoster = ({ poster_path, title }: { poster_path?: string; title?: string }) => {
	return (
		<div className="block h-fit w-[45cqw] overflow-hidden rounded-xl shadow-md @3xl/hero:w-[30cqw] @5xl/hero:w-[25cqw]">
			<Image src={poster_path} alt={defaultTitle(title)} priority />
		</div>
	);
};

export const HeroContent = (props: { children?: React.ReactNode }) => {
	return (
		<div className="grid h-full grid-cols-subgrid place-items-center-safe gap-4 @3xl/hero:place-items-start @5xl/hero:col-span-2">
			{props.children}
		</div>
	);
};

export const HeroOverview = (props: { overview?: string }) => {
	const overview =
		props.overview && props.overview !== "" ? props.overview : "Overview not available";

	return <Truncate className="@5xl/hero:col-span-2">{overview}</Truncate>;
};

export const HeroTitle = ({ title, tagline }: { title?: string; tagline?: string }) => {
	return (
		<div className="text-center @3xl/hero:text-left @5xl/hero:col-span-2">
			<h1 className="text-vb-xl leading-none font-semibold text-balance">{defaultTitle(title)}</h1>
			{tagline ? <div className="text-vb-md italic">{tagline}</div> : null}
		</div>
	);
};

export const HeroMisc = ({ children }: { children?: React.ReactNode }) => {
	return <ul className="list-with-dot flex-wrap">{children}</ul>;
};

export const HeroAction = ({
	vote_average,
	vote_count,
	videos,
}: {
	vote_average: number;
	vote_count: number;
	videos?: Video[];
}) => {
	const getVideoPreview = () => {
		if (!videos || videos.length < 1) return undefined;

		let preview = videos.find((v) => v.type === "Trailer");

		if (!preview) {
			preview = videos[0];
		}

		return preview;
	};

	const video = getVideoPreview();

	return (
		<div className="flex items-center gap-6 @5xl/hero:col-span-2">
			<div className="flex flex-row items-center gap-1">
				<StarIcon stroke="none" className="size-10 fill-sunflower" aria-hidden />
				<div className="flex flex-col">
					<span className="font-semibold">{Math.floor(vote_average * 10)}%</span>
					<span className="text-vb-sm">{vote_count}</span>
				</div>
			</div>
			{video && <VideoButton video={video} />}
		</div>
	);
};

export const HeroGenres = ({ genres }: { genres: Genre[] }) => {
	return (
		<ul className="list-with-dot flex-wrap">
			{genres.map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);
};

export const HeroMinimal = ({
	id,
	name,
	type,
	date,
	vote_average,
	overview,
}: {
	id: number;
	name?: string;
	type: MediaType;
	date?: string;
	vote_average: number;
	overview?: string;
}) => {
	const title = defaultTitle(name);

	return (
		<div className="relative bottom-[3lh] mx-auto block h-fit w-[92dvw] md:bottom-0 md:h-[65dvh] lg:h-[80dvh]">
			<div className="flex h-full w-full flex-col justify-center-safe gap-4 text-accent-80 md:w-[70%] lg:w-1/2">
				<div className="text-vb-xl leading-none font-semibold text-pretty">{title}</div>
				<ul className="list-with-dot">
					{type === "tv" ? <li>TV Series</li> : null}
					<li className="inline-flex items-center gap-1">
						<StarIcon stroke="none" className="h-auto max-w-4 fill-sunflower" aria-hidden />
						<span>{Math.floor(vote_average * 10)}%</span>
					</li>
					{date ? <li>{getYear(date)}</li> : null}
				</ul>
				<div className="line-clamp-3 md:line-clamp-4">{overview}</div>
				<Button asChild variant="theme" size="lg">
					<Link href={`/${mediaType(type).id}/${id}` as Route}>
						<span>More details</span>
						<ArrowRightIcon aria-hidden />
					</Link>
				</Button>
			</div>
		</div>
	);
};

export const HeroSkeleton = ({ type = "full" }: { type?: "full" | "minimal" | "banner" }) => {
	return (
		<div className="@container/skeleton w-full bg-accent-30">
			<div
				className={cn("relative mx-auto max-w-[92dvw]", [
					{
						"grid grid-cols-1 gap-12 pt-[calc(var(--header-height)+2rem)] pb-8 @3xl/skeleton:grid-cols-[auto_minmax(0,1fr)]":
							type === "full",
						"bottom-[3lh] flex h-fit w-full flex-col justify-center-safe gap-4 md:bottom-0 md:h-[65dvh] lg:h-[80dvh]":
							type === "minimal",
						"flex gap-4 py-8": type === "banner",
					},
				])}
			>
				{type === "full" && (
					<>
						<div className="h-[clamp(150px,35cqh+2rem,400px)] w-[35cqw] animate-pulse rounded-xl bg-accent-40 @3xl/hero:w-[25cqw]" />
						<div className="flex flex-col gap-10 *:w-full *:animate-pulse *:rounded-lg *:bg-accent-40">
							<div className="h-20" />
							<div className="h-16" />
							<div className="h-16" />
						</div>
					</>
				)}
				{type === "minimal" && (
					<div className="flex w-full flex-col gap-8 *:w-full *:animate-pulse *:rounded-lg *:bg-accent-40 md:w-[70%] lg:w-1/2">
						<div className="h-16" />
						<div className="h-20" />
						<div className="h-20" />
					</div>
				)}
				{type === "banner" && (
					<>
						<div className="hidden h-[max(100px,8vh+2rem)] w-[10%] shrink-0 animate-pulse rounded-lg bg-accent-40 md:block" />
						<div className="h-24 w-[30%] animate-pulse rounded-lg bg-accent-40" />
					</>
				)}
			</div>
		</div>
	);
};
