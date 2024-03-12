import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function adminReg() {
  const [input, setInput] = useState({
    identity: "",
    name : "",
    lastname : "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();
    if(input.identity.length < 13){
      return alert("กรุณากรอกรหัสบัตรประชาชนให้ครบ")
    }
    try {
      
      //เช็คค่าว่าง
      for (const key in input) {
        if (input.hasOwnProperty(key) && input[key].trim() === "") {
          return Swal.fire({
            icon: "error",
            title: "กรอกข้อมูลให้ครบถ้วน",
          });
        }
      }
      //รหัสผ่านไม่ตรง
      if (input.password !== input.confirmPassword) {
        return Swal.fire({
          icon: "error",
          title: "รหัสผ่านไม่ตรงกัน",
        });
      }
      //ถามก่อนส่ง
      const { isConfirmed } = await Swal.fire({
        icon: "question",
        title: "ต้องการยืนยันการส่งหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      });

      if (isConfirmed) {
        // console.log(typeof input.password)
        const rs = await axios.post("http://localhost:8000/auth/register", input);
        if (rs.status === 200) {
          // alert("SUCCESS")
          Swal.fire({
            icon: "success",
            text: " สมัครเรียบร้อย",
            timer: 1000,
            showConfirmButton: false,
            width: '500px'
            
          }
          
          ).then(()=> {
            location.reload()
          })
            
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
    
    <div>
      <form
        className=" max-w-[800px] max-h-[600px] mx-auto mt-5 p-5 bg-sky-200 rounded-lg shadow-lg"
        onSubmit={hdlSubmit}
      >
        
        <div className="flex justify-center text-2xl">Account ชั่วคราว</div>
        <div className=" mx-auto w-1/2">
          <p className="mt-3">รหัสบัตรประชาชน</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="identity"
            value={input.identity}
            onChange={hdlChange}
            placeholder="Enter your Identity"
          />
          <p className="mt-3">Name</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="name"
            value={input.name}
            onChange={hdlChange}
            placeholder="Enter your Name"
          />
         
          <p className="mt-3">Lastname</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={hdlChange}
            placeholder="Enter your Lastname"
          />
          <p className="mt-3">Email</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="email"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder="Enter your Email"
          />
         
          <p className="mt-3">Password</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3  px-3"
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="Enter Your Password"
          />

          <p className="mt-3">Confirm password</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3  px-3"
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
            placeholder="Enter Your Confirm password"
          />
        </div>

        <div className="mx-auto mt-5 w-1/2">
          <input
            type="submit"
            value="SEND"
            className="btn btn-success btn-outline w-[150px] mr-10 "
          />
          <input
            type="button"
            value="CANCEL"
            className="btn btn-error btn-outline w-[150px] ml-9"
            onClick={() => window.location.href = '/guest'}
          />
        </div>
      </form>
    </div>
  );
}
