export default function ListItem({
	head,
	...props
}: { head: string } & React.ComponentProps<"li">) {
	return props.children ? (
		<li className="has-[.is-content:empty]:hidden" {...props}>
			<div className="font-semibold">{head}</div>
			<div className="list-with-dot is-content flex-wrap text-accent-70">{props.children}</div>
		</li>
	) : null;
}
