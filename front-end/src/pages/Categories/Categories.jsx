// React
import { useEffect, useState } from "react";
// Sass
import style from "./Categories.module.scss";
// Icons
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
// Me(Axios)
import api from "../../utils/api";
// Cookie
import Cookie from "cookie-universal";
// React router
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const cookie = Cookie();
  const fetchData = async () => {
    try {
      const response = await api.get("/categories", {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      setCategories(response.data);
      setLoading(false);

      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await api.delete(`/category/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const table = categories.map((category) => (
    <tr key={category.id}>
      <th scope="row">{category.id}</th>
      <td>{category.title}</td>
      <td>
        <img src={category.image} alt="img" />
      </td>
      <td>
        <div className={style.btn_box}>
          <Link to={`${category.id}`}>
            <FaPenToSquare />
          </Link>

          <button onClick={() => deleteProduct(category.id)}>
            <FaTrashCan />
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className={style.container}>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>

          <tfoot>
            <tr>
              <td colSpan="5" className="text-center">
                {categories.length <= 0 ? "No category found" : null}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
