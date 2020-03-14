import { formPath } from "@/libs";
import { MODULE_PREFIX } from "./constants";
import AddSourceForm from "./pages/AddSource";
import Sources from "./pages/Sources";
import UpdateSourceForm from "./pages/UpdateSource";

export default {
  prefix: MODULE_PREFIX,
  routes: [Sources, AddSourceForm, UpdateSourceForm]
} as ModuleDetail;

export const LeftMenu: LeftMenuRecord = {
  title: "Workshop",
  path: formPath(MODULE_PREFIX, Sources.path)
};
