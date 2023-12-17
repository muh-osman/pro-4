// React router
import { Outlet } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";
// Page
import Err403 from "../pages/403/Err403";

export default function CategoriesAuthorization() {
  const cookie = Cookie();
  const role = cookie.get("role");

  //   console.log(role)

  return role === 1999 || role === 1995 ? <Outlet /> : <Err403 />;
}
