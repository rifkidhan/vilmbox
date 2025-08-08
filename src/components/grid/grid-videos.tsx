import type { Video } from "$/lib/tmdb/types";
import { VideoThumbnail } from "../video";

export default function GridVideos({ videos }: { videos?: Video[] }) {
	return videos && videos.length > 0 ? (
		<ul className="videos">
			{videos.map((item) => (
				<VideoThumbnail key={item.key} video={item} />
			))}
		</ul>
	) : null;
}
