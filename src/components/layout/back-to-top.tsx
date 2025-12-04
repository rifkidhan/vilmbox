"use client";

import { ChevronUpIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Button from "../button";

export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	const onClick = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

	useEffect(() => {
		const visibleButton = () => {
			const scroll = window.scrollY;
			setVisible(scroll > 1000);
		};

		window.addEventListener("scroll", visibleButton);

		return () => {
			window.removeEventListener("scroll", visibleButton);
		};
	}, []);

	return visible ? (
		<div className="fixed right-[3dvw] bottom-[3dvh] z-6">
			<Button type="button" size="square" title="Back to top" onClick={onClick}>
				<ChevronUpIcon aria-hidden />
			</Button>
		</div>
	) : null;
}
