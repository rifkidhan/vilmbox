import cn from "clsx";
import Link from "next/link";
import Icon from "./icon";
import Image from "./image";

interface CardProps {
	title?: string;
	img?: string;
	img_type?: "poster" | "still";
	rating?: number;
	url?: string;
	rank?: number;
	shadow?: boolean;
}
export const Card = ({
	title = "untitled",
	shadow,
	url,
	className,
	...props
}: Pick<CardProps, "title" | "url" | "shadow"> &
	React.ComponentProps<"div">) => {
	return (
		<div className={cn("pf-card", className)} title={url && title} {...props}>
			<div className={cn("card", { shadow: shadow })}>
				{url ? <Link href={url} aria-label={title} draggable /> : null}
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
		<div className="thumbnail" data-rank={rank}>
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
		<div className={cn("content", className)}>
			{slotted ? (
				children
			) : (
				<>
					{rating ? (
						<div className="rating">
							<Icon name="star" isHidden stroke="none" />
							<span>{Math.floor(rating * 10)}%</span>
						</div>
					) : null}
					<h3 className="title">{title}</h3>
					{children}
				</>
			)}
		</div>
	);
};
