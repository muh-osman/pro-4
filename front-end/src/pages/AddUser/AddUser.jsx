// Sass
import style from "./Edit.module.scss";
// React
import { useEffect, useState } from "react";
//  Me(Axios)
import api from "../../utils/api";
// React router
import { useNavigate, useParams } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
      const res = await api.post(`/user/add/`, formData, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      //   console.log(res.data);
      navigate("/dashboard/users", { replace: true });
    } catch (error) {
      setDisableBtn(false);
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h1>Add User</h1>
      <form onSubmit={submitData}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            value={formData.name}
            placeholder="Enter Name"
            onChange={handleChange}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword10" className="form-label">
            Password
          </label>
          <input
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword10"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Role
          </label>
          <select
            onChange={handleChange}
            value={formData.role}
            name="role"
            className="form-select"
            aria-label="Default select example"
          >
            <option disabled value="">
              Select role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Seller</option>
          </select>
        </div>

        <button
          disabled={disableBtn}
          type="submit"
          className="btn btn-primary mx-auto d-block"
        >
          Add
        </button>
      </form>
    </div>
  );
}
