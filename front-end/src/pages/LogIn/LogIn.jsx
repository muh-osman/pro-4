// Sass
import style from "./LogIn.module.scss";
// React
import { useState } from "react";
//  Me(Axios)
import api from "../../utils/api";
// React router
import { useNavigate } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function LogIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "admin123$%",
  });

  const [disableBtn, setDisableBtn] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cookie = Cookie();
  const submitData = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      const res = await api.post("/login", formData);
      // console.log(res.data);
      cookie.set("token", res.data.token);
      cookie.set("role", res.data.user.role);

      // console.log(res.data.user.role)

      if (res.data.user.role === "1995") {
        navigate("/dashboard", { replace: true });
      } else if (res.data.user.role === "2001") {
        navigate("/dashboard/user", { replace: true });
      } else if (res.data.user.role === "1996") {
        navigate("/dashboard/writer", { replace: true });
      } else if (res.data.user.role === "1999") {
        navigate("/dashboard/products", { replace: true });
      }
    } catch (error) {
      setDisableBtn(false);
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h1>LogIn</h1>
      <form onSubmit={submitData}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <button
          disabled={disableBtn}
          type="submit"
          className="btn btn-primary mx-auto d-block"
        >
          LogIn
        </button>
      </form>
    </div>
  );
}
