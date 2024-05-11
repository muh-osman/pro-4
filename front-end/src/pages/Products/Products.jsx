// React
import { useEffect, useState } from "react";
// Sass
import style from "./Products.module.scss";
// Icons
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
// Me(Axios)
import api from "../../utils/api";
// Cookie
import Cookie from "cookie-universal";
// React router
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const cookie = Cookie();
  const fetchData = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      setProducts(response.data);
      setLoading(false);

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await api.delete(`/product/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const table = products.map((product) => (
    <tr key={product.id}>
      <th scope="row">{product.id}</th>
      <td>{product.title}</td>
      <td>{product.description}</td>

      <td>
        {product.images.map((img) => (
          <img key={img.id} src={img.image} alt={img.id} />
        ))}
      </td>

      <td>{product.price}</td>

      <td>
        <div className={style.btn_box}>
          <Link to={`${product.id}`}>
            <FaPenToSquare />
          </Link>

          <button onClick={() => deleteProduct(product.id)}>
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
              <th scope="col">Description</th>
              <th scope="col">Images</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>

          <tfoot>
            <tr>
              <td colSpan="5" className="text-center">
                {products.length <= 0 ? "No product found" : null}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
