import { useState, useEffect, useContext } from "react";
// import useAuth from "../hooks/adminAuth";
import axios from "axios";
import SearchContext from "../contexts/SearchContext";
import Swal from "sweetalert2";

export default function Search() {
  const { studentSearch, setName, name, setYear, year, setCls, cls } =
    useContext(SearchContext);
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchs, setSearch] = useState([]);
  const [gender, setGender] = useState([]);
  const [nation, setNation] = useState([]);
  const [reload, setLoad] = useState(false);
  // const [name, setName] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [skipstudent, setSkipstudent] = useState(0);
  const nextPage = () => {
    setSkipstudent((skip) => skip + 10);
  };
  const backPage = () => {
    setSkipstudent((skip) => skip - 10);
  };
  // const [page, setPage] = useState('')
  // const [lastname, setLastname] = useState('');

  useEffect(() => {
    const getStudent = async () => {
      let token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8000/student/enrollment?skip=${skipstudent}`, {
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
    getStudent();
    getMajor();
    getClass();
  }, [skipstudent, reload]);

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
  const handleNameChange = (e) => {
    setName(e.target.value);
    // console.log(name)
  };
  
  const handleYearChange = (e) => {
    setYear(e.target.value);
    // console.log(year)
  };
  
  const handleClassChange = (e) => {
    setCls(e.target.value);
    // console.log(cls)
  };
  

  const hdlsubmit = async (e) => {
    e.preventDefault();

    if (name !== "" || year !== "" || cls !== "" ) {
      try {
        e.preventDefault();
        let token = localStorage.getItem("token");
        axios
          .get(
            `http://localhost:8000/student/search?name=${name}&year=${year}&cls=${cls}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => setSearch(response.data.getD))
          .then(setIsSearch(true))
          .catch((error) => console.error("Search", error));
          
        // console.log(name)
        // console.log(year)
        // console.log(cls)
      } catch (err) {
        next(err);
      }
    } else {
      location.reload();
    }
  };
  console.log(searchs);
  // console.log(skipstudent)
  if (joinT !== students) {
    return (
      <div className="overflow-x-auto">
        {/* {JSON.stringify(majors)}
        {JSON.stringify(searchs)} */}
        <form onSubmit={hdlsubmit}>
          <div className=" flex flex-row gap-2">
          <label className="input input-bordered flex items-center w-1/2 justify-center mx-auto mt-3">
            <input
              type="text"
              className="grow bg-transparent"
              placeholder=""
              value={name}
              onChange={handleNameChange}
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
          <select name="std_yearIn" value={year} onChange={handleYearChange} className="mt-3 select select-bordered w-1/4 max-w-xs text-violet-500">
                <option hidden>ปีการศึกษา</option>
                <option value="2567" >2567</option>
                <option value="2568" >2568</option>
              </select>
              <select
                name="classId"
                className="mt-3 select select-bordered w-1/4 max-w-xs text-violet-500"
                onChange={handleClassChange}
                value={cls}
              >
                <option hidden>ระดับชั้น</option>
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
        </form>

        {students && (
          <table className="table mt-5 text-center ">
            <thead className="text-xl ">
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ - สกุล</th>
                <th>โรงเรียน</th>
                <th>ระดับ</th>
                <th>สาขาวิชา</th>
                <th>ปีการศึกษา</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer">
              {searchs.length === 0
                ? joinT.map((std) => (
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
                      <td>{std.class_type === "SECONDARY2" ? "ม.4" : "ม.1"}</td>
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
                          : "ไม่ระบุ"}
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
                      <td>{std.class.class_type === "SECONDARY2" ? "ม.4" : "ม.1"}</td>
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
                          : "ไม่ระบุ"}
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
          {" "}
          {(isSearch === false && skipstudent <= 9) || searchs.length >= 1 ? (
            <button disabled className="btn btn-outline btn-error">
              back
            </button>
          ) : (
            <button onClick={backPage} className="btn btn-outline btn-error">
              back
            </button>
          )}
          {isSearch === false && skipstudent + 10 <= students.length ? (
            <button onClick={nextPage} className="btn btn-outline btn-success ">
              next
            </button>
          ) : (
            <button disabled className="btn btn-outline btn-success ">
              next
            </button>
          )}
        </div>

        {joinT.map((std) => (
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

const Modal = ({ student, majors, classes, gender, nation, reload }) => {
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
    class_type: student.class_type,
  });
  // console.log(editData.majorId)
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
          location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  let thaiTranslation = "";
  switch (student.major?.major_type) {
    case "MATHSCI":
      thaiTranslation = "วิทย์คณิต";
      break;
    case "ARTMATH":
      thaiTranslation = "ศิลป์คำนวณ";
      break;
    case "ARTSOC":
      thaiTranslation = "ศิลป์สังคม";
      break;
    case "ARTENG":
      thaiTranslation = "ศิลป์ภาษา";
      break;
    case "ARTFREE":
      thaiTranslation = "ศิลป์ทั่วไป";
      break;
    default:
      thaiTranslation = "ไม่ระบุ";
      break;
  }
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
          สาขาวิชา :{" "}
          {isEditing ? (
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
                    : "ไม่ระบุ"}
                </option>
              ))}
            </select>
          ) : (
            thaiTranslation
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
          ) : student.class_type === "SECONDARY2" ? (
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
