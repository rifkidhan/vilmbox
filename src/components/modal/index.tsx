"use client";

import cn from "clsx";
import { useCallback, useEffect, useRef } from "react";
import Button from "../button";
import Icon from "../icon";
import s from "./modal.module.css";

type ModalProps = {
	title?: string;
	open: boolean;
} & React.ComponentProps<"dialog">;

export default function Modal({ title, open, className, ...props }: ModalProps) {
	const ref = useRef<HTMLDialogElement | null>(null);

	const onCloseCallback = useCallback(() => {
		if (!ref.current && !open) return;
		ref.current?.close();
	}, [open]);

	useEffect(() => {
		if (open) {
			ref.current?.showModal();
		}
	}, [open]);

	// useEffect(() => {
	// 	window.addEventListener(
	// 		"click",
	// 		(e) => {
	// 			e.preventDefault();
	// 			if (!ref.current?.contains(e.target as Node)) {
	// 				onCloseCallback();
	// 			}
	// 		},
	// 		{ capture: true },
	// 	);

	// 	return () => {
	// 		window.removeEventListener("click", (e) => {
	// 			if (!ref.current?.contains(e.target as Node)) {
	// 				onCloseCallback();
	// 			}
	// 		});
	// 	};
	// }, [onCloseCallback]);

	return (
		<dialog ref={ref} className={cn(s.modal, className)} {...props}>
			<div className={s.wrapper}>
				<div className={s.top}>
					<div className={s.title}>{title}</div>
					<Button type="button" variant="ghost" size="square" onClick={onCloseCallback}>
						<Icon name="close" isHidden />
						<span className="sr-only">Close {title ? title : ""} modal</span>
					</Button>
				</div>
				{props.children}
			</div>
		</dialog>
	);
}
