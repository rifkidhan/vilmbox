"use client";

import type { Video } from "$/lib/tmdb/types";
import { YouTubeEmbed } from "@next/third-parties/google";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import Button from "./button";
import { ModalContent, ModalRoot, ModalTrigger } from "./modal";

export const VideoButton = ({ video }: { video: Video }) => {
	const [open, setOpen] = useState(false);

	return (
		<ModalRoot open={open} onOpenChange={setOpen}>
			<ModalTrigger>
				<Button type="button" variant="theme">
					<PlayIcon aria-hidden />
					<span>Play {video.type}</span>
				</Button>
			</ModalTrigger>
			<ModalContent title={video.name}>
				<YouTubeEmbed
					videoid={video.key}
					style="width: calc(60dvw + 2rem);"
					playlabel={video.name}
				/>
			</ModalContent>
		</ModalRoot>
	);
};

export const VideoThumbnail = ({ video }: { video: Video }) => {
	const [open, setOpen] = useState(false);

	const image_url = `https://i.ytimg.com/vi_webp/${video.key}/sddefault.webp`;

	return (
		<ModalRoot open={open} onOpenChange={setOpen}>
			<li
				className="relative block h-auto w-full overflow-hidden rounded-lg before:absolute before:top-0 before:block before:h-20 before:w-full before:overflow-hidden before:bg-linear-to-b before:from-black before:to-100% before:px-[clamp(0.5rem,0.12rem+12vw,1.5rem)] before:py-[clamp(0.25rem,0.12rem+12vi,1.5rem)] before:text-vb-normal before:text-ellipsis before:whitespace-nowrap before:text-white/95 before:content-[attr(title)] after:block after:pb-[calc(100%/(16/9))] after:content-['']"
				title={video.name}
				style={{
					backgroundImage: `url(${image_url})`,
					backgroundSize: "cover",
					backgroundPosition: "center center",
					contain: "content",
				}}
			>
				<ModalTrigger>
					<button
						type="button"
						className="absolute z-1 block size-full cursor-pointer grayscale-100 transition hover:grayscale-0"
						style={{
							backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>')`,
							backgroundPosition: "center",
							backgroundSize: "68px 48px",
							backgroundRepeat: "no-repeat",
						}}
					>
						<span className="sr-only">Play {video.name}</span>
					</button>
				</ModalTrigger>
			</li>
			<ModalContent title={video.name}>
				<YouTubeEmbed
					videoid={video.key}
					style="width: calc(60dvw + 2rem);"
					playlabel={video.name}
				/>
			</ModalContent>
		</ModalRoot>
	);
};
