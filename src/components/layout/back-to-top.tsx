"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "../button";
import Icon from "../icon";

export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	const onClick = useCallback(
		() => window.scrollTo({ top: 0, behavior: "smooth" }),
		[],
	);

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
		<div className="back-to-top-button">
			<Button type="button" size="square" title="Back to top" onClick={onClick}>
				<Icon name="chevron-top" isHidden />
			</Button>
		</div>
	) : null;
}
