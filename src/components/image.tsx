"use client";

import cn from "clsx";
import { type ImageLoaderProps, default as NextImage } from "next/image";
import { useState } from "react";
import { IMAGE_URL } from "$/lib/constants";
import Icon from "./icon";

type ImageProps = {
	type?: "poster" | "backdrop" | "still";
	full?: boolean;
	src?: string;
} & Omit<React.ComponentProps<typeof NextImage>, "src" | "width" | "height" | "sizes">;

const imageLoader = ({ src, width }: ImageLoaderProps) => {
	return `${IMAGE_URL}w${width}${src}`;
};

const image_sizes = {
	poster: [185, 342, 500],
	backdrop: [300, 780, 1280],
	still: [92, 185, 300],
};

export default function Image({
	src,
	full,
	type = "poster",
	fill,
	className,
	...props
}: ImageProps) {
	const [error, setError] = useState(false);
	const width = image_sizes[type][0];
	const height = type === "poster" ? Math.round(width * 1.5) : Math.round(width / 1.78);

	const imageClass = cn(
		"h-auto w-full bg-accent-50 object-cover object-center [&.backdrop,&.still]:not-[&.full]:aspect-video [&.full]:h-full [&.poster]:not-[&.full]:aspect-[2/3]",
		[`${type}`],
		{ full: !fill && full },
		className,
	);

	const fallbackClass = cn(
		"flex h-auto w-full items-center justify-center bg-accent-50 [&.backdrop,&.still]:not-[&.full]:aspect-video [&.full]:h-full [&.poster]:not-[&.full]:aspect-[2/3]",
		[`${type}`],
		{ full: full },
		className,
	);

	const sizes = full
		? "(max-width: 465px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
		: "(max-width: 465px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 25vw";

	return src && !error ? (
		<NextImage
			loader={imageLoader}
			src={src}
			width={fill ? undefined : width}
			height={fill ? undefined : height}
			className={imageClass}
			onError={() => setError(true)}
			fill={fill}
			sizes={sizes}
			{...props}
		/>
	) : (
		<div className={fallbackClass}>
			<Icon name="image" isHidden />
			<span className="sr-only">image fallback</span>
		</div>
	);
}
