"use client";

import cn from "clsx";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import Button from "../button";
import Icon from "../icon";
import s from "./carousel.module.css";

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
}: React.ComponentProps<"div"> & CarouselProps) => {
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

		window.addEventListener("resize", () => {
			onResize(api);
		});

		api.on("resize", onResize);

		return () => {
			window.removeEventListener("resize", () => {
				onResize(api);
			});
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
		api
			.on("reInit", onProgress)
			.on("scroll", onProgress)
			.on("slideFocus", onProgress);

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
			<div className={cn(s.carousel, className)} {...props}>
				{props.children}
			</div>
		</CarouselContext>
	);
};

export const CarouselViewport = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	const { carouselRef, full } = useCarousel();

	return (
		<div className={cn(s.viewport, className)} ref={carouselRef}>
			<div
				className={cn(s.container, { [s.full]: full })}
				aria-live="polite"
				{...props}
			>
				{props.children}
			</div>
		</div>
	);
};

export const CarouselButtons = () => {
	const {
		canScrollNext,
		canScrollPrev,
		scrollNext,
		scrollPrev,
		progress,
		scrollable,
	} = useCarousel();

	return scrollable ? (
		<div className={s.controls}>
			<progress value={progress} max={1} className={s.progress} />
			<div className={s.buttons}>
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
		<div className={s.dotButtons}>
			<div className={s.dots}>
				{Array(length)
					.fill(0)
					.map((_, i) => (
						<button
							key={i}
							type="button"
							aria-label={`Slides ${i + 1}`}
							aria-current={slideInView === i}
							onClick={() => scrollTo(i)}
						/>
					))}
			</div>
		</div>
	);
};
