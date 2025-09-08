"use client";

import cn from "clsx";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Button from "./button";
import Icon from "./icon";

type CarouselApi = UseEmblaCarouselType[1];

type CarouselProps = {
	full?: boolean;
};

type CarousePropsContenxt = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	progress: number;
	scrollable: boolean;
	slideInView: number;
} & CarouselProps;

const CarouselContext = createContext<CarousePropsContenxt | null>(null);

const useCarousel = () => {
	const context = useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be within a <Carousel />");
	}

	return context;
};

export const Carousel = ({
	className,
	full,
	...props
}: React.ComponentProps<"section"> & CarouselProps) => {
	const [carouselRef, api] = useEmblaCarousel({
		align: "center",
		loop: full,
		slidesToScroll: "auto",
	});

	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [progress, setProgress] = useState(0);
	const [slideInView, setSlideInView] = useState(0);
	const [scrollable, setScrollable] = useState(true);

	const onResize = useCallback(
		(api: CarouselApi) => {
			if (!api) return;
			setScrollable(api.internalEngine().scrollSnaps.length > 1);
			api.reInit({ active: scrollable });
		},
		[scrollable],
	);

	const onSelect = useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
		setSlideInView(api.selectedScrollSnap());
	}, []);

	const onProgress = useCallback((api: CarouselApi) => {
		if (!api) return;
		setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
	}, []);

	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	useEffect(() => {
		if (!api) return;
		onResize(api);
		api.on("resize", onResize);

		return () => {
			api.off("resize", onResize);
		};
	}, [api, onResize]);

	useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect).on("select", onSelect);

		return () => {
			api.off("select", onSelect);
		};
	}, [api, onSelect]);

	useEffect(() => {
		if (!api) return;
		onProgress(api);
		api.on("reInit", onProgress).on("scroll", onProgress).on("slideFocus", onProgress);

		return () => {
			api.off("scroll", onProgress).off("slideFocus", onProgress);
		};
	}, [api, onProgress]);

	return (
		<CarouselContext
			value={{
				carouselRef,
				api,
				scrollNext,
				scrollPrev,
				canScrollNext,
				canScrollPrev,
				progress,
				scrollable,
				slideInView,
				full: full,
			}}
		>
			<section className={cn("@container/carousel relative flex flex-col", className)} {...props}>
				{props.children}
			</section>
		</CarouselContext>
	);
};

export const CarouselViewport = ({ className, ...props }: React.ComponentProps<"div">) => {
	const { carouselRef, full } = useCarousel();

	return (
		<div
			className={cn(
				"overflow-hidden [--column-gap:calc(0.125rem+2cqw)] [--column-width:30cqw] @md/carousel:[--column-width:25cqw] @xl/carousel:[--column-width:20cqw] @5xl/carousel:[--column-width:18cqw]",
				className,
			)}
			ref={carouselRef}
		>
			<div
				className={cn(
					"grid touch-pan-y touch-pinch-zoom grid-flow-col not-[&.full]:auto-cols-[calc(var(--column-width)-var(--column-gap))] not-[&.full]:gap-(--column-gap) not-[&.full]:pt-[calc(0.125rem+1.2cqi)] not-[&.full]:pb-[calc(0.125rem+3cqi)] [&.full]:auto-cols-[100%]",
					{ full: full },
				)}
				aria-live="polite"
				{...props}
			>
				{props.children}
			</div>
		</div>
	);
};

export const CarouselButtons = () => {
	const { canScrollNext, canScrollPrev, scrollNext, scrollPrev, progress, scrollable } =
		useCarousel();

	return scrollable ? (
		<div className="flex items-center justify-between gap-4">
			<progress
				value={progress}
				max={1}
				className="progress block h-[0.5rem] w-full appearance-none overflow-hidden rounded-full border"
			/>
			<div className="flex shrink-0 flex-row gap-2">
				<Button
					type="button"
					variant="secondary"
					size="square"
					onClick={scrollPrev}
					disabled={!canScrollPrev}
				>
					<Icon name="chevron-left" isHidden />
					<span className="sr-only">Previous slide</span>
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="square"
					onClick={scrollNext}
					disabled={!canScrollNext}
				>
					<Icon name="chevron-right" isHidden />
					<span className="sr-only">Next slide</span>
				</Button>
			</div>
		</div>
	) : null;
};

export const CarouselDotButtons = ({ length = 8 }: { length?: number }) => {
	const { api, slideInView } = useCarousel();

	const scrollTo = useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api],
	);

	return (
		<div className="absolute inset-x-0 bottom-4 flex flex-row items-center justify-center">
			<div className="flex gap-2">
				{Array(length)
					.fill(0)
					.map((_, i) => (
						<button
							key={i}
							type="button"
							aria-label={`Slides ${i + 1}`}
							aria-current={slideInView === i}
							className="size-[1rem] rounded-full border-2 aria-[current=true]:bg-accent-90"
							onClick={() => scrollTo(i)}
						/>
					))}
			</div>
		</div>
	);
};
