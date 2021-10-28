import { ComponentType } from "react";
import { RouteProps } from "react-router-dom";
import Home from "../pages/Home";
import Case from "../pages/Case";
import Contact from "../pages/Contact";

type RoutesConfig = Array<RouteType>;
export type RouteType = Omit<
  RouteProps,
  "render" | "children | component | routes"
> & {
  routes?: RoutesConfig;
  component: ComponentType;
};

const routes: RoutesConfig = [
  { path: "/home", component: Home },
  { path: "/case", component: Case, exact: true },
  { path: "/contact", component: Contact, exact: true },
];

export default routes;
