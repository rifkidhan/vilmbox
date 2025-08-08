import cn from "clsx";
import type { Genre, Video } from "$/lib/tmdb/types";
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
}

const defaultTitle = (title?: string) =>
	title && title !== "" ? title : "untitled";

export const Hero = ({
	backdrop_path,
	className,
	...props
}: Pick<HeroProps, "backdrop_path"> & React.ComponentProps<"div">) => {
	return (
		<div className={cn(s.hero, className)} {...props}>
			<div className={s.backdrop}>
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
			<div className={s.wrapper}>
				<div className={s.details}>{props.children}</div>
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

export const HeroSkeleton = () => {
	return <div className={s.skeleton}></div>;
};
