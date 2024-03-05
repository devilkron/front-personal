import axios from "axios";
import { useEffect, useState, useRef } from "react";
import adminAuth from "../hooks/adminAuth";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
export default function studentReg() {
  // console.log(fileinput.current.files[0])
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState({
    std_identity: "",
    std_name: "",
    std_lastname: "",
    std_bd: "",
    std_address: "",
    std_phone: phone ? phone : "1234567890",
    std_email: "",
    status: "W8",
    img_profile: "",
    majorId: "",
    classId: "",
  });

  const fileinput = useRef(null);
  const [major, setMajor] = useState([]);
  useEffect(() => {
    const getMajor = async () => {
      const rs = await axios.get("http://localhost:8000/student/major");
      //   console.log(rs.data)
      setMajor(rs.data.getM);
    };
    getMajor();
  }, []);

  const [Class, setClass] = useState([]);
  useEffect(() => {
    const getClass = async () => {
      const rs = await axios.get("http://localhost:8000/student/class");
      setClass(rs.data.getC);
    };
    getClass();
  }, []);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudent = async () => {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:8000/student/enrollment", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setStudents(response.data.getS))
        .catch((error) => console.error("Error student", error));
    };
    getStudent();
  }, []);
  const joinT = students.map((student) => {
    const matchT = Class.find(
      (classItem) => classItem.class_id === student.classId
    );
    const matchTMajor = major.find(
      (majorItem) => majorItem.major_id === student.majorId
    );
    // console.log(admin);
    return {
      ...student,
      class_type: matchT ? matchT.class_type : null,
      major_type: matchTMajor ? matchTMajor.major_type : null,
    };
  });

  // const hdlChange = (e) => {
  //   setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  // };

  const hdlChange = (e, value) => {
    if (e.target.name === "std_phone") {
      setPhone(value);
      setInput((prev) => ({ ...prev, [e.target.name]: value }));
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    console.log(input);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    // console.log(input.std_phone.length)
    if (input.std_phone.length < 10) {
      return alert("กรอกเบอร์โทรศัพท์ให้ครบ");
    }

    if (input.std_identity.length < 13) {
      return alert("กรอกรหัสบัตรประชาชนให้ครบ");
    }

    try {
      const file = fileinput.current?.files[0];
      const formData = new FormData();
      // console.log(file);
      if (!file) {
        return alert("กรุณาแนบรูปภาพ");
      }
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) {
        formData.append("image", file);
      }

      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://localhost:8000/student/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (rs.status === 200) {
        Swal.fire({
          icon: "success",
          text: " ขอให้โชคดีกับการสอบ",
          timer: 1500,
          showConfirmButton: false,
          width: "500px",
        }).then(() => {
          location.reload();
        });
      }
      // console.log(rs);
    } catch (err) {
      alert(err.message);
    }
  };
  // console.log(input.major_type)
  const HdlReset = (e) => {
    setInput({
      std_identity: "",
      std_name: "",
      std_lastname: "",
      std_bd: "",
      std_address: "",
      std_phone: "",
      std_email: "",
      status: "W8",
      img_profile: "",
      majorId: "",
      classId: "",
    });
    if (fileinput.current) {
      fileinput.current.value = "";
    }
  };

  return (
    <div className="bg-[url(https://img.freepik.com/free-vector/back-school-background-flat-design_23-2148596550.jpg)] h-screen ">
      <div className="backdrop-blur-sm h-screen py-20">
        <form
          className=" max-w-[800px] max-h-[1400px] mx-auto  p-5 bg-sky-300 rounded-lg drop-shadow-2xl"
          onSubmit={hdlSubmit}
        >
          {/* bg-[url(https://img.freepik.com/free-vector/back-school-background-flat-design_23-2148596550.jpg)] */}
          <div className="flex justify-center text-2xl">
            กรอกแบบฟอร์มสมัครสอบ
          </div>
          <div className=" mx-auto  w-full">
            <div className="flex gap-2 mt-3 w-3/4 mx-auto">
              <p className="mt-3 text-xl">สาขา:</p>
              <select
                name="majorId"
                className="select select-bordered w-full max-w-xs text-violet-500"
                onChange={hdlChange}
                value={input.majorId}
              >
                <option hidden>วิชาเอก</option>
                {major.map((el) => {
                  const majorMapping = {
                    MATHSCI: "วิทย์คณิต",
                    ARTMATH: "ศิลป์คำนวณ",
                    ARTENG: "ศิลป์อังกฤษ",
                    ARTSOC: "ศิลป์สังคม",
                    ARTFREE: "ศิลป์ทั่วไป",
                  };

                  return (
                    <option key={el.major_id} value={el.major_id}>
                      {majorMapping[el.major_type] || el.major_type}
                    </option>
                  );
                })}
              </select>

              <p className="mt-3 text-xl">ระดับ:</p>
              <select
                name="classId"
                className="select select-bordered w-full max-w-xs text-violet-500"
                onChange={hdlChange}
                value={input.classId}
              >
                <option hidden>ระดับชั้น</option>
                {Class.map((el) => (
                  <option key={el.class_id} value={el.class_id}>
                    {el.class_type === "SECONDARY1"
                      ? "มัธยมต้น"
                      : el.class_type === "SECONDARY2"
                      ? "มัธยมปลาย"
                      : el.class_type}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-2/3 mt-3">
              <input
                className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
                type="text"
                name="std_identity"
                value={input.std_identity}
                onChange={hdlChange}
                placeholder="รหัสบัตรประชาชน"
              />
            </div>
            <div className="flex gap-2  ">
              {" "}
              <input
                className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
                type="text"
                name="std_name"
                value={input.std_name}
                onChange={hdlChange}
                placeholder="ชื่อ"
              />
              <input
                className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
                type="text"
                name="std_lastname"
                value={input.std_lastname}
                onChange={hdlChange}
                placeholder="นามสกุล"
              />
              <input
                className=" rounded-md border-white border bg-white  w-full mt-3 px-3"
                type="Date"
                name="std_bd"
                value={input.std_bd}
                onChange={hdlChange}
              />
            </div>

            <div className="flex gap-2">
              <input
                className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
                type="text"
                name="std_address"
                value={input.std_address}
                onChange={hdlChange}
                placeholder="ที่อยู่"
              />
              {/* <p className="mt-3">Phone</p> */}
              <PhoneInput
                className=" rounded-md  text-violet-500 w-full mt-3 px-3 number"
                country={"th"}
                // name="std_phone"
                value={phone}
                onChange={(value) => hdlChange({ target: { name: "std_phone" } }, value)}
              />
            </div>

            {/* <p className="mt-3">Email</p> */}
            <input
              className=" rounded-md border-white border bg-white text-violet-500 w-2/3 mt-3 px-3 "
              type="text"
              name="std_email"
              value={input.std_email}
              onChange={hdlChange}
              placeholder="Email"
            />
            <div className="flex gap-2 ">
              <p className="mt-3 text-xl">รูปถ่ายขนาด 2 นิ้ว</p>
              <input
                className=" rounded-md  bg-white mt-3 px-2 w-60"
                type="file"
                accept="image/*"
                ref={fileinput}
                name="img_profile"
              />
            </div>
          </div>

          <div className="mx-auto mt-5 w-1/2">
            <input
              type="submit"
              value="SEND"
              className="btn btn-success btn-outline w-[150px] mr-10 "
            />
            <input
              type="button"
              value="RESET"
              className="btn btn-warning btn-outline w-[150px] ml-9"
              onClick={HdlReset}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
