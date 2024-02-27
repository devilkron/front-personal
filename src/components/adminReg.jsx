import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function studentReg() {
  const [input, setInput] = useState({
    std_identity: "",
    std_name: "",
    std_lastname: "",
    std_bd: "",
    std_address: "",
    std_phone: "",
    std_email: "",
    status: "W8",
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

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();

    try {
      const file = fileinput.current?.files[0];
      const formData = new FormData();
      console.log(file);
      if(!file ){
        return alert("กรุณาแนบรูปภาพ")
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
        alert("Create user success");
        location.reload();
      }
      console.log(rs);
    } catch (err) {
      alert(err.message);
    }
  };
  // console.log(input.major_type)
  const HdlReset = () => {
    setInput({});
  };

  return (
    <div>
      <form
        className=" max-w-[800px] max-h-[1400px] mx-auto mt-5  p-5 bg-sky-200 rounded-lg shadow-lg"
        onSubmit={hdlSubmit}
      >
        <div className="flex justify-center text-2xl">กรอกแบบฟอร์มสมัครสอบ</div>
        <div className=" mx-auto w-1/2">
          <div className="flex gap-2 mt-3">
            <p className="mt-3 text-xl">Major:</p>
            <select
              name="majorId"
              className="select select-bordered w-full max-w-xs text-violet-500"
              onChange={hdlChange}
              value={input.majorId}
            >
              <option hidden>วิชาเอก</option>
              {major.map((el) => (
                <option key={el.major_id} value={el.major_id}>
                  {el.major_type}
                </option>
              ))}
            </select>

            <p className="mt-3 text-xl">Class:</p>
            <select
              name="classId"
              className="select select-bordered w-full max-w-xs text-violet-500"
              onChange={hdlChange}
              value={input.classId}
            >
              <option hidden>ระดับชั้น</option>
              {Class.map((el) => (
                <option key={el.class_id} value={el.class_id}>
                  {el.class_type}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3">รหัสบัตรประชาชน</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="std_identity"
            value={input.std_identity}
            onChange={hdlChange}
            placeholder="Enter your ID Card"
          />
          <p className="mt-3">Name</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="std_name"
            value={input.std_name}
            onChange={hdlChange}
            placeholder="Enter Your Name"
          />
          <p className="mt-3">Lastname</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="std_lastname"
            value={input.std_lastname}
            onChange={hdlChange}
            placeholder="Enter Your Lastname"
          />
          <p className="mt-3">Birthday</p>
          <input
            className=" rounded-md border-white border bg-white  w-full mt-3 px-3"
            type="Date"
            name="std_bd"
            value={input.std_bd}
            onChange={hdlChange}
          />

          <p className="mt-3">Address</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="std_address"
            value={input.std_address}
            onChange={hdlChange}
            placeholder="Enter Your Address"
          />
          <p className="mt-3">Phone</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="std_phone"
            value={input.std_phone}
            onChange={hdlChange}
            placeholder="Enter Your Phone"
          />
          <p className="mt-3">Email</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
            type="text"
            name="std_email"
            value={input.std_email}
            onChange={hdlChange}
            placeholder="Enter Your Email"
          />

          <p className="mt-3">รูปภาพ</p>
          <input
            className=" rounded-md border-white border bg-white text-violet-500  w-full mt-3"
            type="file"
            name="img_profile"
            ref={fileinput}
            accept="image/*"
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
            value="RESET"
            className="btn btn-warning btn-outline w-[150px] ml-9"
            onClick={HdlReset}
          />
        </div>
      </form>
    </div>
  );
}
