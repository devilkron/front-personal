import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginFrom from "../components/admin/Loginform";
import adminAuth from "../hooks/adminAuth";
import Header from "../components/head/Header";
import Home from "../components/home/Home";
import Enroll from "../components/adminReg"
import AdminForm from "../components/adminForm";
import Nav from "../components/head/Navbar"
import LoginGuest from "../components/user/LoginGuest"
import RegisGuest from "../components/user/GuestReg"
import Contact from "../components/home/contact"
import Footer from '../components/home/footer'
import Profile from "../components/profile"
import QRCODE from "../components/home/qrline"
import Showstd from "../components/user/showstd"
import Detail from "../components/user/showDetail"
import UpDetail from "../components/user/updateDetail"
import Major from "../components/Major/Addmajor"
import Majortb from "../components/Major/Majortb";
import { I18nextProvider } from 'react-i18next';
import i18n from '../il8n';

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
      { index: true, element: <Showstd /> },
      {path: "/", element: <Showstd/>},
      {path: "/profile", element: <Profile/>},
      {path: "/add", element: <I18nextProvider i18n={i18n}><Enroll/></I18nextProvider>},
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
      { index: true, element: <Home/> },
      { path: "/add", element:<I18nextProvider i18n={i18n}><Enroll/></I18nextProvider> },
      { path: "/major", element: <Major/> },
      { path: "/data", element: <AdminForm /> },
      { path: "/profile", element: <Profile /> },
      {path: "/getMajor", element: <Majortb/>},
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
