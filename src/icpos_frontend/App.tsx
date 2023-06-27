import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/router";

import ConfigPage from "./pages/config";
import HistoryPage from "./pages/history";
import InitialConfigPage from "./pages/initial-config";
import MerchantPage from "./pages/merchant";
import ReceivePage from "./pages/receive";
import SendPage from "./pages/send";
import StartPage from "./pages/start";
import { Toaster } from "react-hot-toast";
import TransactionPage from "./pages/transaction";
import { lazy } from "@tanstack/router";

function Root() {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}

const rootRoute = new RootRoute({
  component: Root,
});

const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: lazy(() => import("./pages/history")),
});

const transactionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/transaction/$transactionId",
  component: lazy(() => import("./pages/transaction")),
});

const routes = [
  new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: lazy(() => import("./pages/start")),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/merchant",
    component: lazy(() => import("./pages/merchant")),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/initial-config",
    component: lazy(() => import("./pages/initial-config")),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/config",
    component: lazy(() => import("./pages/config")),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/receive",
    component: lazy(() => import("./pages/receive")),
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/send",
    component: lazy(() => import("./pages/send")),
  }),
  historyRoute,
  transactionRoute,
];

// Create the route tree using your routes
const routeTree = rootRoute.addChildren(routes);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <div className="container max-w-lg p-0 m-0 mx-auto prose prose-xl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
