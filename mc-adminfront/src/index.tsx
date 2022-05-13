import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

import ErrorService from "services/error.service";
import SentryService from "services/sentry.service";
import OneSignalService from "services/onesignal.service";

ErrorService.init();
SentryService.init();
OneSignalService.init();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
