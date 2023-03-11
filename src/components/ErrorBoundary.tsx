import { Component, ErrorInfo, ReactNode } from "react";

type PropsT = {
	children: ReactNode;
};

type StateT = {
	hasError: boolean;
};

class ErrorBoundary extends Component<PropsT, StateT> {
	state: StateT = {
		hasError: false,
	};

	static getDerivedStateFromError(_: Error): StateT {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Uncaught error: ", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="ErrorBoundary__container">
					<div className="ErrorBoundary__title">
						Sorry... there was an error.
					</div>
					<button
						className="ErrorBoundary__button"
						type="button"
						onClick={() => location.reload()}
					>
						Reload the page
					</button>
					<button
						className="ErrorBoundary__button"
						type="button"
						onClick={() => window.location.replace("/")}
					>
						Back to home page
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
