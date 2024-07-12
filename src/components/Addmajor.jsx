import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Majortb from "./Majortb";

function Addmajor() {
  const [input, setInput] = useState({
    major_type: "",
  });
  const [reload, setReload] = useState(false);
  const hdlSubmit = async (e) => {
    e.preventDefault();

    try {
      const { isConfirmed } = await Swal.fire({
        icon: "question",
        title: "ต้องการยืนยันการส่งหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      });

      if (isConfirmed) {
        if (!input.major_type) {
          toast.warning("กรุณากรอกชื่อสาขาด้วยครับ");
          return;
        }

        const token = localStorage.getItem("token");
        const rs = await axios.post(
          "http://localhost:8000/student/addmajor",
          input,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (rs.status === 200) {
          toast.success("เพิ่มสาขาเรียบร้อย");
          setInput({ major_type: "" });
          setReload(!reload);
          
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.response.data.message,
      });
    }
  };

  const hdlChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form
        className="max-w-[300px] bg-sky-200 max-h-[1000px] mx-auto mt-5 p-5 rounded-lg"
        onSubmit={hdlSubmit}
      >
        <div className="flex justify-center text-2xl text-gray-400">
          เพิ่มสาขาวิชา
        </div>
        <div className="mx-auto w-1/2">
          <div className="mt-3">
            <input
              type="text"
              placeholder="ชื่อสาขา"
              className="rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
              name="major_type"
              value={input.major_type}
              onChange={hdlChange}
            />
          </div>
        </div>
        <div>
         
          <button
            type="submit"
            className="mx-auto flex items-center justify-center p-0.5 mt-2 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            
          >
            <span  className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" >
              เพิ่มสาขาวิชา
            </span>
          </button>
        </div>
      </form>
      <div>
        <div className="text-center mt-5 text-4xl">

        รายชื่อสาขา
        </div>
        <Majortb reload={reload}/>
      </div>
    </div>
  );
}

export default Addmajor;
