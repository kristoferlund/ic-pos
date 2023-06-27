import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/router";

import ConfigPage from "./pages/config";
import InitialConfigPage from "./pages/initial-config";
import MerchantPage from "./pages/merchant";
import ReceivePage from "./pages/receive";
import SendPage from "./pages/send";
import StartPage from "./pages/start";
import { Toaster } from "react-hot-toast";

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}

const routes = [
  new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: StartPage,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/merchant",
    component: MerchantPage,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/initial-config",
    component: InitialConfigPage,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/config",
    component: ConfigPage,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/receive",
    component: ReceivePage,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/send",
    component: SendPage,
  }),
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
