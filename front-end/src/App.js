//React router
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
// Pages & Components
import Layout from "./layout/Layout"
import Dashboard from "./pages/Dashboard/Dashboard"
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import Users from "./pages/Dashboard/Users/Users";
import Edit from "./pages/Edit/Edit";
import AddUser from "./pages/AddUser/AddUser";
import Err403 from "./pages/403/Err403";
import User from "./pages/User/User";
import Writer from "./pages/Writer/Writer";
import Err404 from "./pages/Err404/Err404";
import Categories from "./pages/Categories/Categories";
import AddCategory from "./pages/AddCategory/AddCategory";
import EditCategory from "./pages/EditCategory/EditCategory";
// Utils
import Authentication from "./utils/Authentication";
import AdminAuthorization from "./utils/AdminAuthorization";
import UserAuthorization from "./utils/UserAuthorization";
import WriterAuthorization from "./utils/WriterAuthorization";
import HideAuth from "./utils/HideAuth";
import CategoriesAuthorization from "./utils/CategoriesAuthorization";



export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
              <Route index element={<Home />} />

              <Route element={<HideAuth />} >
                  <Route path="login" element={<LogIn />} />
                  <Route path="signup" element={<SignUp />} />
              </Route>

              {/* Check Login */}
              <Route element={<Authentication />} >
                  <Route path="dashboard" element={<Layout />}>
                      <Route path="403" element={<Err403 />} />

                      {/* Check Role */}
                      <Route element={<AdminAuthorization />} >
                          <Route index element={<Dashboard />} />
                          <Route path="users" element={<Users />} />
                          <Route path="users/:id" element={<Edit />} />
                          <Route path="user/add" element={<AddUser />} />
                      </Route>

                      <Route element={<WriterAuthorization />} >
                          <Route path="writer" element={<Writer />} />
                      </Route>

                      <Route element={<UserAuthorization />} >
                          <Route path="user" element={<User />} />
                      </Route>

                      <Route element={<CategoriesAuthorization />} >
                          <Route path="categories" element={<Categories />} />
                          <Route path="categories/:id" element={<EditCategory />} />
                          <Route path="category/add" element={<AddCategory />} />
                      </Route>

                  </Route>
              </Route>

              <Route path="*" element={<Err404 />} />

      </Route>
    )
  );


  
  return <RouterProvider router={router} />;
}
