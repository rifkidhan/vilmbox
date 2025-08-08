import { IMAGE_URL } from "$/lib/constants";
import type { CombineImage } from "$/lib/tmdb/types";
import Image from "../image";
import { Grid, GridItem } from "./grid";

export default function GridImages({
	images,
	title,
}: {
	images?: CombineImage[];
	title?: string;
}) {
	return images && images.length > 0 ? (
		<Grid type="masonry">
			{images.map((item, i) => (
				<GridItem
					key={i}
					orientation={item.backdrop ? "horizontal" : "portrait"}
				>
					<a
						href={`${IMAGE_URL}original${item.file_path}`}
						target="_blank"
						rel="noreferrer noopener"
					>
						<span className="sr-only">view full image</span>
					</a>
					<Image
						src={item.file_path}
						alt={`${title}-${i}`}
						type={item.backdrop ? "backdrop" : "poster"}
						full
					/>
				</GridItem>
			))}
		</Grid>
	) : null;
}
