import React, { useState, useEffect } from "react";
import axios from "axios";

export default function updateDetail() {
  const [students, setStudents] = useState({});
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [update, setUpdate] = useState({
    std_name: "",
    std_bd: "",
    std_lastname: "",
    std_address: "",
    std_phone: "",
    majorId: "",
    class_type: "",
  });
  useEffect(() => {
    const showDT = async () => {
      const std_id = location.pathname.split("/")[2];

      const rs = await axios.get(`http://localhost:8000/user/detail/${std_id}`);
      setStudents(rs.data.showDt);
      //   setUpdate(rs.data.showDt);
      // console.log(rs.data.showDt)
    };
    const getMajor = async () => {
      const rs = await axios.get("http://localhost:8000/student/major");
      setMajors(rs.data.getM);
    };
    const getClass = async () => {
      const rs = await axios.get("http://localhost:8000/student/class");
      setClasses(rs.data.getC);
    };

    getClass();
    getMajor();
    showDT();
  }, []);
  //   console.log(update.std_name);

  const hdlChange = (e) => {
    setStudents((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    // console.log(students)
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();
    const std_id = location.pathname.split("/")[2];
    const rs = await axios.patch(
      `http://localhost:8000/student/update/${std_id}`,
      students
    );
    if (rs.status === 200) {
      alert("แก้ไขสำเร็จ");
    }
  };

  return (
    <div className="container mx-auto max-w-[50rem]">
      <form
        className="bg-slate-500 p-6 rounded-lg shadow-md mt-5"
        onSubmit={hdlSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            รหัสบัตรประชาชน
          </label>
          <input
            type="text"
            name="std_identity"
            value={students.std_identity || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            ชื่อ
          </label>
          <input
            type="text"
            name="std_name"
            value={students.std_name || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            นามสกุล
          </label>
          <input
            type="text"
            name="std_lastname"
            value={students.std_lastname || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            ที่อยู่
          </label>
          <input
            type="text"
            name="std_address"
            value={students.std_address || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            เบอร์โทร
          </label>
          <input
            type="text"
            name="std_phone"
            value={students.std_phone || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="w-full flex flex-row text-white">
        <p className="w-1/2">สาขา</p> <p className="w-1/2 px-2">ระดับการศึกษา</p>
        </div>
        
        <div className="flex flex-row gap-3 w-full">
        <select name="majorId" onChange={hdlChange} className="w-1/2 py-2 rounded-md px-2">
          {majors.map((el, index) => (
            <option value={el.major_id} key={index}>
              {" "}
              {el.major_type === "MATHSCI"
                ? "วิทย์คณิต"
                : el.major_type === "ARTMATH"
                ? "ศิลป์คำนวณ"
                : el.major_type === "ARTENG"
                ? "ศิลป์ภาษา"
                : el.major_type === "ARTSOC"
                ? "ศิลป์สังคม"
                : el.major_type === "ARTFREE"
                ? "ศิลป์ทั่วไป"
                : "ไม่ระบุ"}
            </option>
          ))}
        </select>

        <select name="classId" value={students.classId} onChange={hdlChange} className="w-1/2 py-2 rounded-md px-2">
          {classes.map((el, index) => (
            <option value={el.class_id} key={index}>
              {el.class_type === "SECONDARY2" ? "มัธยมปลาย" : "มัธยมต้น"}
            </option>
          ))}
        </select>
        </div>
        
        <button
          type="submit"
          className="btn  btn-success text-white px-4 py-2 rounded-md mt-3 "
        >
          บันทึก
        </button>
      </form>
    </div>
  );
}
