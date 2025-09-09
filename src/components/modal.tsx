"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	type DialogProps,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";
import Button from "./button";
import Icon from "./icon";

export const ModalRoot = (props: DialogProps) => {
	return <Dialog {...props}>{props.children}</Dialog>;
};

export const ModalTrigger = ({ children }: { children: React.ReactNode }) => {
	return <DialogTrigger asChild>{children}</DialogTrigger>;
};

export const ModalContent = ({
	title,
	children,
}: {
	title?: string;
	children?: React.ReactNode;
}) => {
	return (
		<DialogPortal>
			<DialogOverlay className="fixed inset-0 z-99 flex h-dvh w-dvw items-center-safe justify-center-safe bg-black/50 backdrop-blur-lg">
				<DialogContent
					className="m-auto block size-fit max-h-[90dvh] max-w-[90dvw]"
					aria-describedby={undefined}
				>
					<div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-accent-10 p-4">
						<div className="flex flex-row items-center justify-between gap-2 md:gap-4">
							<DialogTitle className="line-clamp-2 max-w-[22ch] font-semibold md:max-w-[32ch] lg:max-w-[50ch]">
								{title}
							</DialogTitle>
							<DialogClose asChild>
								<Button type="button" variant="ghost" size="square" className="shrink-0">
									<Icon name="close" isHidden />
								</Button>
							</DialogClose>
						</div>
						{children}
					</div>
				</DialogContent>
			</DialogOverlay>
		</DialogPortal>
	);
};
