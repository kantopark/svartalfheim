import { AccountSelector } from "@/features/account";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { ErrorPage } from "./ErrorBoundary";

import routeMap, { redirectPath } from "./routes";

const moduleMap = Object.entries(routeMap).reduce(
  (acc, [prefix, { routes, ...rest }]) => ({
    ...acc,
    [prefix]: {
      ...rest,
      routes: routes.map(({ path, exact, ...r }) => ({
        ...r,
        exact: exact === undefined ? true : exact,
        path: (prefix + path).replace(/\/{2,}/g, "/")
      }))
    }
  }),
  {} as Record<string, ModuleRoutes>
);

const publicRouteList = Object.values(moduleMap)
  .flatMap(module =>
    module.routes.map((r, i) => {
      const guarded = !!(module.protected || r.protected);
      if (guarded) return null;

      return <Route path={r.path} exact={r.exact} component={r.component} key={i} />;
    })
  )
  .filter(r => r !== null);

const privateRouteList = Object.values(moduleMap)
  .flatMap(module =>
    module.routes.map((r, i) => {
      const unGuarded = !(module.protected || r.protected);
      if (unGuarded) return null;

      return (
        <Route
          path={r.path}
          exact={r.exact}
          render={props => <RouteGuard component={r.component} props={props} />}
          key={i}
        />
      );
    })
  )
  .filter(r => r !== null);

type RouteGuardProps = {
  props: any;
  component: ModuleRoute["component"];
};

const RouteGuard = ({ component: Component, props }: RouteGuardProps) => {
  const isSignedIn = useSelector(AccountSelector.isSignedIn);
  return isSignedIn ? <Component {...props} /> : <Redirect to={redirectPath} />;
};

export default () => (
  <Switch>
    {publicRouteList}
    {privateRouteList}
    <Route path="/not-found" component={() => <ErrorPage />} />
    <Route component={() => <ErrorPage />} />
  </Switch>
);
