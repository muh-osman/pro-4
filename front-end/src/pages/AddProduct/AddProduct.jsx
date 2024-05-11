// Sass
import style from "./AddProduct.module.scss";
// React
import { useEffect, useRef, useState } from "react";
//  Me(Axios)
import api from "../../utils/api";
// React router
import { useNavigate } from "react-router-dom";
// Cookie
import Cookie from "cookie-universal";

export default function AddProduct() {
  const navigate = useNavigate();
  // State
  const [disableBtn, setDisableBtn] = useState(false);
  const [formId, setFormId] = useState(null);
  // Ref
  const progress = useRef([]);
  const ids = useRef([]);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [images, setImages] = useState([]);

  // console.log(images);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const cookie = Cookie();
  const submitData = async (e) => {
    // const data = new FormData();
    // data.append("category", form.category);
    // data.append("title", form.title);
    // data.append("description", form.description);
    // data.append("price", form.price);
    // data.append("discount", form.discount);
    // data.append("About", form.About);
    // for (let i = 0; i < images.length; i++) {
    //   data.append("images[]", images[i]);
    // }

    e.preventDefault();
    setDisableBtn(true);

    try {
      const res = await api.post(`/product/edit/${formId}`, form, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      //   console.log(res.data);
      navigate("/dashboard/products", { replace: true });
    } catch (error) {
      setDisableBtn(false);
      console.log(error);
    }
  };

  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const response = await api.get("/categories", {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      setCategories(response.data);

      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const submit = async () => {
      const data = {
        category: null,
        title: "xxx",
        description: "xxx",
        price: 0,
        discount: 0,
        About: "xxx",
      };

      try {
        const res = await api.post(`/product/add/`, data, {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
        });
        setFormId(res.data.id);
      } catch (error) {
        console.log(error);
      }
    };

    submit();
    fetchCategories();
  }, []);

  const options = categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ));

  const showImages = images.map((image, i) => (
    <div key={i} className={style.image_box}>
      <div>
        <img src={URL.createObjectURL(image)} alt={i} />
      </div>
      <div className="w-100">
        <h5>{image.name}</h5>
        {/* <h6>{Math.trunc(image.size / 1024)}KP</h6> */}
        <h6>
          {image.size / 1024 < 500
            ? (image.size / 1024).toFixed(2) + " KB"
            : (image.size / (1024 * 1024)).toFixed(2) + " MB"}
        </h6>

        <div
          className="progress"
          role="progressbar"
          aria-label="Example with label"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            ref={(e) => (progress.current[i] = e)}
            className="progress-bar"
          ></div>
        </div>
      </div>
      <div>
        <button
          onClick={() => handleDeleteImage(i, image)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  ));

  const j = useRef(-1);

  const handleImageChange = async (e) => {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFile = e.target.files;
    const data = new FormData();

    for (let i = 0; i < imagesAsFile.length; i++) {
      j.current++;
      data.append("image", imagesAsFile[i]);
      data.append("product_id", formId);

      try {
        const res = await api.post(`/product-img/add/`, data, {
          headers: {
            Authorization: "Bearer " + cookie.get("token"),
          },
          onUploadProgress: ({ loaded, total }) => {
            let percent = Math.floor((loaded * 100) / total);
            progress.current[j.current].style.width = `${percent}%`;
            progress.current[j.current].innerHTML = `${percent}%`;
          },
        });
        ids.current[j.current] = res.data.id;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Delete image

  const handleDeleteImage = async (id, img) => {
    const findId = ids.current[id];
    try {
      const res = await api.delete(`/product-img/${findId}/`, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <h1>Add Product</h1>
      <form onSubmit={submitData}>
        {/* category */}
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Category
          </label>
          <select
            onChange={handleChange}
            value={form.category}
            name="category"
            className="form-select"
            aria-label="Default select example"
          >
            <option disabled value="">
              Select category
            </option>
            {options}
          </select>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            value={form.title}
            placeholder="Enter Title"
            onChange={handleChange}
            name="title"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Description
          </label>
          <input
            value={form.description}
            placeholder="Enter Description"
            onChange={handleChange}
            name="description"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Price
          </label>
          <input
            value={form.price}
            placeholder="Enter Price"
            onChange={handleChange}
            name="price"
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* Discount */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Discount
          </label>
          <input
            value={form.discount}
            placeholder="Enter Discount"
            onChange={handleChange}
            name="discount"
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        {/* About */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            About
          </label>
          <input
            value={form.About}
            placeholder="Enter About"
            onChange={handleChange}
            name="About"
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
            onChange={handleImageChange}
            name="image"
            type="file"
            multiple
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div>{showImages}</div>

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
