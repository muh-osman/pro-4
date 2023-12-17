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

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "...",
    email: "...",
    role: "",
  });

  const [disableBtn, setDisableBtn] = useState(true);

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
      const res = await api.post(`/user/edit/${id}`, formData, {
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

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/user/${id}`, {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
        });
        // console.log(res.data);
        setFormData({
          ...formData,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
        setDisableBtn(false);
      } catch (error) {
        console.log(error);
        navigate("/404", {replace: true})
      }
    }

    fetchUser();
  }, []);

  return (
    <div className={style.container}>
      <h1>Edit User</h1>
      <form onSubmit={submitData}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            value={formData.name}
            placeholder={formData.name}
            onChange={handleChange}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            value={formData.email}
            placeholder={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <div className="mb-3">
        <label htmlFor="" className="form-label">
            Role
          </label>
          <select onChange={handleChange} value={formData.role} name="role" className="form-select" aria-label="Default select example">
            <option disabled value="">Select role</option>
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
          Edit
        </button>
      </form>
    </div>
  );
}
