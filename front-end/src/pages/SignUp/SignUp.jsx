// Sass
import style from "./SignUp.module.scss";
// React
import { useState } from "react";
//  Me(Axios)
import api from "../../utils/api";
// React router
import { useNavigate } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const res = await api.post("/register", formData);
      console.log(res.data);
      cookie.set("token", res.data.token);
      cookie.set("role", "2001");
      navigate("/dashboard/user", { replace: true });
    } catch (error) {
      setDisableBtn(false);
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h1>SignUp</h1>
      <form onSubmit={submitData}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            required
          />
        </div>

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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
          SignUp
        </button>
      </form>
    </div>
  );
}
