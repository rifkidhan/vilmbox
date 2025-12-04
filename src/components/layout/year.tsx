"use client";

export default function Year() {
	const date = new Date();

	return <div>{date.getFullYear()} Vilmbox by Rifkidhan.</div>;
}
