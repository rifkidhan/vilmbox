import cn from "clsx";
import s from "./grid.module.css";

export function Grid({
	type = "normal",
	className,
	...props
}: { type?: "normal" | "masonry" } & React.ComponentProps<"ul">) {
	const rootCN = cn([s[`${type}`]], className);

	return (
		<ul className={rootCN} {...props}>
			{props.children}
		</ul>
	);
}

export const GridItem = ({
	orientation,
	className,
	...props
}: {
	orientation?: "portrait" | "horizontal";
} & React.ComponentProps<"li">) => {
	const rootCN = cn(
		s.item,
		{
			[s.portrait]: orientation === "portrait",
			[s.horizontal]: orientation === "horizontal",
		},
		className,
	);

	return <li className={rootCN}>{props.children}</li>;
};
