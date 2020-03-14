import { createAction } from "typesafe-actions";

export function formPath(prefix: string, componentPath: string, params?: Record<string, any>) {
  const stripSlash = (s: string) => s.replace(/^\/*/g, "").replace(/\/*$/g, "");

  prefix = stripSlash(prefix);
  componentPath = stripSlash(componentPath);

  let path = `/${prefix}/${componentPath}`.replace(/\/{2,}/g, "/");

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (!key.startsWith(":")) key = ":" + key;
    path = path.replace(new RegExp(`/${key}(/?)$`, "gi"), `/${value}$1`);
  });

  return path;
}

type LocalActionDef<
  TCreatorPayload extends any = undefined,
  TCreatorMeta extends any = undefined,
  TArgs extends any[] = any[]
> = {
  type: string;
  payloadCreator?: (...args: TArgs) => TCreatorPayload;
  metaCreator?: (...args: TArgs) => TCreatorMeta;
};

export function createLocalAction<A extends any = void, W extends any = void>(
  action: LocalActionDef,
  watch: LocalActionDef
) {
  const create = <T extends any = void>(item: LocalActionDef) =>
    createAction(
      item.type,
      item.payloadCreator ?? (() => ({ payload: undefined })),
      item.metaCreator
    )<T>();

  return [create<A>(action), create<W>(watch)];
}
