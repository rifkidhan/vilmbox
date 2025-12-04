import { type NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
	const preference = req.cookies.get("preference");

	const response = NextResponse.next();

	if (!preference) {
		const location = req.headers.get("X-Vercel-IP-Country") ?? "ID";

		const setPreference = {
			lang: "en-US",
			region: location,
		};

		response.cookies.set("preference", JSON.stringify(setPreference));
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt).*)",
	],
};
