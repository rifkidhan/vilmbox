import Link from "next/link";
import Button from "$/components/button";

export default function NotFound() {
	return (
		<div className="mx-auto flex max-w-[92dvw] flex-col gap-8">
			<h2 className="inline-flex flex-col items-center-safe justify-center-safe text-vb-display leading-none">
				<span className="text-[2em] font-extrabold text-primary-dark">404</span>
				<span>not found</span>
			</h2>
			<Button asChild>
				<Link href="/">
					<span>Return home</span>
				</Link>
			</Button>
		</div>
	);
}
