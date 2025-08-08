export default function ListItem({
	head,
	...props
}: { head: string } & React.ComponentProps<"li">) {
	return props.children ? (
		<li className="list-item" {...props}>
			<div className="heading">{head}</div>
			<div className="content list-with-dot">{props.children}</div>
		</li>
	) : null;
}
