// Sass
import style from "./EditCategory.module.scss";
// React
import { useEffect, useState } from "react";
//  Me(Axios)
import api from "../../utils/api";
// React router
import { useNavigate, useParams } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("...");
  const [image, setImage] = useState("");

  const [disableBtn, setDisableBtn] = useState(true);

  const cookie = Cookie();
  const submitData = async (e) => {
    const form = new FormData()
    form.append("title", title)
    form.append("image", image)

    e.preventDefault();
    setDisableBtn(true);
    try {
      const res = await api.post(`/category/edit/${id}`, form, {
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

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/category/${id}`, {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
        });
        // console.log(res);

        setTitle(res.data.title)
        setImage(res.data.image)

        setDisableBtn(false);
      } catch (error) {
        console.log(error);
        navigate("/404", { replace: true });
      }
    }

    fetchUser();
  }, []);

  return (
    <div className={style.container}>
      <h1>Edit User</h1>
      <form onSubmit={submitData}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            value={title}
            placeholder={"Enter category title"}
            onChange={(e)=> setTitle(e.target.value)}
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
            onChange={(e)=> setImage(e.target.files.item(0))}
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
          Edit
        </button>
      </form>

      {/* <img src={image} alt="img" /> */}
    </div>
  );
}
