import home from "@/modules/Home";
import workshop from "@/modules/Workshop";

const moduleList = [home, workshop];

const routeMap: Record<string, ModuleRoutes> = moduleList.reduce(
  (a, { prefix, routes }) => ({
    ...a,
    [prefix]: { routes }
  }),
  {} as Record<string, ModuleRoutes>
);

export const redirectPath = "/";
export default routeMap;
