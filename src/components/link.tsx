"use client";

import type { Route } from "next";
import { default as NextLink, type LinkProps as NextLinkProps } from "next/link";
import { useState } from "react";

type LinkProps<T extends string> = Omit<NextLinkProps<T>, "prefetch">;

export default function Link(props: LinkProps<Route>) {
	const [active, setActive] = useState(false);

	return (
		<NextLink prefetch={active ? null : false} onMouseEnter={() => setActive(true)} {...props} />
	);
}
