import type { CombineImage } from "$/lib/tmdb/types";
import cn from "clsx";
import { IMAGE_URL } from "$/lib/constants";
import Image from "../image";

export default function GridImages({ images }: { images: CombineImage[] }) {
	return (
		<ul className="grid grid-flow-row-dense auto-rows-max grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
			{images.map((item, i) => (
				<li
					key={i}
					className={cn("relative block w-full overflow-hidden rounded-lg", [
						{ "row-end-[span_2]": !item.backdrop },
						{ "row-end-[span_1]": item.backdrop },
					])}
				>
					<a
						href={`${IMAGE_URL}original${item.file_path}`}
						target="_blank"
						rel="noreferrer noopener"
						className="absolute top-0 left-0 z-[1] size-full"
					>
						<span className="sr-only">view full image</span>
					</a>
					<Image src={item.file_path} alt="" type={item.backdrop ? "backdrop" : "poster"} full />
				</li>
			))}
		</ul>
	);
}
