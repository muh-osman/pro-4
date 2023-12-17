//  Me(Axios)
import api from "../../utils/api";
// Cookie
import Cookie from "cookie-universal";
// React router
import { useNavigate } from "react-router-dom";
// Scss
import style from "./Navbar.module.scss";
// React
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const cookie = Cookie();
  const token = cookie.get("token");

  const handleLogout = async () => {

    cookie.removeAll()

    try {
      const response = await api.get("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/login");

    } catch (err) {
      console.error(err);
    }
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    // console.log(user.name);
  }, []);


  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Navbar</span>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout: {user.name}
          </button>
        </div>
      </nav>
    </>
  );
}
