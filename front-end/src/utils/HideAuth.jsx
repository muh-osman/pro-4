import { Navigate, Outlet, useLocation } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function HideAuth() {
  const cookie = Cookie();
  const token = cookie.get("token");

//   const location = useLocation();
//   const previousPath = location.state?.from;

//   console.log(previousPath)

  return token ? window.history.back() : <Outlet />;
}
