"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import Button from "../button";
import Icon from "../icon";

export default function ThemeTogle() {
	const { setTheme, resolvedTheme } = useTheme();

	const themeToggle = useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [setTheme, resolvedTheme]);

	return (
		<Button type="button" size="square" title="Toggle Theme" variant="ghost" onClick={themeToggle}>
			<Icon name="theme" isHidden />
		</Button>
	);
}
