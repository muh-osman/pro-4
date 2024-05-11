// React
import { useEffect, useState } from "react";
// Sass
import style from "./Users.module.scss";
// Icons
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
// Me(Axios)
import api from "../../utils/api";
// Cookie
import Cookie from "cookie-universal";
// React router
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const cookie = Cookie();
  const fetchData = async () => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      setUsers(response.data);
      setLoading(false);

      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      setCurrentUsers(response.data);
      // setLoading(false);
      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // const filterCurrentUser = users.filter((user) => user.id !== currentUsers.id);

  const table = users.map((user) => (
    <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td>
        {user.name === currentUsers.name ? user.name + " (You)" : user.name}
      </td>
      <td>{user.email}</td>
      <td>
        {user.role === "1995"
          ? "Admin"
          : user.role === "2001"
          ? "User"
          : user.role === "1996"
          ? "Writer"
          : "Seller"}
      </td>
      <td>
        <div className={style.btn_box}>
          <Link to={`${user.id}`}>
            <FaPenToSquare />
          </Link>

          {user.name !== currentUsers.name && (
            <button onClick={() => deleteUser(user.id)}>
              <FaTrashCan />
            </button>
          )}
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
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>

          <tfoot>
            <tr>
              <td colSpan="5" className="text-center">
                {users.length <= 1 ? "No users found" : null}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
