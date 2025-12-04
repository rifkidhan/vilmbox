import { Suspense } from "react";
import Button from "../button";
import Year from "./year";

export default function Footer() {
	return (
		<footer className="w-full bg-accent-20">
			<div className="relative mx-auto flex max-w-[92dvw]">
				<div className="footer-top"></div>
				<div className="flex flex-row gap-4">
					<Suspense fallback={null}>
						<Year />
					</Suspense>
					<div>
						<span>Database from </span>
						<Button asChild variant="text">
							<a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
								<span>TMDB</span>
							</a>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
}
