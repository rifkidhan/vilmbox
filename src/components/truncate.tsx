"use client";

import cn from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "$/utils/throttle";
import Icon from "./icon";

export default function Truncate({
	length = 3,
	className,
	...props
}: { length?: number } & React.ComponentProps<"div">) {
	const [open, setOpen] = useState(false);
	const [truncate, setTruncate] = useState(true);

	const ref = useRef<HTMLDivElement | null>(null);

	const onExpand = useCallback(() => {
		setOpen((v) => !v);
	}, []);

	const onResize = useCallback(() => {
		if (open) {
			setOpen(false);
		} else {
			throttle(() => {
				if (!ref.current || !ref.current.parentElement) return;
				setTruncate(ref.current.scrollHeight > ref.current.parentElement.clientHeight);
			}, 500)();
		}
	}, [open]);

	useEffect(() => {
		if (!ref.current || !ref.current.parentElement) return;
		setTruncate(ref.current.scrollHeight > ref.current.parentElement.clientHeight);
	}, []);

	useEffect(() => {
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [onResize]);

	return (
		<div
			className={cn(
				"relative block max-w-full [--line-height:calc(1lh*var(--vb-truncate,3)-2lh)]",
				className,
			)}
			style={{ "--vb-truncate": length } as React.CSSProperties}
			{...props}
		>
			<div
				className={cn(
					"max-h-[calc(1lh*var(--vb-truncate,3))] w-full overflow-clip wrap-break-word",
					{
						"mask-[linear-gradient(0deg,transparent_0,transparent_var(--line-height),black_var(--line-height)),linear-gradient(279deg,transparent_0,transparent_10ch,black)] transition-[max-height]":
							truncate,
					},
					{ "max-h-fit mask-none pb-[1lh]": truncate && open },
				)}
			>
				<div className="size-full" ref={ref}>
					{props.children}
				</div>
			</div>
			{truncate ? (
				<button
					type="button"
					className={cn(
						"absolute right-0 bottom-0 inline-flex cursor-pointer items-end-safe justify-end-safe text-primary [&>svg]:transition-transform",
						{ "[&>svg]:rotate-180": open },
					)}
					onClick={onExpand}
					aria-expanded={open}
				>
					<span>{open ? "View less" : "View more"}</span>
					<Icon name="chevron-down" isHidden />
				</button>
			) : null}
		</div>
	);
}
