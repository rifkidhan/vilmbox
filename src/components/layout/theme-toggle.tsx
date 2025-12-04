"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import Button from "../button";

export default function ThemeTogle() {
	const { setTheme, resolvedTheme } = useTheme();

	const themeToggle = useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [setTheme, resolvedTheme]);

	return (
		<Button type="button" size="square" title="Toggle Theme" variant="ghost" onClick={themeToggle}>
			<Icon />
		</Button>
	);
}

const Icon = () => {
	const { resolvedTheme } = useTheme();
	const [mount, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	const ThemeIcon = resolvedTheme === "dark" ? MoonIcon : SunIcon;

	return mount ? <ThemeIcon /> : <MonitorIcon />;
};
