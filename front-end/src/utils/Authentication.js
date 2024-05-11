// React
import { useEffect } from "react";
// Cookie
import Cookie from "cookie-universal";
// React router
import { Outlet, useNavigate, Navigate } from "react-router-dom";
// API
import api from "./api";
//
// import Err403 from "../pages/403/Err403";

export default function Authentication() {
  const navigate = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(res.data)

        // cookie.set("role", res.data.role);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }

    fetchData();
  }, [token, navigate]);

  return !token ? <Navigate to="/login" /> : <Outlet />;
}
