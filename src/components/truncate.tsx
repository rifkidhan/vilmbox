"use client";

import cn from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./icon";

export default function Truncate({
	length,
	className,
	...props
}: { length?: number } & React.ComponentProps<"div">) {
	const [open, setOpen] = useState(false);
	const [truncate, setTruncate] = useState(true);

	const ref = useRef<HTMLDivElement | null>(null);

	const onResize = useCallback(() => {
		if (!ref.current) return;
		setTruncate(ref.current.scrollHeight > ref.current.clientHeight);
	}, []);

	useEffect(() => {
		onResize();
	}, [onResize]);

	return (
		<div
			className={cn("truncate", className)}
			data-truncated={truncate}
			{...props}
			style={{ "--pf-truncate": length } as React.CSSProperties}
		>
			<div ref={ref} data-expanded={truncate && open}>
				{props.children}
			</div>
			{truncate ? (
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					aria-pressed={open}
				>
					<span>{open ? "View less" : "View more"}</span>
					<Icon name="chevron-down" isHidden />
				</button>
			) : null}
		</div>
	);
}
