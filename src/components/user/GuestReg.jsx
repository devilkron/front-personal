import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Inputmask from "react-input-mask";

export default function AdminReg() {
  const [input, setInput] = useState({
    role: "",
    identity: "",
    gender_id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [gender, setGender] = useState([]);
  
  useEffect(() => {
    const getGen = async () => {
      const rs = await axios.get("http://localhost:8000/student/gender");
      setGender(rs.data.getGen);
    };
    getGen();
  }, []);

  const navigate = useNavigate();

  const hdlChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      setInput((prev) => ({ ...prev, role: value }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (input.identity.length < 13) {
      return Swal.fire({
        icon: "error",
        title: "กรุณากรอกรหัสบัตรประชาชนให้ครบ",
      });
    }
    try {
      for (const key in input) {
        if (input.hasOwnProperty(key) && input[key].trim() === "") {
          return Swal.fire({
            icon: "error",
            title: "กรอกข้อมูลให้ครบถ้วน",
          });
        }
      }
      if (input.password !== input.confirmPassword) {
        return Swal.fire({
          icon: "error",
          title: "รหัสผ่านไม่ตรงกัน",
        });
      }
      const { isConfirmed } = await Swal.fire({
        icon: "question",
        title: "ต้องการยืนยันการส่งหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      });

      if (isConfirmed) {
        const rs = await axios.post("http://localhost:8000/auth/register", input);
        if (rs.status === 200) {
          Swal.fire({
            icon: "success",
            text: "สมัครเรียบร้อย",
            timer: 1000,
            showConfirmButton: false,
            width: "500px",
          }).then(() => {
            navigate("/guest");
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <form
        className="max-w-md w-full p-6 bg-sky-200 rounded-lg shadow-lg"
        onSubmit={hdlSubmit}
      >
        <div className="text-center text-2xl mb-6">สมัครเข้าใช้งานระบบ</div>

        <div className="mb-4">
          <div className="text-lg mb-2">เลือกประเภท:</div>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="STUDENT"
                checked={input.role === "STUDENT"}
                onChange={hdlChange}
                className="mr-2"
              />
              นักเรียน
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="PARENT"
                checked={input.role === "PARENT"}
                onChange={hdlChange}
                className="mr-2"
              />
              ผู้ปกครอง
            </label>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2">รหัสบัตรประชาชน</p>
          <Inputmask
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            mask="999-9999-99999-99-9"
            name="identity"
            value={input.identity}
            onChange={hdlChange}
            placeholder="Enter your Identity"
          />
        </div>

        <div className="mb-4">
          <p className="mb-2">คำนำหน้า</p>
          <select
            name="gender_id"
            value={input.gender_id}
            onChange={hdlChange}
            className="select select-bordered w-full text-violet-500"
          >
            <option hidden>เลือกคำนำหน้า</option>
            {gender.map((el) => (
              <option value={el.gender_id} key={el.gender_id}>
                {el.gender_type === "MR" ? "นาย" :
                 el.gender_type === "BOY" ? "ด.ช." :
                 el.gender_type === "GIRL" ? "ด.ญ." :
                 el.gender_type === "MISS" ? "นางสาว" :
                 el.gender_type === "MRS" ? "นาง" :
                 ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <p className="mb-2">ชื่อ</p>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="text"
            name="name"
            value={input.name}
            onChange={hdlChange}
            placeholder="Enter your Name"
          />
        </div>

        <div className="mb-4">
          <p className="mb-2">นามสกุล</p>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={hdlChange}
            placeholder="Enter your Lastname"
          />
        </div>

        <div className="mb-4">
          <p className="mb-2">อีเมล</p>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder="Enter your Email"
          />
        </div>

        <div className="mb-4">
          <p className="mb-2">รหัสผ่าน</p>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="Enter Your Password"
          />
        </div>

        <div className="mb-4">
          <p className="mb-2">ยืนยันรหัสผ่าน</p>
          <input
            className="w-full rounded-md border border-gray-300 bg-white text-violet-500 px-3 py-2"
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
            placeholder="Confirm Your Password"
          />
        </div>  

        <div className="flex justify-center gap-4">
          <input
            type="submit"
            value="SEND"
            className="btn btn-success btn-outline w-32"
          />
          <input
            type="button"
            value="CANCEL"
            className="btn btn-error btn-outline w-32"
            onClick={() => navigate("/guest")}
          />
        </div>
      </form>
    </div>
  );
}
