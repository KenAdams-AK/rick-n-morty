import { useAuth0 } from "@auth0/auth0-react";
import ErrorContainer from "./ErrorContainer";
import LoaderFallback from "./LoaderFallback";

export default function Auth() {
	const { isLoading, error, isAuthenticated, user, loginWithRedirect, logout } =
		useAuth0();

	return (
		<div className="Auth">
			{error ? (
				<p>
					Authentication Error. <ErrorContainer error={error.message} />
				</p>
			) : null}

			{!error && isLoading ? <LoaderFallback /> : null}

			{!error && !isLoading ? (
				!isAuthenticated ? (
					<button
						type="button"
						onClick={() => loginWithRedirect()}
						className="Auth__button Auth__button--log-in"
					>
						Log in
					</button>
				) : (
					<>
						{user ? (
							<div className="Auth__user user">
								<div className="user__picture">
									<img
										className="user__image"
										src={user.picture}
										alt={user.name}
									/>
								</div>
								<div className="user__name">{user.name}</div>
							</div>
						) : null}
						<button
							type="button"
							onClick={() => logout()}
							className="Auth__button Auth__button--log-out"
						>
							Log out
						</button>
					</>
				)
			) : null}
		</div>
	);
}
