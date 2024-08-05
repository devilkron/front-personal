import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/adminAuth";
import { useEffect, useRef, useState } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";

const adminNav = [
  { to: "/", text: "หน้าหลัก" },
  {to:"/data", text: "ข้อมูล"},
  { to: "/add", text: "กรอกข้อมูลผู้สมัคร" },
  { to: "/major", text: "เพิ่มแผนการเรียน" },

];
const guestNav = [
  { to: "/", text: "ข้อมูลผู้สมัคร" },
  { to: "/add", text: "กรอกข้อมูลผู้สมัคร" },
];
// console.log(user?.gender_id)
export default function Header() {
  const { user, logout, setTheme } = useAuth();
  const finnalNav = user?.user_role === "ADMIN" ? adminNav : guestNav;

  const navigate = useNavigate();
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);

  const hdlLogout = () => {
    logout();
    navigate("/");
  };
  // useEffect(() => {

  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  // const handleDropdownButtonClick = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  return (
    <div className="navbar bg-gradient-to-l from-blue-700 from-30%  to-pink-500 to-70%  justify-end">
      <div className="flex-1">
        <Link to={'/profile'}>
          <p className="btn btn-ghost text-xl text-white">
            Hello,{user.gender?.gender_type ==="BOY" ? "ด.ช." :user.gender?.gender_type === "MR" ? "นาย" : user.gender?.gender_type === "GIRL" ? "ด.ญ." : user.gender?.gender_type ==="MISS" ?"นางสาว" : user.gender?.gender_type === "MRS" ? "นาง" : user.gender?.gender_type} {user?.user_id ? user.user_name : "Guest"}
          </p>
        </Link>
      </div>
      <div className="">
        <ul className="menu menu-horizontal px-1 gap-3">
          {finnalNav.map((el) => (
            
              <Link className="text-[16px] px-4 rounded-lg  text-white hover:bg-slate-300 py-3 active:scale-95 transform ease-in-out active:text-black hover:text-black flex items-center justify-end" key={el.to} to={el.to}>{el.text}</Link>
           
          ))}
          {user?.user_id && (
            <li >
              <Link className="text-[16px] border-2 border-[rgb(239_76_83)] text-red-500 py-3 hover:bg-red-500 hover:text-black active:scale-95 transform ease-in-out active:text-black" to="#" onClick={hdlLogout}>
                ออกจากระบบ
              </Link>
            </li>
          )}

          
        </ul>
      </div>

      {/* <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleDropdownButtonClick}
          aria-expanded={dropdownOpen ? "true" : "false"} 
        >
          เมนู{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      
        {dropdownOpen && ( // ใช้เงื่อนไขเพื่อแสดง dropdown เมื่อ dropdownOpen เป็น true
          <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute  top-14 right-1">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>Bonnie Green</div>
              <div className="font-medium truncate">name@flowbite.com</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
