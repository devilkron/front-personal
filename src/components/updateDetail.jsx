import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Inputmask from "react-input-mask";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function updateDetail() {
  const [students, setStudents] = useState({});
  const [phone, setPhone] = useState("");
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [gender, setGender] = useState([]);
  const [nationality, setNationality] = useState([]);
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    std_name: "",
    std_bd: "",
    std_lastname: "",
    std_address: "",
    std_phone: "",
    majorId: "",
    class_type: "",
  });
  const phoneInputRef = useRef();
  useEffect(() => {
    const showDT = async () => {
      const std_id = location.pathname.split("/")[2];

      const rs = await axios.get(`http://localhost:8000/user/detail/${std_id}`);
      setStudents(rs.data.showDt);
      //   setUpdate(rs.data.showDt);
      // console.log(rs.data.showDt)
    };
    const getGender = async () => {
      const rs = await axios.get("http://localhost:8000/student/gender");
      setGender(rs.data.getGen);
    };
    const getMajor = async () => {
      const rs = await axios.get("http://localhost:8000/student/major");
      setMajors(rs.data.getM);
    };
    const getClass = async () => {
      const rs = await axios.get("http://localhost:8000/student/class");
      setClasses(rs.data.getC);
    };
    const getNation = async () => {
      const rs = await axios.get("http://localhost:8000/student/nation");
      setNationality(rs.data.getNation);
    };
    getNation();
    getGender();
    getClass();
    getMajor();
    showDT();
  }, []);
  //   console.log(update.std_name);

  const hdlChange = (e, value) => {
    if (e.target.name === "std_phone") {
      setPhone(value);
      setStudents((prev) => ({ ...prev, [e.target.name]: value }));
    } else {
      setStudents((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    }
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
      Swal.fire({
        icon: "success",
        text: " แก้ไขสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
        width: "500px",
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="container mx-auto max-w-[50rem] ">
      <form
        className="bg-slate-500 p-6 rounded-lg shadow-md mt-5"
        onSubmit={hdlSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            ปีการศึกษา
          </label>
          <select
            name="std_yearIn"
            value={students.std_yearIn}
            onChange={hdlChange}
            className="select select-bordered w-1/4 max-w-xs  "
          >
            <option hidden>ปีการศึกษา</option>
            <option value="2567">2567</option>
            <option value="2568">2568</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            รหัสบัตรประชาชน / Passport
          </label>
          {students.std_identity?.length >= 13 ? (
            <Inputmask
              mask="9-9999-99999-99-9"
              name="std_identity"
              value={students.std_identity || ""}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          ) : (
            <input
              type="text"
              name="std_identity"
              value={students.std_identity || ""}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          )}
         
        </div>
        <div className="w-full flex flex-row text-white">
          <p className="w-1/2">คำนำหน้า</p>
        </div>

        <div className="flex flex-row gap-3 w-full">
          <select
            name="gender_id"
            value={students.gender_id}
            onChange={hdlChange}
            className="w-36 py-2 rounded-md px-2 mb-2"
          >
            {gender.map((el, index) => (
              <option value={el.gender_id} key={index}>
                {el.gender_type === "MISS"
                  ? "นางสาว"
                  : el.gender_type === "GIRL"
                  ? "ด.ญ."
                  : el.gender_type === "MRS"
                  ? "นาง"
                  : el.gender_type === "BOY"
                  ? "ด.ช."
                  : el.gender_type === "MR"
                  ? "นาย"
                  : el.gender_type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white">ชื่อ</label>
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
            ชื่อ(อังกฤษ)
          </label>
          <input
            type="text"
            name="std_nameEN"
            value={students.std_nameEN || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            นามสกุล(อังกฤษ)
          </label>
          <input
            type="text"
            name="std_lastnameEN"
            value={students.std_lastnameEN || ""}
            onChange={hdlChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="w-full flex flex-row text-white">
          <p className="w-1/2">สัญชาติ</p>
        </div>

        <div className="flex flex-row gap-3 w-full">
          <select
            name="nation_id"
            value={students.nation_id}
            onChange={hdlChange}
            className="w-36 py-2 rounded-md px-2 mb-2 "
          >
            {nationality.map((el, index) => (
              <option value={el.nation_id} key={index}>
                {el.nation_name}
              </option>
            ))}
          </select>
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
          <PhoneInput
            // country={"th"}
            // name="std_phone"
            ref={phoneInputRef}
            value={students.std_phone || ""}
            onChange={(value) => {
              setPhone(value);
              hdlChange({ target: { name: "std_phone" } }, value);
            }}
            className="w-full number"
          />
        </div>
        <div className="w-full flex flex-row text-white">
          <p className="w-1/2">สาขา</p>{" "}
          <p className="w-1/2 px-2">ระดับการศึกษา</p>
        </div>

        <div className="flex flex-row gap-3 w-full">
          <select
            name="majorId"
            value={students.majorId}
            onChange={hdlChange}
            className="w-1/2 py-2 rounded-md px-2"
          >
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
                  : el.major_type}
              </option>
            ))}
          </select>

          <select
            name="classId"
            value={students.classId}
            onChange={hdlChange}
            className="w-1/2 py-2 rounded-md px-2"
          >
            {classes.map((el, index) => (
              <option value={el.class_id} key={index}>
                {el.class_type === "SECONDARY2" ? "ม.4" : "ม.1"}
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
