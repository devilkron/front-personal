import { useState, useEffect } from "react";
// import useAuth from "../hooks/adminAuth";
import axios from "axios";

export default function adminForm() {
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchs, setSearch] = useState([]);
  const [sTpye, setSType] = useState([]);
  const [input, setInput] = useState({
    search: "",
  });

  useEffect(() => {
    const getStudent = async () => {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:8000/student/enrollment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setStudents(response.data.getS))
        .catch((error) => console.error("student", error));
    };

    const getMajor = async () => {
      axios
        .get("http://localhost:8000/student/major")
        .then((response) => setMajors(response.data.getM))
        .catch((error) => console.error("ไม่สามารถหาข้อมูลจาก Major:", error));
    };

    const getClass = async () => {
      axios
        .get("http://localhost:8000/student/class")
        .then((response) => setClasses(response.data.getC))
        .catch((error) =>
          console.error("ไม่สามารถหาข้อมูลจาก Classes:", error)
        );
    };

    getStudent();
    getMajor();
    getClass();
  }, []);
  // console.log(searchs.major);
  const joinT = students.map((student) => {
    const matchT = classes.find(
      (classItem) => classItem.class_id === student.classId
    );
    const matchTMajor = majors.find(
      (majorItem) => majorItem.major_id === student.majorId
    );

    return {
      ...student,
      class_type: matchT ? matchT.class_type : null,
      major_type: matchTMajor ? matchTMajor.major_type : null,
    };
  });
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlsubmit = async (e) => {
    try {
      e.preventDefault();
      let token = localStorage.getItem("token");
      axios
        .post("http://localhost:8000/student/search", input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setSearch(response.data.getD))
        .catch((error) => console.error("Search", error));
      console.log(searchs);
    } catch (err) {
      next(err);
    }
  };

  if (joinT !== students) {
    return (
      <div className="overflow-x-auto">
        {/* {JSON.stringify(majors)}
        {JSON.stringify(searchs)} */}
        <form onSubmit={hdlsubmit}>
          <label className="input input-bordered flex items-center w-1/2 justify-center mx-auto mt-3">
            <input
              type="text"
              className="grow"
              placeholder=""
              name="search"
              value={input.search}
              onChange={hdlChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </form>

        {students.length !== 0 ? (
          <table className="table mt-5">
            <thead className="text-lg border-4">
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ</th>
                <th>สกุล</th>
                <th>ระดับการศึกษา</th>
                <th>สาขาวิชา</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {searchs.length === 0
                ? joinT.map((std, index) => (
                    <tr
                      key={index}
                      className="hover"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${std.std_id}`)
                          .showModal()
                      }
                    >
                      <td>{std.std_id}</td>
                      <td>{std.std_name}</td>
                      <td>{std.std_lastname}</td>
                      <td>
                        {std.class_type === "SECONDARY2"
                          ? "มัธยมปลาย"
                          : "มัธยมต้น"}
                      </td>
                      <td>{std.major.major_type}</td>
                      <td>{std.status}</td>
                    </tr>
                  ))
                : searchs.map((std, index) => (
                    <tr
                      key={index}
                      className="hover"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${std.std_id}`)
                          .showModal()
                      }
                    >
                      <td>{std.std_id}</td>
                      <td>{std.std_name}</td>
                      <td>{std.std_lastname}</td>
                      <td>
                        {std.class_type === "SECONDARY2"
                          ? "มัธยมปลาย"
                          : "มัธยมต้น"}
                      </td>
                      <td>{std.major.major_type}</td>
                      <td>{std.status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <p className="text-3xl underline text-blue-300">ไม่พบข้อมูล</p>
        )}
        {joinT.map((std, index) => (
          <Modal key={index} student={std} />
        ))}
      </div>
    );
  }
}

const Modal = ({ student }) => {
  const modalId = `my_modal_${student.std_id}`;
  const [editData, setEditData] = useState({
    std_name: student.std_name,
    std_bd: student.std_bd,
    std_lastname: student.std_lastname,
    std_address: student.std_address,
    std_phone: student.std_phone,
    major_type: student.major_type,
    class_type: student.class_type,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setEditData({ ...student });
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    // ทำการบันทึกข้อมูลที่แก้ไขและเปลี่ยนสถานะกลับเป็น false
    setIsEditing(false);
    // console.log(editData)
    try {
      e.stopPropagation();
      const std_id = student.std_id;
      // console.log(std_id)
      const apiUrl = `http://localhost:8000/student/update/${std_id}`;

      await axios.patch(apiUrl, editData);

      alert("แก้ไขสำเร็จ");
      location.reload();
      setIsEditing(false);
      document.getElementById(modalId).close();
      // onEdit();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการแก้ไข", error);
    }
  };
  const handleChange = (e) => {
    setEditData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const hdlDelete = async (std_id) => {
    if (confirm("ต้องการลบข้อมูลหรือไม่") === true) {
      try {
        let token = localStorage.getItem("token");
        const rs = await axios.delete(
          `http://localhost:8000/student/del/${std_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(rs);
        if (rs.status === 200) {
          location.reload();
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  const hdlAGREE = async (e) => {
    if(confirm("ต้องการยืนยันสถานะหรือไม่ ?") ===true){
    try {
     
      e.stopPropagation();
      const agree = {status: "AGREE"}
      const std_id = student.std_id;
      let token = localStorage.getItem("token");
      const rs = await axios.patch(
        `http://localhost:8000/student/upstatus/${std_id}`, agree,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(rs);
      if (rs.status === 200) {
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
    }
  };
  const hdlREJECT = async (e) => {
    if(confirm("ต้องการปฏิเสธสถานะหรือไม่ ?") ===true){
    try {
     
      e.stopPropagation();
      const agree = {status: "REJECT"}
      const std_id = student.std_id;
      let token = localStorage.getItem("token");
      const rs = await axios.patch(
        `http://localhost:8000/student/reject/${std_id}`, agree,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(rs);
      if (rs.status === 200) {
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
    }
  };
  return (
    <dialog id={modalId} className="modal select-none">
      <div className="modal-box">
        <img
          className="w-[250px] mx-auto rounded-md mb-5 pointer-events-none"
          src={student.img_profile}
        />
        <h3 className="font-bold text-lg">
          ชื่อ :{" "}
          {isEditing ? (
            <input
              type="text"
              name="std_name"
              value={editData.std_name}
              onChange={handleChange}
            />
          ) : (
            student.std_name
          )}
        </h3>
        <h3 className="font-bold text-lg">
          สกุล :{" "}
          {isEditing ? (
            <input
              type="text"
              name="std_lastname"
              value={editData.std_lastname}
              onChange={handleChange}
            />
          ) : (
            student.std_lastname
          )}
        </h3>
        {/* เพิ่มส่วนอื่น ๆ ที่ต้องการแก้ไข */}
        <h3 className="font-bold text-lg">
          ที่อยู่ :
          {isEditing ? (
            <input
              type="text"
              name="std_address"
              value={editData.std_address}
              onChange={handleChange}
            ></input>
          ) : (
            student.std_address
          )}
        </h3>
        <h3 className="font-bold text-lg">
          เบอร์ :
          {isEditing ? (
            <input
              type="text "
              name="std_phone"
              value={editData.std_phone}
              onChange={handleChange}
            ></input>
          ) : (
            student.std_phone
          )}
        </h3>
        <h3 className="font-bold text-lg">
          สาขาวิชา :{" "}
          {isEditing ? (
            <input
              type="text "
              name="major_type"
              value={editData.major_type}
              onChange={handleChange}
            ></input>
          ) : (
            student.major_type
          )}
        </h3>
        <h3 className="font-bold text-lg">
          ระดับการศึกษา :
          {isEditing ? (
            <input
              type="text"
              name="class_type"
              value={editData.class_type}
              onChange={handleChange}
            ></input>
          ) : student.class_type === "SECONDARY2" ? (
            "มัธยมปลาย"
          ) : (
            "มัธยมต้น"
          )}
        </h3>
        <h3 className="font-bold text-lg">สถานะ {student.status}</h3>

        <div className="flex justify-end gap-3">
          <button className="btn btn-outline btn-success" onClick={hdlAGREE}>
            ยืนยันสถานะ
          </button>
          <button className="btn btn-outline btn-error" onClick={hdlREJECT}>
            ปฏิเสธ
          </button>
          {isEditing ? (
            <button className="btn btn-success" onClick={handleSaveClick}>
              บันทึก
            </button>
          ) : (
            <button className="btn btn-warning" onClick={handleEditClick}>
              แก้ไข
            </button>
          )}
          <button
            className="btn btn-error"
            onClick={() => {
              hdlDelete(student.std_id);
            }}
          >
            ลบข้อมูล
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => document.getElementById(modalId).close()}>
          Close
        </button>
      </form>
    </dialog>
  );
};
