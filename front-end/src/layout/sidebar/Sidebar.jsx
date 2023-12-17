// Sass
import { NavLink } from "react-router-dom";
import styie from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-body-tertiary"
      style={{ width: 280, height: "100vh" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
            aria-current="page"
            end
          >
            <svg
              className="bi bi-house-door-fill me-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="users"
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
          >
            <svg
              className="bi bi-people-fill me-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="user/add"
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
          >
            <svg
              className="bi bi-person-fill-add me-2"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
            </svg>
            Add user
          </NavLink>
        </li>

        <hr style={{ color: "#0d6efd" }} />

        <li>
          <NavLink
            to="writer"
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-person-badge me-2"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
            </svg>
            Writer page
          </NavLink>
        </li>

        <hr style={{ color: "#0d6efd" }} />

        <li>
          <NavLink
            to="user"
            end
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-person-vcard-fill me-2"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
            </svg>
            User page
          </NavLink>
        </li>

        <hr style={{ color: "#0d6efd" }} />

        <li>
          <NavLink
            to="categories"
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-box-fill me-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
              />
            </svg>
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink
            to="category/add"
            style={{ display: "flex", alignItems: "center" }}
            className="nav-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-bag-plus-fill me-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"
              />
            </svg>
            Add Category
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
