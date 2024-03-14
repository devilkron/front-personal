import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginFrom from "../components/Loginform";
import adminAuth from "../hooks/adminAuth";
import Header from "../components/Header";
import Home from "../components/Home";
import StudentReg from "../components/studentReg";
import AdminReg from "../components/adminReg"
import AdminForm from "../components/adminForm";
import Nav from "../components/Navbar"
import LoginGuest from "../components/LoginGuest"
import RegisGuest from "../components/GuestReg"
import Contact from "../components/contact"
import Footer from '../components/footer'
import Profile from "../components/profile"
import QRCODE from "../components/qrline"
import Showstd from "../components/showstd"
import Detail from "../components/showDetail"
import UpDetail from "../components/updateDetail"
const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <hr />
        <Outlet />
        <Footer/>
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      
      { path: "/guest", element: <LoginGuest/> },
      { path: "/login", element: <LoginFrom /> },
      { path: "/home", element: <Home /> },
      { path: "/account", element: <RegisGuest /> },
      {path: "/contact", element : <Contact/>},
      {path: "/line", element : <QRCODE/>}
      
      
    ],
  },
]);
const accountRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <Nav/>
      <hr />
      <Outlet/>
      </>
    ),
    children: [
      { index: true, element: <StudentReg /> },
      {path: "/", element: <StudentReg/>},
      {path: "/profile", element: <Profile/>},
      {path: "/show", element: <Showstd/>},
      {path: "/detail/*", element: <Detail/>},
      {path: "/update/*", element: <UpDetail/>}
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <hr />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <AdminForm/> },
      { path: "/add", element: <AdminReg/> },
      { path: "/", element: <AdminForm /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

export default function appRoute() {
  const { user } = adminAuth();
  // console.log(user)
  // console.log(admin);
  const finalRouter =user?.user_id? user?.user_role === "ADMIN"? adminRouter: accountRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
