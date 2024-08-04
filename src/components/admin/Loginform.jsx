import React, { useState } from "react";
import axios from "axios";
import adminAuth from "../../hooks/adminAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginForm() {
  const navigate = useNavigate();
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
          title: "huhh...",
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
        className="max-w-md w-full p-5 bg-sky-200 rounded-lg shadow-lg"
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
          <p className="text-center w-full text-xl mb-5 rounded-md">
            เข้าสู่ระบบไม่ได้ติดต่อ ฝ่ายทะเบียน โรงเรียน
          </p>
        </div>
        <div className="space-y-3">
          <input
            className="w-full rounded-md border-white border bg-white text-violet-500 px-3 py-2"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder="อีเมล"
          />
          <input
            className="w-full rounded-md border-white border bg-white text-violet-500 px-3 py-2"
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="รหัสผ่าน"
          />
        </div>

        <div className="flex justify-center space-x-2 mt-5">
          <input
            type="submit"
            value="Login"
            className="btn btn-success btn-outline w-24"
          />
          <input
            type="reset"
            value="BACK"
            className="btn btn-error btn-outline w-24"
            onClick={() => window.location.href = '/'}
          />
        </div>
      </form>
    </div>
  );
}
