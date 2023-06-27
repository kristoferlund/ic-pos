import { Outlet, RootRoute, Route, Router } from "@tanstack/router";

import { lazy } from "@tanstack/router";

function Root() {
  return <Outlet />;
}

const rootRoute = new RootRoute({
  component: Root,
});

const startPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazy(() => import("./pages/start/StartPage")),
});

const merchantRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/merchant",
  component: lazy(() => import("./pages/merchant/MerchantPage")),
});

const initialConfigRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/initial-config",
  component: lazy(() => import("./pages/initial-config/InitialConfigPage")),
});

const configRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/config",
  component: lazy(() => import("./pages/config/ConfigPage")),
});

const receiveRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/receive",
  component: lazy(() => import("./pages/receive/ReceivePage")),
});

const sendRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/send",
  component: lazy(() => import("./pages/send/SendPage")),
});

const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: lazy(() => import("./pages/history/HistoryPage")),
});

const transactionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/transaction/$transactionId",
  component: lazy(() => import("./pages/transaction/TransactionPage")),
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: lazy(() => import("./pages/not-found/NotFoundPage")),
});

const routes = [
  startPageRoute,
  merchantRoute,
  initialConfigRoute,
  configRoute,
  receiveRoute,
  sendRoute,
  historyRoute,
  transactionRoute,
  notFoundRoute,
];

// Create the route tree using your routes
const routeTree = rootRoute.addChildren(routes);

// Create the router using your route tree
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
