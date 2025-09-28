import { Slot } from "@radix-ui/react-slot";
import cn from "clsx";

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
	const variantClass = {
		text: "is-text highlight w-fit rounded-none font-medium text-primary hover:text-accent-95",
		primary: "bg-accent-90 text-accent-10 hover:bg-accent-70",
		secondary: "bg-accent-10 text-accent-90 hover:bg-accent-30",
		outline: "bg-accent-10 text-accent-90 hover:bg-accent-20",
		ghost: "hover:bg-accent-30",
		theme:
			"bg-primary-dark text-accent-10 hover:bg-[color-mix(in_oklab,var(--color-primary-dark),var(--color-accent-90)_30%)]",
	}[variant];
	const sizeClass = {
		sm: "not-[&.is-text]:px-3 not-[&.is-text]:py-1",
		md: "not-[&.is-text]:px-4 not-[&.is-text]:py-2",
		lg: "not-[&.is-text]:px-6 not-[&.is-text]:py-3",
		square: "not-[&.is-text]:size-9 not-[&.is-text]:md:size-9",
	}[size];
	const style = cn(
		"relative inline-flex cursor-pointer flex-wrap items-center justify-center gap-2 truncate rounded-md font-semibold whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:shrink-0",
		[variantClass],
		[sizeClass],
		className,
	);

	return <Component className={style} {...props} />;
}
