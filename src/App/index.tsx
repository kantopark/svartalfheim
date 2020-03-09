import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "./Layout";
import RouteSwitch from "./RouteSwitch";

export default () => (
  <Layout>
    <ErrorBoundary>
      <RouteSwitch />
    </ErrorBoundary>
  </Layout>
);
