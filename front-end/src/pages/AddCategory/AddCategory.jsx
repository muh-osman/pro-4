// Sass
import style from "./AddCategory.module.scss";
// React
import { useEffect, useState } from "react";
//  Me(Axios)
import api from "../../utils/api";
// React router
import { useNavigate } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function AddCategory() {
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [disableBtn, setDisableBtn] = useState(false);


  const cookie = Cookie();
  const submitData = async (e) => {
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    e.preventDefault();
    setDisableBtn(true);
    try {
      const res = await api.post(`/category/add/`, form, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      //   console.log(res.data);
      navigate("/dashboard/categories", { replace: true });
    } catch (error) {
      setDisableBtn(false);
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h1>Add Category</h1>
      <form onSubmit={submitData}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Image
          </label>
          <input
            placeholder="Enter Image"
            onChange={(e) => setImage(e.target.files.item(0))}
            name="image"
            type="file"
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
          Add
        </button>
      </form>
    </div>
  );
}
