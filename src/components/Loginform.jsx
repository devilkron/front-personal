import React, { useState } from "react";
import axios from "axios";
import adminAuth from "../hooks/adminAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function loginform() {
  const navigate = useNavigate()
  const { setUser } = adminAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const rs = await axios.post("http://localhost:8000/auth/adminlogin", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      if(rs1.data !== ""){
        Swal.fire({
          title: "Login SUCCESS",
          text: "Login web site",
          icon: "success",
          preConfirm: () => {
            setUser(rs1.data)
          }
        })
      }
      navigate('/')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.Error) {
        Swal.fire({
          icon: 'error',
          title: "huhh...",
          text: `${error.response.data.Error}`
        })
      } else {
        alert(error.Error);
      }
    }
  };
  return (
    <div>
      <form
        className=" max-w-[800px] max-h-[600px] mx-auto mt-5 p-5 bg-sky-200 rounded-lg shadow-lg"
        onSubmit={hdlSubmit}
      >
        
        <div>
          <img
            className="rounded-full mx-auto h-auto max-w-[120px]"
            src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png"
            alt=""
          />
        </div>
        <div>
          <p className="text-center w-[70%] mx-auto my-5 bg-red-300 text-red-600 rounded-md">
            เข้าสู่ระบบไม่ได้ติดต่อ ฝ่ายทะเบียน โรงเรียน
          </p>
        </div>
        <div className=" mx-auto w-1/2">
          <p className="mt-3">Email</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-2"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder="Enter your Email"
          />
          <p className="mt-3">Password</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-2"
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="Enter Your Password"
          />
        </div>

        <div className="mx-auto mt-5 w-1/2">
          <input
            type="submit"
            value="login"
            className="btn btn-success btn-outline w-[150px] mr-10 "
          />
          <input
            type="reset"
            value="BACK"
            className="btn btn-error btn-outline w-[150px] ml-9 "
            onClick={() => window.location.href = '/'}
          />
        </div>
      </form>
    </div>
  );
}
