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
    <div className="mt-5 mx-auto w-1/3 select-none" >
     <div ref={componentRef}>
     <div className="bg-[#637aa4] text-2xl text-white  h-16 flex items-center  rounded-t-[16px] px-4 " >
        ข้อมูลผู้สมัครสอบ
      </div>
      <div className="card rounded-t-none flex flex-row bg-base-100 shadow-xl gap-4 p-5 pointer-events-none " >
        
          <img className="w-[4cm] h-[5.23cm] rounded-md"
            src={students.img_profile}
          />
        
        <div className="card-body p-0 ">
          <h2 className="card-title"><label className="text-gray-600 font-normal">ชื่อ</label> {students.std_name} {students.std_lastname}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">ที่อยู่</label> {students.std_address}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">เบอร์โทร</label> +{students.std_phone}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">สาขา</label> {thaiTranslation}</h2>
          <h2 className="card-title"><label className="text-gray-600 font-normal">ระดับการศึกษา</label> {students.class?.class_type === "SECONDARY1" ? "มัธยมต้น" :"มัธยมปลาย"}</h2>
          
        </div>
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
