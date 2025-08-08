import { Slot } from "@radix-ui/react-slot";
import cn from "clsx";
import s from "./button.module.css";

type ButtonProps = {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "theme" | "text";
	size?: "sm" | "md" | "lg" | "square";
	asChild?: boolean;
} & React.ComponentProps<"button">;

export default function Button({
	variant = "primary",
	size = "md",
	className,
	asChild,
	...props
}: ButtonProps) {
	const Component = asChild ? Slot : "button";
	const buttonStyle = cn(
		s.button,
		[s[`${variant}`]],
		[s[`${size}`]],
		className,
	);

	return <Component className={buttonStyle} {...props} />;
}
