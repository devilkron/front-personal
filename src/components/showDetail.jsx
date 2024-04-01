import React, { useState,useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
export default function showDetail() {
  const [students, setStudents] = useState([]);
  // const [majors, setMajors] = useState([]);
  // const [classes, setClasses] = useState([])
  useEffect(() => {
    const showDT = async () => {
      const std_id = location.pathname.split("/")[2]
     
      const rs = await axios.get(`http://localhost:8000/user/detail/${std_id}`);
      setStudents(rs.data.showDt);
    };
    // const getMajor = async()=>{
    //   const rs = await axios.get("http://localhost:8000/student/major")
    //   setMajors(rs.data.getM)
    // }
    // const getClass = async() => {
    //   const rs = await axios.get("http://localhost:8000/student/class")
    //   setClasses(rs.data.getC)
    // }
    // getClass()
    // getMajor()
    showDT();
  }, []);

  const componentRef = useRef();
  const hdlPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `บัตรเข้าห้องสอบ_${students.std_name}_${students.std_lastname}`
  });
  
  // console.log(students.major?.major_type
  //   );
  // console.log(majors)
  let thaiTranslation = '';
switch (students.major?.major_type) {
  case 'MATHSCI':
    thaiTranslation = 'วิทย์คณิต';
    break;
  case 'ARTMATH':
    thaiTranslation = 'ศิลป์คำนวณ';
    break;
  case 'ARTSOC':
    thaiTranslation = 'ศิลป์สังคม';
    break;
  case 'ARTENG':
    thaiTranslation = 'ศิลป์ภาษา';
    break;
  case 'ARTFREE':
    thaiTranslation = 'ศิลป์ทั่วไป';
    break;
  default:
    thaiTranslation = 'ไม่ระบุ';
    break;
}
  
  return (
    <div className="mt-5 mx-auto w-1/2 select-none" >
     <div ref={componentRef}>
      { students.nationality?.nation_name === "THAI"?
     <div className="bg-[#637aa4] text-2xl text-white  h-16 flex items-center  rounded-t-[16px] px-4 " >
        ข้อมูลผู้สมัครสอบ
      </div>
      :
      <div className="bg-[#637aa4] text-2xl text-white  h-16 flex items-center  rounded-t-[16px] px-4 " >
        Candidate information
      </div>
}
      <div className="card rounded-t-none flex flex-row bg-base-100 shadow-xl gap-4 p-5 pointer-events-none " >
        
          <img className="w-[4cm] h-[5.23cm] rounded-md"
            src={students.img_profile}
          />
        {students.nationality?.nation_name ==="THAI" ?
        <div className="card-body p-0 ">
          <h2 className="card-title"><label className="text-gray-600 font-normal">เลขประชาชน</label> {students.std_identity}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">ชื่อ</label>{students.gender?.gender_type === "MISS" ? "นางสาว" : students.gender?.gender_type === "GIRL" ? "ด.ญ." :students.gender?.gender_type === "MRS" ? "นาง" : students.gender?.gender_type === "BOY" ? "ด.ช." : students.gender?.gender_type === "MR" ? "นาย" : students.gender?.gender_id} {students.std_name} {students.std_lastname}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">ที่อยู่</label> {students.std_address}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">เบอร์โทร</label> +{students.std_phone}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">สาขา</label> {thaiTranslation}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">ระดับการศึกษา</label> {students.class?.class_type === "SECONDARY1" ? "ม.1" :"ม.4"}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">ปีการศึกษา</label> {students.std_yearIn }</h2>
          
        </div>
        :
        <div className="card-body p-0 ">
        <h2 className="card-title"><label className="text-gray-600 font-normal">Identity ID</label> {students.std_identity}</h2>
        <h2 className="card-title"><label className="text-gray-600 font-normal">Name</label>{students.gender?.gender_type} {students.std_nameEN} {students.std_lastnameEN}</h2>
        <h2 className="card-title"><label className="text-gray-600 font-normal">Address</label> {students.std_address}</h2>
        <h2 className="card-title"><label className="text-gray-600 font-normal">Phone</label> +{students.std_phone}</h2>
        <h2 className="card-title"><label className="text-gray-600 font-normal">Major</label> {students.major?.major_type}</h2>
        <h2 className="card-title"><label className="text-gray-600 font-normal">Class</label> {students.class?.class_type === "SECONDARY1" ? "M.1" :"M.4"}</h2>
        <h2 className="card-title"><label className="text-gray-600 font-normal">Year</label> {students.std_yearIn - 543 }</h2>
      </div> 
}
        <div>
          <img src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png"  className="w-[80px] absolute right-4 top-20" />
        </div>
        
      </div>
     </div>
      <div className="card-actions justify-end mt-5 ">
            
            {students.status === "AGREE" ? <button className="btn btn-primary" onClick={hdlPrint}>ปริ้นบัตร</button> : <button className="btn btn-primary" disabled onClick={hdlPrint}>ปริ้นบัตร</button>}
          </div>
    </div>
  );
}
