import cn from "clsx";
import Image from "next/image";
import asset from "./assets/chris-murray-iwfHhOZLVMU-unsplash.jpg";

export default function Section({
	name,
	subtitle,
	className,
	...props
}: { name: string; subtitle?: string } & React.ComponentProps<"section">) {
	return (
		<section className={cn("mx-auto flex w-[92dvw] flex-col gap-10", className)} {...props}>
			<div className="flex flex-col gap-2">
				<h2 className="relative w-fit text-vb-lg leading-none font-bold tracking-wide">
					<span
						className="absolute inset-0 z-[-1] h-full w-[2.5ch] bg-primary-light"
						aria-hidden="true"
					/>
					<span className="ml-[0.5ch]">{name}</span>
				</h2>
				{subtitle ? <div className="text-accent-70">{subtitle}</div> : null}
			</div>
			{props.children}
		</section>
	);
}

export const MinimalHeader = ({
	title,
	children,
}: {
	title: string;
	children?: React.ReactNode;
}) => {
	return (
		<div className="relative block h-max w-full">
			<div className="absolute top-0 left-0 block size-full overflow-hidden">
				<Image
					src={asset}
					alt=""
					aria-hidden
					fill
					priority
					sizes="(max-width: 465px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
					className="object-cover object-center"
				/>
			</div>
			<div className="mx-auto min-h-30 w-full py-8 text-white backdrop-blur-3xl">
				<div className="mx-auto max-w-[92dvw]">
					<h1 className="text-vb-xl leading-none font-bold">{title}</h1>
					{children ? children : null}
				</div>
			</div>
		</div>
	);
};
