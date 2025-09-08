"use client";

import Button from "$/components/button";

// biome-ignore lint/suspicious/noShadowRestrictedNames: nextjs error
export default function Error({ reset }: { reset: () => void }) {
	return (
		<div className="mx-auto flex max-w-[92dvw] flex-col gap-4">
			<h2 className="text-vb-xl">Oh my goodness!</h2>
			<p>There was an issue with vilmbox. This could be a temporary issue.</p>
			<Button type="button" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
