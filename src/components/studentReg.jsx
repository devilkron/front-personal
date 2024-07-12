// import axios from "axios";
// import { useEffect, useState, useRef, useContext } from "react";
// import adminAuth from "../hooks/adminAuth";
// import Swal from "sweetalert2";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import AuthContext from "../contexts/AuthContext";
// import Inputmask from "react-input-mask";
// import { useNavigate } from "react-router-dom";
// export default function studentReg() {
//   // console.log(fileinput.current.files[0])
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState("") ;
//   const { user } = useContext(AuthContext);
//   // console.log(user)
//   const [skipstudent, setSkipstudent] = useState(0);
//   const nextPage = () => {
//     setSkipstudent((skip) => skip + 10);
//   };
//   const backPage = () => {
//     setSkipstudent((skip) => skip - 10);
//   };
//   const [input, setInput] = useState({
//     std_identity: "",
//     std_name: "",
//     std_lastname: "",
//     std_nameEN: "",
//     std_lastnameEN: "",
//     std_grade: "",
//     std_yearIn:"",
//     std_school:"",
//     std_bd: "",
//     std_address: "",
//     std_phone: phone ? phone : "1234567890",
//     std_email: "",
//     status: "W8",
//     img_profile: "",
//     majorId: "",
//     classId: "",
//     gender_id:"",
//     nation_id: "",
//     user_id: user?.user_id,
//   });

//   const fileinput = useRef(null);
//   const [major, setMajor] = useState([]);
//   useEffect(() => {
//     const getMajor = async () => {
//       const rs = await axios.get("http://localhost:8000/student/major");
//       //   console.log(rs.data)
//       setMajor(rs.data.getM);
//     };
//     getMajor();
//   }, []);
//   const [gender, setGender] = useState([]);
//   useEffect(() => {
//     const getGen = async () => {
//       const rs = await axios.get("http://localhost:8000/student/gender");
//       setGender(rs.data.getGen);
//     };
//     getGen();
//   }, []);
//   const [nation, setNation] = useState([]);
//   useEffect(() => {
//     const getNation = async () => {
//       const rs = await axios.get("http://localhost:8000/student/nation");
//       setNation(rs.data.getNation);
//     };
//     getNation()
//   }, []);

//   const [Class, setClass] = useState([]);
//   useEffect(() => {
//     const getClass = async () => {
//       const rs = await axios.get("http://localhost:8000/student/class");
//       setClass(rs.data.getC);
//     };
//     getClass();
//   }, []);
//   const [students, setStudents] = useState([]);
//   useEffect(() => {
//     const getStudent = async () => {
//       let token = localStorage.getItem("token");
//       axios
//         .get(`http://localhost:8000/student/enrollment?skip=${skipstudent}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => setStudents(response.data.getS))
//         .catch((error) => console.error("Error student", error));
//     };
//     getStudent();
//   }, [skipstudent]);
//   const joinT = students.map((student) => {
//     const matchT = Class.find(
//       (classItem) => classItem.class_id === student.classId
//     );
//     const matchTMajor = major.find(
//       (majorItem) => majorItem.major_id === student.majorId
//     );
//     // console.log(admin);
//     return {
//       ...student,
//       class_type: matchT ? matchT.class_type : null,
//       major_type: matchTMajor ? matchTMajor.major_type : null,
//     };
//   });


//   const hdlChange = (e, value) => {
//     if (e.target.name === "std_phone") {
//       setPhone(value);
//       setInput((prev) => ({ ...prev, [e.target.name]: value }));
//     } else {
//       const newValue = e.target.name === "std_yearIn" ? 
//         e.target.value === "2567" ? "2567" : "2568" :
//         e.target.value;
  
//       setInput((prev) => ({ ...prev, [e.target.name]: newValue }));
//     }
//   };

//   const hdlSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(input.std_phone.length)
//     if (input.std_phone.length < 10) {
//       return alert("กรอกเบอร์โทรศัพท์ให้ครบ");
//     }

//     if (input.std_identity.length < 13) {
//       return alert("กรอกรหัสบัตรประชาชนให้ครบ");
//     }

//     try {
//       const file = fileinput.current?.files[0];
//       const formData = new FormData();
//       // console.log(file);
//       if (!file) {
//         return alert("กรุณาแนบรูปภาพ");
//       }
//       Object.entries(input).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       if (file) {
//         formData.append("image", file);
//       }

//       const { isConfirmed } = await Swal.fire({
//         icon: "info",
//         title: "กรุณาเช็คข้อมูลให้ครบถ้วนถูกต้องก่อนทำการส่ง",
//         showCancelButton: true,
//         confirmButtonText: "ตกลง",
//         cancelButtonText: "ยกเลิก",
//       });
// if  (isConfirmed) {
//   const token = localStorage.getItem("token");
//   const rs = await axios.post(
//     "http://localhost:8000/student/add",
//     formData,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   if (rs.status === 200) {
//     Swal.fire({
//       icon: "success",
//       text: " ขอให้โชคดีกับการสอบ",
//       timer: 1500,
//       showConfirmButton: false,
//       width: "500px",
//     }).then(() => {
//       navigate("/show");
//     });
//   }
// }
// }catch(err){
//   Swal.fire({
//     icon:"error",
//     title:"ผิดพลาด",
//     text: "กรุณากรอกข้อมูลให้ครบ"
//   })
// }
//   };
//   // console.log(input.major_type)
//   const HdlReset = (e) => {
//     setInput({
//       std_identity: "",
//       std_name: "",
//       std_lastname: "",
//       std_nameEN: "",
//       std_lastnameEN: "",
//       std_yearIn: "",
//       std_school:"",
//       std_grade: "",
//       std_bd: "",
//       std_address: "",
//       std_phone: "",
//       std_email: "",
//       status: "W8",
//       img_profile: "",
//       majorId: "",
//       classId: "",
//       gender_id: "",
//       nation_id: "",
//     });
//     if (fileinput.current) {
//       fileinput.current.value = "";
//     }
//   };
//   return (
//     <div className="bg-base-100 h-screen ">
//       <div className="backdrop-blur-sm h-screen py-20">
//         <form
//           className=" max-w-[800px] max-h-[1400px] mx-auto  p-5 bg-gradient-to-b from-cyan-500 to-sky-300 rounded-lg drop-shadow-2xl"
//           onSubmit={hdlSubmit}
//         >
//           {/* bg-[url(https://img.freepik.com/free-vector/back-school-background-flat-design_23-2148596550.jpg)] */}
//           <div className="flex justify-center text-2xl">
//             แบบฟอร์มสมัครสอบ
//           </div>
//           <div className=" mx-auto  w-full">
//             <div className="flex gap-2 mt-3 w-3/4 mx-auto">
//               <p className="mt-3 text-xl">วิชา:</p>
//               <select
//                 name="majorId"
//                 className="select select-bordered w-full max-w-xs text-violet-500"
//                 onChange={hdlChange}
//                 value={input.majorId}
//               >
//                 <option hidden>วิชาเอก</option>
//                 {major.map((el) => {
//                   const majorMapping = {
//                     MATHSCI: "วิทย์คณิต",
//                     ARTMATH: "ศิลป์คำนวณ",
//                     ARTENG: "ศิลป์อังกฤษ",
//                     ARTSOC: "ศิลป์สังคม",
//                     ARTFREE: "ศิลป์ทั่วไป",
//                   };

//                   return (
//                     <option key={el.major_id} value={el.major_id}>
//                       {majorMapping[el.major_type] || el.major_type}
//                     </option>
//                   );
//                 })}
//               </select>

//               <p className="mt-3 text-xl">ระดับ:</p>
//               <select
//                 name="classId"
//                 className="select select-bordered w-full max-w-xs text-violet-500"
//                 onChange={hdlChange}
//                 value={input.classId}
//               >
//                 <option hidden>ระดับชั้น</option>
//                 {Class.map((el) => (
//                   <option key={el.class_id} value={el.class_id}>
//                     {el.class_type === "SECONDARY1"
//                       ? "ม.1"
//                       : el.class_type === "SECONDARY2"
//                       ? "ม.4"
//                       : el.class_type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex gap-2 mt-2 ">
//             <select name="std_yearIn" value={input.std_yearIn} onChange={hdlChange} className="select select-bordered w-1/4 max-w-xs text-violet-500">
//                 <option hidden>ปีการศึกษา</option>
//                 <option value="2567" >2567</option>
//                 <option value="2568" >2568</option>
//               </select>
//             <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-1/2 mt-3 px-3"
//                 type="text"
//                 name="std_school"
//                 value={input.std_school}
//                 onChange={hdlChange}
//                 placeholder="จบจากโรงเรียน"
//               />
//             <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-1/2 mt-3 px-3"
//                 type="text"
//                 name="std_grade"
//                 value={input.std_grade}
//                 onChange={hdlChange}
//                 placeholder="เกรดเฉลี่ย"
//               />
//             </div>
//             <div className="w-2/3 mt-3">
//               <Inputmask
//                 className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
//                 mask="9-9999-99999-99-9"
//                 name="std_identity"
//                 value={input.std_identity}
//                 onChange={hdlChange}
//                 placeholder="รหัสบัตรประชาชน"
//               />
//             </div>
//             <div className="w-36 py-2">
//               <select
//                 name="gender_id"
//                 value={input.gender_id}
//                 onChange={hdlChange}
//                 className="select select-bordered w-full max-w-xs text-violet-500"
//               >
//                 <option hidden>คำนำหน้า</option>
//                 {gender.map((el, index) => (
//                   <option value={el.gender_id} key={index}>
//                     {el.gender_type === "MR" ? "นาย" : el.gender_type === "BOY" ? "ด.ช." : el.gender_type ==="GIRL" ? "ด.ญ." : el.gender_type === "MISS" ?"นางสาว" : el.gender_type === "MRS" ? "นาง" : ""}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex gap-2  ">
//               {" "}
//               <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
//                 type="text"
//                 name="std_name"
//                 value={input.std_name}
//                 onChange={hdlChange}
//                 placeholder="ชื่อ"
//               />
//               <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
//                 type="text"
//                 name="std_lastname"
//                 value={input.std_lastname}
//                 onChange={hdlChange}
//                 placeholder="นามสกุล"
//               />
//               <input
//                 className=" rounded-md border-white border bg-white  w-full mt-3 px-3"
//                 type="Date"
//                 name="std_bd"
//                 value={input.std_bd}
//                 onChange={hdlChange}
//               />
//             </div>
//             <div className="flex gap-2  ">
//               {" "}
//               <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
//                 type="text"
//                 name="std_nameEN"
//                 value={input.std_nameEN}
//                 onChange={hdlChange}
//                 placeholder="Name"
//               />
//               <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
//                 type="text"
//                 name="std_lastnameEN"
//                 value={input.std_lastnameEN}
//                 onChange={hdlChange}
//                 placeholder="Lastname"
//               />
              
//             </div>
//             <div className="w-36 py-2">
//               <select
//                 name="nation_id"
//                 value={input.nation_id}
//                 onChange={hdlChange}
//                 className="select select-bordered w-full max-w-xs text-violet-500"
//               >
//                 <option hidden>สัญชาติ</option>
//                 {nation?.map((el, index) => (
//                   <option value={el.nation_id} key={index}>
//                     {el.nation_name }
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-2">
//               <input
//                 className=" rounded-md border-white border bg-white text-violet-500 w-full mt-3 px-3"
//                 type="text"
//                 name="std_address"
//                 value={input.std_address}
//                 onChange={hdlChange}
//                 placeholder="ที่อยู่ที่สามารถติดต่อได้"
//               />
//               {/* <p className="mt-3">Phone</p> */}
//               <PhoneInput
//                 className=" rounded-md  text-violet-500 w-full mt-3 px-3 number"
//                 country={"th"}
//                 // name="std_phone"
//                 value={phone}
//                 onChange={(value) =>
//                   hdlChange({ target: { name: "std_phone" } }, value)
//                 }
//               />
//             </div>

//             {/* <p className="mt-3">Email</p> */}
//             <input
//               className=" rounded-md border-white border bg-white text-violet-500 w-2/3 mt-3 px-3 "
//               type="text"
//               name="std_email"
//               value={input.std_email}
//               onChange={hdlChange}
//               placeholder="Email"
//             />
//             <div className="flex gap-2 ">
//               <p className="mt-3 text-xl">รูปถ่ายขนาด 2 นิ้ว</p>
//               <input
//                 className=" rounded-md  file:py-2 file:px-2 file:border-0 file:rounded-md file:hover:cursor-pointer hover:bg-violet-500 hover:text-white file:hover:text-white file:bg-transparent  bg-white mt-3 px-2 w-60"
//                 type="file"
//                 accept="image/*"
//                 ref={fileinput}
//                 name="img_profile"
//               />
//             </div>
//           </div>

//           <div className="mx-auto mt-5 w-1/2">
//             <input
//               type="submit"
//               value="SEND"
//               className="btn btn-success btn-outline w-[150px] mr-10 hover:scale-[1.1]"
//             />
//             <input
//               type="button"
//               value="RESET"
//               className="btn btn-warning btn-outline w-[150px] ml-9 hover:scale-[1.1]"
//               onClick={HdlReset}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
