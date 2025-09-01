"use client";

import { YouTubeEmbed } from "@next/third-parties/google";
import { useState } from "react";
import type { Video } from "$/lib/tmdb/types";
import Button from "./button";
import Icon from "./icon";
import Modal from "./modal";

export const VideoButton = ({ video }: { video: Video }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button type="button" variant="theme" onClick={() => setOpen(true)}>
				<Icon name="play" isHidden />
				<span>Play {video.type}</span>
			</Button>
			<Modal title={video.name} open={open} onClose={() => setOpen(false)}>
				<YouTubeEmbed
					videoid={video.key}
					style="width: calc(60dvw + 2rem);"
					playlabel={video.name}
				/>
			</Modal>
		</>
	);
};

export const VideoThumbnail = ({ video }: { video: Video }) => {
	const [open, setOpen] = useState(false);
	const image_url = `https://i.ytimg.com/vi_webp/${video.key}/sddefault.webp`;
	return (
		<>
			<li
				className="video"
				title={video.name}
				style={{
					backgroundImage: `url(${image_url})`,
					backgroundSize: "cover",
					backgroundPosition: "center center",
				}}
			>
				<button type="button" onClick={() => setOpen(true)}>
					<span className="sr-only">Play {video.name}</span>
				</button>
			</li>
			<Modal title={video.name} open={open} onClose={() => setOpen(false)}>
				<YouTubeEmbed
					videoid={video.key}
					style="width: calc(60dvw + 2rem);"
					playlabel={video.name}
				/>
			</Modal>
		</>
	);
};
