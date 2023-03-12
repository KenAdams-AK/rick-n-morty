type PropsT = {
	error: string | null;
};

export default function ErrorContainer(props: PropsT) {
	const { error } = props;

	return <div className="ErrorContainer">{error}...</div>;
}
