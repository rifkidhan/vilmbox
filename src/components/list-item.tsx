export default function ListItem({
	head,
	className,
	...props
}: { head: string } & React.ComponentProps<"li">) {
	return props.children ? (
		<li className={`[&>.is-content]:empty:hidden ${className}`} {...props}>
			<div className="font-semibold">{head}</div>
			<div className="list-with-dot is-content flex-wrap text-accent-70">{props.children}</div>
		</li>
	) : null;
}
