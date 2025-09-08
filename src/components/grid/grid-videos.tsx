import type { Video } from "$/lib/tmdb/types";
import { VideoThumbnail } from "../video";

export default function GridVideos({ videos }: { videos: Video[] }) {
	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{videos.map((item) => (
				<VideoThumbnail key={item.key} video={item} />
			))}
		</ul>
	);
}
