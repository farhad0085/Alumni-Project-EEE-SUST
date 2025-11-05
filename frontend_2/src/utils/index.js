export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export const setPageTitle = (title) => {
  const siteName = import.meta.env.VITE_APP_SITE_NAME;
  if (title) {
    document.title = siteName + " | " + title;
  } else {
    document.title = siteName;
  }
  return true;
};
