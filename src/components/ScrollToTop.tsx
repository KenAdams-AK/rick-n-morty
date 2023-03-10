import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

type PropsT = {
	children: ReactNode;
};

export default function ScrollToTop(props: PropsT) {
	const { children } = props;
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return <>{children}</>;
}
