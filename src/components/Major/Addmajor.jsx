import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Majortb from "./Majortb";

function Addmajor() {
  const [input, setInput] = useState({
    major_type: "",
  });
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(null);
  const majorRef = useRef(null);

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
        const url = edit
          ? `http://localhost:8000/student/updatemajor/${edit.major_id} `
          : "http://localhost:8000/student/addmajor";
        const method = edit ? "patch" : "post";
        const rs = await axios[method](url, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (rs.status === 200) {
          toast.success(edit ? "แก้ไขสาขาเรียบร้อย" : "เพิ่มสาขาเรียบร้อย");
          setInput({ major_type: "" });
          setReload(!reload);
          setEdit(null);
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.response.data.message,
      });
      // if (err.response.data.message === "มีสาขานี้อยู่แล้ว") {
      //   if (majorRef.current) {
      //     majorRef.current.focus();
      //   }
      // }
    }
  };

  const hdlChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const hdlEdit = (major) => {
    setInput({ major_type: major.major_type });
    setEdit(major);
  };

  const hdlReset = () => {
    setInput({ major_type: "" });
    setEdit(null);
  };

  return (
    <div>
      {/* <form
        className="max-w-[300px] bg-sky-200 max-h-[1000px] mx-auto mt-5 p-5 rounded-lg"
        onSubmit={hdlSubmit}
      >
        <div className="flex justify-center text-2xl text-gray-400">
          {edit ? "แก้ไขสาขาวิชา" : "เพิ่มสาขาวิชา"}
        </div>
        <div className="mx-auto w-10/12">
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
        </div> */}
        {/* <div className="flex justify-between">
          <button
            type="submit"
            className="mx-auto flex items-center justify-center p-0.5 mt-2 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 "
          >
            <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {edit ? "แก้ไขสาขาวิชา" : "เพิ่มสาขาวิชา"}
            </span>
          </button>
          <button
            type="button"
            className="mx-auto flex items-center justify-center p-0.5 mt-2 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-200 via-blue-300 to-green-200 group-hover:from-blue-200 group-hover:via-blue-300 group-hover:to-green-200 dark:text-white dark:hover:text-gray-900 "
            onClick={hdlReset}
          >
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              รีเซ็ต
            </span>
          </button>
        </div> */}

        <div className="flex flex-col  items-center justify-center h-screen dark">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              {edit ? "แก้ไขสาขาวิชา" : "เพิ่มสาขาวิชา"}
            </h2>
            <form className="flex flex-col " onSubmit={hdlSubmit}>
              <input
                placeholder="ชื่อสาขา"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="major_type"
                value={input.major_type}
                onChange={hdlChange}
              />
              <button
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <div className="flex justify-center mt-4">
            <button
            type="button"
            className="mx-auto flex items-center justify-center p-0.5 mt-2 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-200 via-blue-300 to-green-200 group-hover:from-blue-200 group-hover:via-blue-300 group-hover:to-green-200 dark:text-white dark:hover:text-gray-900 "
            onClick={hdlReset}
          >
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              รีเซ็ต
            </span>
          </button>
            </div>
          </div>
        </div>
      {/* </form> */}
      <div>
        <div className="text-center mt-5 text-4xl">รายชื่อสาขา</div>
        <Majortb reload={reload} onEdit={hdlEdit} />
      </div>
    </div>
  );
}

export default Addmajor;
