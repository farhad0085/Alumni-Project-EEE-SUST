export const HOME_PAGE = "/";

// Auth
export const REGISTER_PAGE = "/register";
export const LOGIN_PAGE = "/login";
export const LOGOUT_PAGE = "/logout";
export const FORGET_PASSWORD_REQUEST = "/forget-password/request";

// Event
export const EVENT_LISTING_PAGE = "/events";
export const EVENT_DETAIL_PAGE = "/events/[id]";

// Dashboard
export const DASHBOARD_PAGE = "/dashboard";

// Others
export const ACCESS_DENIED_PAGE = "/access-denied";

export const buildEventPageUrl = (id: string | number) => `/events/${id}`;
