"use client";

import cn from "clsx";
import { type ImageLoaderProps, default as NextImage } from "next/image";
import { useState } from "react";
import { IMAGE_URL } from "$/lib/constants";
import Icon from "../icon";
import s from "./image.module.css";

type ImageProps = {
	type?: "poster" | "backdrop" | "still";
	full?: boolean;
	src?: string;
} & Omit<
	React.ComponentProps<typeof NextImage>,
	"src" | "width" | "height" | "sizes"
>;

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
	const height = type === "poster" ? width * 1.5 : width / 1.78;

	const imageClass = cn(
		s.img,
		[s[`${type}`]],
		{ [s.full]: !fill && full },
		className,
	);

	const fallbackClass = cn(
		s.fallback,
		[s[`${type}`]],
		{ [s.full]: full },
		className,
	);

	return src && !error ? (
		<NextImage
			loader={imageLoader}
			src={src}
			width={width}
			height={height}
			className={imageClass}
			onError={() => setError(true)}
			sizes={
				fill
					? "(min-width: 768px) 66vw, 100vw"
					: "(min-width: 768px) 33vw, 100vw"
			}
			{...props}
		/>
	) : (
		<div className={fallbackClass}>
			<Icon name="image" isHidden />
			<span className="sr-only">image fallback</span>
		</div>
	);
}
