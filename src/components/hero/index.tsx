import cn from "clsx";
import Link from "next/link";
import type { Genre, MediaType, Video } from "$/lib/tmdb/types";
import { getYear } from "$/utils/format";
import Button from "../button";
import Icon from "../icon";
import Image from "../image";
import Truncate from "../truncate";
import { VideoButton } from "../video";
import s from "./hero.module.css";

interface HeroProps {
	title?: string;
	overview?: string;
	backdrop_path?: string;
	poster_path?: string;
	tagline?: string;
	vote_average: number;
	vote_count: number;
	genres: Genre[];
	videos: Video[];
	minimal?: boolean;
}

const defaultTitle = (title?: string) =>
	title && title !== "" ? title : "untitled";

export const Hero = ({
	backdrop_path,
	minimal,
	className,
	...props
}: Pick<HeroProps, "backdrop_path" | "minimal"> &
	React.ComponentProps<"div">) => {
	return (
		<div className={cn(s.hero, { [s.minimal]: minimal }, className)} {...props}>
			<div className={cn(s.backdrop, { [s.minimal]: minimal })}>
				{backdrop_path ? (
					<Image
						src={backdrop_path}
						type="backdrop"
						full
						priority
						alt=""
						aria-hidden="true"
					/>
				) : null}
			</div>
			<div className={cn(s.wrapper, { [s.minimal]: minimal })}>
				{minimal ? (
					props.children
				) : (
					<div className={s.details}>{props.children}</div>
				)}
			</div>
		</div>
	);
};

export const HeroPoster = ({
	poster_path,
	title,
}: Pick<HeroProps, "title" | "poster_path">) => {
	return (
		<div className={s.poster}>
			<Image src={poster_path} alt={defaultTitle(title)} priority />
		</div>
	);
};

export const HeroTitle = ({
	tagline,
	children,
}: {
	tagline?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={s.title}>
			{children}
			{tagline ? <div className={s.tagline}>{tagline}</div> : null}
		</div>
	);
};

export const HeroMisc = ({ children }: { children?: React.ReactNode }) => {
	return <div className={cn(s.misc, "list-with-dot")}>{children}</div>;
};

export const HeroAction = (
	props: Pick<HeroProps, "vote_average" | "vote_count" | "videos">,
) => {
	const getVideoPreview = () => {
		if (props.videos.length < 1) return undefined;

		let preview = props.videos.find((v) => v.type === "Trailer");

		if (!preview) {
			preview = props.videos[0];
		}

		return preview;
	};

	const video = getVideoPreview();
	return (
		<div className={s.action}>
			<div className={s.vote}>
				<div className={s.icon}>
					<Icon name="star" stroke="none" isHidden />
				</div>
				<div className={s.score}>
					<span>{Math.floor(props.vote_average * 10)}%</span>
					<span className={s.count}>{props.vote_count}</span>
				</div>
			</div>
			{video ? <VideoButton video={video} /> : null}
		</div>
	);
};

export const HeroGenres = ({ genres }: { genres: Genre[] }) => {
	return (
		<div className={cn(s.genres, "list-with-dot")}>
			{genres.map((item) => (
				<span key={item.id}>{item.name}</span>
			))}
		</div>
	);
};

export const HeroOverview = ({
	overview: overviewProps,
}: Pick<HeroProps, "overview">) => {
	const overview =
		overviewProps && overviewProps !== ""
			? overviewProps
			: "No Overview provided";

	return (
		<div className={s.overview}>
			<Truncate>{overview}</Truncate>
		</div>
	);
};

export const HeroCredits = ({ children }: { children?: React.ReactNode }) => {
	return <div className={s.credits}>{children}</div>;
};

interface HeroMinimalProps {
	id: number;
	title?: string;
	type: MediaType;
	date?: string;
	vote_average: number;
	overview?: string;
}

export const HeroMinimal = ({
	id,
	title,
	type,
	date,
	vote_average,
	overview,
}: HeroMinimalProps) => {
	return (
		<div className={s.heroMinimal}>
			<p className={s.title}>{title}</p>
			<ul className={cn("list-with-dot")}>
				{type === "tv" ? <li>TV Series</li> : null}
				<li className={s.rating}>
					<Icon name="star" stroke="none" isHidden />
					<span>{Math.floor(vote_average * 10)}%</span>
				</li>
				{date ? <li>{getYear(date)}</li> : null}
			</ul>
			<div className={s.overview}>{overview}</div>
			<Button asChild>
				<Link href={`/${type === "tv" ? "tv-show" : "movie"}/${id}`}>
					<span>Go to {title}</span>
					<Icon name="arrow-right" isHidden />
				</Link>
			</Button>
		</div>
	);
};

export const HeroSkeleton = () => {
	return <div className={s.skeleton}></div>;
};
