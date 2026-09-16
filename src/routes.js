const baseUrl = import.meta.env.BASE_URL || "/";

export function appHref(path = "") {
  if (!path || path === "/") return baseUrl;
  if (path.startsWith("#")) return `${baseUrl}${path}`;
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

export function appPathname() {
  const pathname = window.location.pathname;
  if (baseUrl !== "/" && pathname.startsWith(baseUrl)) {
    return `/${pathname.slice(baseUrl.length).replace(/^\/+/, "")}`;
  }
  return pathname;
}
