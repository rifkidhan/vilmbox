import cn from "clsx";
import Image from "../image";
import s from "./banner.module.css";

type BannerProps = {
	poster_path?: string;
	backdrop_path?: string;
	content_title?: string;
} & React.ComponentProps<"div">;

export function Banner({
	backdrop_path,
	className,
	...props
}: Omit<BannerProps, "poster_path" | "content_title">) {
	return (
		<div className={cn(s.banner, className)} {...props}>
			<div className={s.backdrop}>
				{backdrop_path ? (
					<Image
						src={backdrop_path}
						alt=""
						type="backdrop"
						priority
						full
						aria-hidden="true"
					/>
				) : null}
			</div>
			<div className={s.wrapper}>
				<div className={s.content}>{props.children}</div>
			</div>
		</div>
	);
}

export const BannerPoster = ({
	poster_path,
	content_title,
}: Pick<BannerProps, "content_title" | "poster_path">) => {
	return poster_path ? (
		<div className={s.thumbnail}>
			<Image src={poster_path} alt={`${content_title}-poster`} />
		</div>
	) : null;
};

export const BannerHead = ({ children }: Pick<BannerProps, "children">) => {
	return <hgroup>{children}</hgroup>;
};

export const BannerSkeleton = () => {
	return (
		<div className={s.skeleton}>
			<div className={s.wrapper}>
				<div className={s.thumbnail} />
				<div className={s.title}>
					<div />
					<div />
				</div>
			</div>
		</div>
	);
};
