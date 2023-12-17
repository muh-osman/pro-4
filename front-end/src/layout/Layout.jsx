// React router
import { Outlet } from "react-router-dom";
// Pages & components
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
