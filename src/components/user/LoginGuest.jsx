import React, { useState } from "react";
import axios from "axios";
import userAuth from "../../hooks/adminAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = userAuth();
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

      const rs = await axios.post("http://localhost:8000/auth/login", input);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      if (rs1.data !== "") {
        Swal.fire({
          title: "Login SUCCESS",
          text: "Login web site",
          icon: "success",
          preConfirm: () => {
            setUser(rs1.data);
          }
        });
      }
      navigate('/'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.Error) {
        Swal.fire({
          icon: 'error',
          title: "เกิดข้อผิดพลาด",
          text: `${error.response.data.Error}`
        });
      } else {
        alert(error.Error);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="max-w-md w-full p-5 bg-fuchsia-200 rounded-lg shadow-lg"
        onSubmit={hdlSubmit}
      >
        <div className="flex justify-center mb-5">
          <img
            className="rounded-full h-24"
            src="https://img.freepik.com/free-vector/hand-drawn-high-school-logo-template_23-2149689290.jpg"
            alt="School Logo"
          />
        </div>
        <div>
          <p className="text-center text-xl mb-5 bg-red-300 text-red-600 rounded-md p-3">
            สมัครสมาชิกเพื่อเข้าใช้ระบบ ลงทะเบียนเรียน
          </p>
        </div>
        <div className="space-y-3">
          <label className="block text-gray-700">อีเมล</label>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder="Umail@mail.com"
          />
          <label className="block text-gray-700">รหัสผ่าน</label>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="***************"
          />
        </div>

        <div className="flex justify-center space-x-4 mt-5">
          <input
            type="submit"
            value="Login"
            className="btn btn-success btn-outline w-32"
          />
          <Link to='/account'>
            <input
              type="reset"
              value="Register"
              className="btn btn-warning btn-outline w-32"
            />
          </Link>
        </div>

        <div className="flex justify-end mt-3">
          <Link to="/แบบฟอร์มสมัครสอบ.pdf" target="_blank" download className="underline text-blue-600">
            Download แบบฟอร์ม
          </Link>
        
        </div>
      </form>
    </div>
  );
}
