declare module "*.less";
declare module "*.png";
declare module "*.svg";
declare module "*.md";

type LoadingState = "REQUEST" | "SUCCESS" | "FAILURE";

type ModuleRoute = {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  title: string;
  exact?: boolean;
  protected?: boolean;
};

type ModuleRoutes = {
  routes: ModuleRoute[];
  protected?: boolean;
};

type ModuleDetail = {
  prefix: string;
  routes: ModuleRoute[];
};
