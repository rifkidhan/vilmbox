import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BASE_URL, TITLE_PAGE } from "$/lib/constants";
import BackToTop from "$/components/layout/back-to-top";
import Footer from "$/components/layout/footer";
import Header from "$/components/layout/header";
import "./globals.css";

const geistSans = Geist({
	variable: "--geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: TITLE_PAGE,
		template: `%s | ${TITLE_PAGE}`,
	},
	openGraph: {
		title: {
			default: TITLE_PAGE,
			template: `%s | ${TITLE_PAGE}`,
		},
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#fafafa" },
		{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
	],
};

export default function RootLayout(props: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning className={geistSans.variable}>
			<body className="bg-accent-10 font-sans text-vb-normal text-accent-90 antialiased [--header-height:3rem] selection:bg-primary-light selection:text-accent-90">
				<ThemeProvider storageKey="vilmbox:theme" enableSystem disableTransitionOnChange>
					<Header />
					<main className="mb-12 flex min-h-[calc(100dvh-(var(--header-height)*2)-1.5rem)] w-full flex-col justify-center-safe gap-12">
						{props.children}
					</main>
					<BackToTop />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
