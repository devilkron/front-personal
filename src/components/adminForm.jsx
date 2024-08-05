import { useState, useEffect, useContext } from "react";
// import useAuth from "../hooks/adminAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Search() {
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState([]);
  const [nation, setNation] = useState([]);
  const [reload, setLoad] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [skipstudent, setSkipstudent] = useState(0);
  const [cls, setCls] = useState("");

  useEffect(() => {
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
    const getGen = async () => {
      axios
        .get("http://localhost:8000/student/gender")
        .then((response) => setGender(response.data.getGen))
        .catch((error) => console.error("เพศไม่มี", error));
    };
    const getNtn = async () => {
      axios
        .get("http://localhost:8000/student/nation")
        .then((response) => setNation(response.data.getNation))
        .catch((error) => console.error("หาประเทศไม่เจอ", error));
    };
    getNtn();
    getGen();
    // getStudent();
    getMajor();
    getClass();
  }, [skipstudent, reload]);

  const hdlChangeLimit = (e) => {
    setLimit(e.target.value);
  };

  let timeout = null;
  const hdlSearch = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 1000);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setSkipstudent((prevSkip) => prevSkip + 10);
  };

  const backPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setSkipstudent((prevSkip) => prevSkip - 10);
    }
  };

  const handleClassChange = (e) => {
    setCls(e.target.value);

    // console.log(cls)
  };

  useEffect(() => {
    const searchUser = async () => {
      let token = localStorage.getItem("token");
      try {
        const rs = await axios.get(
          `http://localhost:8000/student/search/std?page=${page}&name=${search}&grade=${cls}`,
          {
            params: {
              search: search || "",
              page: 1,
              limit: limit || 10,
              cls: cls || "",
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(rs)
        if (rs.status === 200) {
          setStudents(rs.data.getD);
        }
      } catch (err) {
        // console.error(err.response.data.message);
        toast.warning(err.response.data.Error);
      }
    };
    searchUser();
  }, [reload, limit, search, page, cls]);

  // console.log(search);
  // console.log(skipstudent)
  if (students !== 0) {
    return (
      <div className="overflow-x-auto h-screen">
        <div className=" flex flex-row gap-2">
          <select
            className="mt-3 select select-bordered max-w-xs text-violet-500"
            name="limit"
            onChange={hdlChangeLimit}
            value={limit}
          >
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <label className="input input-bordered flex items-center w-1/2 justify-center mx-auto mt-3">
            <input
              type="text"
              className="grow bg-transparent"
              placeholder=""
              name="search"
              onChange={hdlSearch}
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
          <select
            name="select"
            className="mt-3 select select-bordered w-1/4 max-w-xs text-violet-500"
            onChange={hdlSearch}
          >
            <option hidden>ปีการศึกษา</option>
            <option value="">ดูทั้งหมด</option>
            <option value="2567">2567</option>
            <option value="2568">2568</option>
          </select>
          <select
            name="select"
            className="mt-3 select select-bordered w-1/4 max-w-xs text-violet-500"
            onChange={handleClassChange}
          >
            <option hidden>ระดับชั้น</option>
            <option value="">ดูทั้งหมด</option>
            {classes.map((el) => (
              <option key={el.class_id} value={el.class_id}>
                {el.class_type === "SECONDARY1"
                  ? "ม.1"
                  : el.class_type === "SECONDARY2"
                  ? "ม.4"
                  : el.class_type}
              </option>
            ))}
          </select>
        </div>

        {students && (
          <table className="table mt-5 text-center  ">
            <thead className="text-xl ">
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ - สกุล</th>
                <th>โรงเรียน</th>
                <th>ระดับ</th>
                <th>แผนการเรียน</th>
                <th>ปีการศึกษา</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer">
              {search.length === 0
                ? students.map((std) => (
                    <tr
                      key={std.std_id}
                      className="hover"
                      onClick={
                        () =>
                          document
                            .getElementById(`my_modal_${std.std_id}`)
                            .showModal()
                        // alert(JSON.stringify(std))
                      }
                    >
                      <td>{std.std_id}</td>
                      <td>
                        {std.gender?.gender_type === "MR"
                          ? "นาย"
                          : std.gender?.gender_type === "BOY"
                          ? "ด.ช."
                          : std.gender?.gender_type === "MRS"
                          ? "นาง"
                          : std.gender?.gender_type === "MISS"
                          ? "นางสาว"
                          : std.gender?.gender_type === "GIRL"
                          ? "ด.ญ."
                          : std.gender?.gender_type}{" "}
                        {std.std_name} {std.std_lastname}
                        <div className="opacity-50">
                          {std.gender?.gender_type === "BOY"
                            ? "MSRT"
                            : std.gender?.gender_type === "GIRL"
                            ? "MISS"
                            : std.gender?.gender_type}{" "}
                          {std.std_nameEN} {std.std_lastnameEN}
                        </div>
                      </td>
                      <td>{std.std_school}</td>
                      <td>
                        {std.class.class_type === "SECONDARY2" ? "ม.4" : "ม.1"}
                      </td>
                      <td>
                        {std.major.major_type === "MATHSCI"
                          ? "วิทย์คณิต"
                          : std.major.major_type === "ARTMATH"
                          ? "ศิลป์คำนวณ"
                          : std.major.major_type === "ARTENG"
                          ? "ศิลป์ภาษา"
                          : std.major.major_type === "ARTSOC"
                          ? "ศิลป์สังคม"
                          : std.major.major_type === "ARTFREE"
                          ? "ศิลป์ทั่วไป"
                          : std.major.major_type}
                      </td>
                      <td>{std.std_yearIn}</td>
                      <td>
                        {std.status === "W8"
                          ? "รอยืนยัน"
                          : std.status === "AGREE"
                          ? "ยอมรับ"
                          : std.status === "REJECT"
                          ? "ปฏิเสธ"
                          : std.status}
                      </td>
                    </tr>
                  ))
                : students.map((std, index) => (
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
                      <td>
                        {std.gender?.gender_type === "MR"
                          ? "นาย"
                          : std.gender?.gender_type === "BOY"
                          ? "ด.ช."
                          : std.gender?.gender_type === "MRS"
                          ? "นาง"
                          : std.gender?.gender_type === "MISS"
                          ? "นางสาว"
                          : std.gender?.gender_type === "GIRL"
                          ? "ด.ญ."
                          : std.gender?.gender_type}{" "}
                        {std.std_name} {std.std_lastname}
                        <div className="opacity-50">
                          {std.gender?.gender_type === "BOY"
                            ? "MSRT"
                            : std.gender?.gender_type === "GIRL"
                            ? "MISS"
                            : std.gender?.gender_type}{" "}
                          {std.std_nameEN} {std.std_lastnameEN}
                        </div>
                      </td>
                      <td>{std.std_school}</td>
                      <td>
                        {std.class.class_type === "SECONDARY2" ? "ม.4" : "ม.1"}
                      </td>
                      <td>
                        {std.major.major_type === "MATHSCI"
                          ? "วิทย์คณิต"
                          : std.major.major_type === "ARTMATH"
                          ? "ศิลป์คำนวณ"
                          : std.major.major_type === "ARTENG"
                          ? "ศิลป์ภาษา"
                          : std.major.major_type === "ARTSOC"
                          ? "ศิลป์สังคม"
                          : std.major.major_type === "ARTFREE"
                          ? "ศิลป์ทั่วไป"
                          : std.major.major_type}
                      </td>
                      <td>{std.std_yearIn}</td>
                      <td>
                        {std.status === "W8"
                          ? "รอยืนยัน"
                          : std.status === "AGREE"
                          ? "ยอมรับ"
                          : std.status === "REJECT"
                          ? "ปฏิเสธ"
                          : std.status}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
        <div className="gap-2 flex flex-row float-right">
          {page === 1 ? (
            <button disabled className="btn btn-outline btn-error">
              back
            </button>
          ) : (
            <button onClick={backPage} className="btn btn-outline btn-error">
              back
            </button>
          )}
          {students.length < limit ? (
            <button disabled className="btn btn-outline btn-success">
              next
            </button>
          ) : (
            <button onClick={nextPage} className="btn btn-outline btn-success">
              next
            </button>
          )}
        </div>

        {students.map((std) => (
          <Modal
            key={std.std_id}
            student={std}
            majors={majors}
            classes={classes}
            gender={gender}
            nation={nation}
            reload={setLoad}
          />
        ))}
      </div>
    );
  }
}

const Modal = ({ student, majors, classes, reload }) => {
  // console.log(student);

  const modalId = `my_modal_${student.std_id}`;
  const [editData, setEditData] = useState({
    std_gender: student.gender_type,
    std_name: student.std_name,
    std_bd: student.std_bd,
    std_lastname: student.std_lastname,
    std_address: student.std_address,
    std_phone: student.std_phone,
    majorId: student.majorId,
    class_type: student.class.class_type,
  });
  // console.log(editData.majorId)
  // console.log(student.major)
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
      // console.log(editData);
      const apiUrl = `http://localhost:8000/student/update/${std_id}`;

      await axios.patch(apiUrl, editData);
      Swal.fire({
        title: "แก้ไขสำเร็จ",
        icon: "success",
        timer: 1500,
      });
      reload((prv) => !prv); //reloadแบบใหม่
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
    // console.log(editData);
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
        // console.log(rs);
        if (rs.status === 200) {
          // location.reload();
          toast.success("ลบข้อมูลเรียบร้อย");
          reload((prv) => !prv);
        }
        document.getElementById(modalId).close();
      } catch (err) {
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูล"
        );
      }
    }
  };
  const hdlAGREE = async (e) => {
    if (confirm("ต้องการยืนยันสถานะหรือไม่ ?") === true) {
      try {
        e.stopPropagation();
        const agree = { status: "AGREE" };
        const std_id = student.std_id;
        let token = localStorage.getItem("token");
        const rs = await axios.patch(
          `http://localhost:8000/student/upstatus/${std_id}`,
          agree,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(rs);
        if (rs.status === 200) {
          toast.success("ยืนยันสถานะเรียบร้อย");
          document.getElementById(modalId).close();
          reload((prv) => !prv);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const hdlREJECT = async (e) => {
    if (confirm("ต้องการปฏิเสธสถานะหรือไม่ ?") === true) {
      try {
        e.stopPropagation();
        const agree = { status: "REJECT" };
        const std_id = student.std_id;
        let token = localStorage.getItem("token");
        const rs = await axios.patch(
          `http://localhost:8000/student/reject/${std_id}`,
          agree,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(rs);
        if (rs.status === 200) {
          toast.success("ปฏิเสธสถานะเรียบร้อย");
          document.getElementById(modalId).close();
          reload((prv) => !prv);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(editData.majorId)

  return (
    <dialog id={modalId} className="modal select-none">
      <div className="modal-box">
        <img
          className="w-[4cm] h-[5.23cm] mx-auto rounded-md mb-5 pointer-events-none"
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
          แผนการเรียน :{" "}
          {isEditing ? 
            <select
              name="majorId"
              value={editData.majorId}
              onChange={handleChange}
            >
              {/* <option value='' disabled>สาขาวิชา</option> */}
              {majors.map((el, index) => (
                // <option></option>

                <option value={el.major_id} key={index}>
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
          : (
            student.major.major_type
          )}
        </h3>
        <h3 className="font-bold text-lg">
          ระดับการศึกษา :
          {isEditing ? (
            <select
              name="classId"
              value={editData.classId}
              onChange={handleChange}
            >
              {classes.map((el, index) => (
                <option value={el.class_id} key={index}>
                  {el.class_type === "SECONDARY2" ? "ม.4" : "ม.1"}
                </option>
              ))}
            </select>
          ) : student.class?.class_type === "SECONDARY2" ? (
            "ม.4"
          ) : (
            "ม.1"
          )}
        </h3>
        <h3 className="font-bold text-lg">
          สถานะ{" "}
          {student.status === "W8"
            ? "รอยืนยัน"
            : student.status === "AGREE"
            ? "ยอมรับ"
            : student.status === "REJECT"
            ? "ปฏิเสธ"
            : student.status}
        </h3>

        <div  className="flex justify-end gap-3">
          <button className="btn btn-outline btn-success" disabled={student.status === "AGREE"}  onClick={hdlAGREE}>
            ยืนยันสถานะ
          </button>
          <button className="btn btn-outline btn-error" disabled={student.status === "AGREE"} onClick={hdlREJECT}>
            ปฏิเสธ
          </button>
          {isEditing ? (
            <button className="btn btn-success" onClick={handleSaveClick}>
              บันทึก
            </button>
          ) : (
            <button className="btn btn-warning" disabled={student.status === "AGREE"} onClick={handleEditClick}>
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
