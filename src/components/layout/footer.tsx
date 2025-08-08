import Button from "../button";
import s from "./footer.module.css";

export default function Footer() {
	const date = new Date();

	return (
		<footer className={s.footer}>
			<div className={s.wrapper}>
				<div className="footer-top"></div>
				<div className={s.bottom}>
					<div>{date.getFullYear()} Vilmbox by Rifkidhan.</div>
					<div>
						<span>Database from </span>
						<Button asChild variant="text">
							<a
								href="https://www.themoviedb.org"
								target="_blank"
								rel="noopener noreferrer"
							>
								TMDB
							</a>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
}
