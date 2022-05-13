import * as Sentry from "@sentry/react";
import { log } from "../utils/logger.util";
import { BrowserTracing } from "@sentry/tracing";

const SentryService = {
	init: () => {
		if (process.env.NODE_ENV !== "production") return;

		Sentry.init({
			// debug: true,
			tracesSampleRate: 1.0,
			attachStacktrace: true,
			environment: process.env.NODE_ENV,
			integrations: [new BrowserTracing()],
			dsn: process.env.REACT_APP_SENTRY_PUBLIC_KEY,
			release: process.env.REACT_APP_SENTRY_RELEASE_KEY,
		});

		log("sentry init");
	},
};

export default SentryService;
