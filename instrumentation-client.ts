// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://552fa19c618993ee5c41a4306d69fb60@o1087725.ingest.us.sentry.io/4510280299905024",
  // Enable logs to be sent to Sentry
  enableLogs: true,

  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  spotlight: process.env.NODE_ENV === "development",

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;