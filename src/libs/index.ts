export function formPath(prefix: string, componentPath: string) {
  const stripSlash = (s: string) => s.replace(/^\/*/g, "").replace(/\/*$/g, "");

  prefix = stripSlash(prefix);
  componentPath = stripSlash(componentPath);

  return `/${prefix}/${componentPath}`.replace(/\/{2,}/g, "/");
}
