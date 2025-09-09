import type { Route } from "next";
import cn from "clsx";
import Icon from "./icon";
import Image from "./image";
import Link from "./link";

interface CardProps {
	title?: string;
	img?: string;
	img_type?: "poster" | "still";
	rating?: number;
	url?: string;
	rank?: number;
	shadow?: boolean;
	usePrefetch?: boolean;
}

export const Card = ({
	title = "untitled",
	shadow,
	url,
	usePrefetch,
	className,
	...props
}: Pick<CardProps, "title" | "url" | "shadow" | "usePrefetch"> & React.ComponentProps<"div">) => {
	return (
		<div className={cn("@container/card block w-full", className)} title={url && title} {...props}>
			<div
				className={cn(
					"group/card relative flex size-full flex-col items-center gap-2 overflow-hidden rounded-lg bg-accent-5 select-none @min-[200px]/card:flex-row @min-[200px]/card:p-2 @md/card:gap-4 @md/card:p-4",
					{
						"shadow-lg shadow-black/30 transition-shadow has-[a]:hover:shadow-xl": shadow,
					},
				)}
			>
				{url ? (
					<Link
						href={url as Route}
						usePrefetch={usePrefetch}
						aria-label={title}
						draggable
						className="absolute top-0 left-0 z-[1] size-full"
					/>
				) : null}
				{props.children}
			</div>
		</div>
	);
};

export const CardThumbnail = ({
	title = "untitled",
	img,
	img_type = "poster",
	rank,
	children,
}: Pick<CardProps, "title" | "img" | "img_type" | "rank"> & {
	children?: React.ReactNode;
}) => {
	return (
		<div
			className="relative h-auto w-[100cqw] shrink-0 overflow-hidden rounded-lg empty:hidden @min-[200px]/card:w-[30cqw] @md/card:w-[23cqw] @4xl/card:w-[18cqw] [&>img]:transition-transform [&>img]:ease-in-out group-has-[a]/card:group-hover/card:[&>img]:scale-105"
			data-rank={rank}
		>
			{children ? children : <Image src={img} alt={title} type={img_type} />}
		</div>
	);
};

export const CardContent = ({
	rating,
	title = "untitled",
	slotted,
	children,
	className,
}: Pick<CardProps, "title" | "rating"> & {
	children?: React.ReactNode;
	slotted?: boolean;
	className?: string;
}) => {
	return (
		<div className={cn("flex w-full flex-col gap-2 @max-[200px]/card:p-2", className)}>
			{slotted ? (
				children
			) : (
				<>
					{rating ? (
						<div className="flex flex-row items-center gap-1">
							<Icon
								name="star"
								isHidden
								stroke="none"
								className="h-auto max-w-[1rem] fill-sunflower"
							/>
							<span>{Math.floor(rating * 10)}%</span>
						</div>
					) : null}
					<h3 className="line-clamp-2 text-vb-normal font-medium wrap-break-word text-ellipsis group-has-[a]/card:hover:underline @sm/card:text-vb-lg">
						{title}
					</h3>
					{children}
				</>
			)}
		</div>
	);
};

export const CardSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-accent-30 *:animate-pulse *:overflow-hidden *:rounded-md *:bg-accent-40">
			<span className="h-[clamp(150px,25cqh+2rem,280px)] w-full" />
			<span className="mx-2 mt-2 h-[2ch] w-[6ch]" />
			<span className="mx-2 mt-2 h-[4ch] w-[10ch]" />
		</div>
	);
};
