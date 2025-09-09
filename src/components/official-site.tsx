import type { ExternalIds } from "$/lib/tmdb/types";
import isNull from "$/utils/isNull";
import Button from "./button";
import Icon from "./icon";

export interface OfficialSiteProps extends ExternalIds {
	homepage?: string;
}

const getLink = (key: string, value: string) => {
	switch (key) {
		case "homepage":
			return {
				url: value,
				name: "Official site",
			};
		case "facebook_id":
			return {
				url: `https://facebook.com/${value}`,
				name: "Facebook",
			};
		case "instagram_id":
			return {
				url: `https://instagram.com/${value}`,
				name: "Instagram",
			};
		case "twitter_id":
			return {
				url: `https://x.com/${value}`,
				name: "X",
			};
		case "tiktok_id":
			return {
				url: `https://tiktok.com/@${value}`,
				name: "Tiktok",
			};
		case "youtube_id":
			return {
				url: `https://youtube.com/@${value}`,
				name: "Youtube",
			};
		default:
			return {
				url: value,
				name: "Official site",
			};
	}
};

export default function OfficialSite(props: OfficialSiteProps) {
	const external_links = Object.entries(props).filter(([_, value]) => value);

	return !isNull(external_links) ? (
		<div className="list-with-dot flex-wrap empty:hidden">
			{external_links.map(([key, value]) => {
				const link = getLink(key, value);
				return (
					<span key={key}>
						<Button asChild variant="text">
							<a href={link.url} target="_blank" rel="noreferrer noopener">
								<span>{link.name}</span>
								<Icon name="external-link" isHidden />
							</a>
						</Button>
					</span>
				);
			})}
		</div>
	) : null;
}
