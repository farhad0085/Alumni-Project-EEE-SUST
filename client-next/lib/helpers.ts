import { SITE_NAME } from "./constants";

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

export const setPageTitle = (title?: string) => {
  if (typeof document === "undefined") return;
  document.title = title ? `${SITE_NAME} | ${title}` : SITE_NAME;
};
