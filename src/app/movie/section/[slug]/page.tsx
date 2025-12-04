export default async function MovieSection(props: PageProps<"/movie/section/[slug]">) {
	const { slug } = await props.params;

	return <div>{slug}</div>;
}
