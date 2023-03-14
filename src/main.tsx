import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import store from "./redux/store";
import "./scss/styles.scss";

const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<BrowserRouter>
					<Auth0Provider
						domain={domain}
						clientId={clientId}
						authorizationParams={{ redirect_uri: window.location.origin }}
					>
						<App />
					</Auth0Provider>
				</BrowserRouter>
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>
);
