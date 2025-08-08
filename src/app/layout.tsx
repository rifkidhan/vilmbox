import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BASE_URL, TITLE_PAGE } from "$/lib/constants";
import BackToTop from "$/components/layout/back-to-top";
import Footer from "$/components/layout/footer";
import Header from "$/components/layout/header";
import "$/styles/main.css";

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
	description: "The movie database website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className={geistSans.variable}>
			<body>
				<ThemeProvider
					storageKey="vilmbox:theme"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main>{children}</main>
					<BackToTop />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
