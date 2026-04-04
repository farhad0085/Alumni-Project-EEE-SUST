export const HOME_PAGE = "/"

// Auth
export const REGISTER_PAGE = "/register";
export const LOGIN_PAGE = "/login";
export const LOGOUT_PAGE = "/logout";
export const FORGET_PASSWORD_REQUEST = "/forget-password/request";
export const FORGET_PASSWORD_CONFIRM = "/forget-password/reset/:uid/:token";

// Event
export const EVENT_LISTING_PAGE = "/events"
export const EVENT_DETAIL_PAGE = "/events/:id"

// Dashboard
export const DASHBOARD_PAGE = "/dashboard";

// Others
export const ACCESS_DENIED_PAGE = "/access-denied"
export const ABOUT_US_PAGE = "/about-us"
export const CONTACT_US_PAGE = "/contact-us"
export const FAQ_PAGE = "/frequently-asked-questions"
export const TESTIMONIAL_PAGE = "/testimonials"
export const NEWSLETTER_PAGE = "/newsletter-subscribe"


export const buildEventPageUrl = (id) => {
  return EVENT_DETAIL_PAGE.replace(":id", id)
}
