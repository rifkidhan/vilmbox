import s from "./carousel.module.css";

export default function CarouselSkeleton() {
	return (
		<>
			{Array(8)
				.fill(0)
				.map((_, i) => (
					<div key={i} className={s.skeleton}>
						<span />
						<span />
						<span />
					</div>
				))}
		</>
	);
}
