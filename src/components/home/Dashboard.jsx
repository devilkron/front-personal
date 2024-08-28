import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp  from "react-countup";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getS = async () => {
      const rs = await axios.get("http://localhost:8000/user/dashboard");
      setStudents(rs.data);
      console.log(students);
    };
    getS();
  }, []);
  return (
    <div>
      <div className="max-w-[80rem] mx-auto mt-16 select-none">
        <div className="bg-[#41729F] p-3 rounded-2xl max-w-[53rem] mx-auto">
          <div className="mt-3 flex gap-5 justify-around text-white text-center">
            <div>
              <h1 className="text-1xl font-bold text-sky-500">จำนวนผู้สมัคร</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                <CountUp end={students.count === 0 ? "0" : students.count} duration={5} />
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>

            <div>
              <h1 className="text-1xl  font-bold text-sky-500">ม.1</h1>
              <h2 className="text-2xl font-bold text-amber-400">
               <CountUp end={students.countClass === 0 ? "0" : students.countClass}  duration={5}/>
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>

            <div>
              <h1 className="text-1xl  font-bold text-sky-500">ม.4</h1>
              <h2 className="text-2xl font-bold text-amber-400">
               <CountUp end={students.countClass2 === 0 ? "0" : students.countClass2} duration={5}/>
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[80rem] mx-auto mt-16 select-none">
        <div className=" bg-[#C3E0E5] p-3 rounded-2xl max-w-[53rem] mx-auto">
          <div className="mt-3 flex gap-5 justify-around text-white text-center">
            <div>
              <h1
                className="text-1xl font-bold text-sky-500 tooltip"
              >
                สาขาวิทย์คณิต
              </h1>
              <h2 className="text-2xl font-bold text-amber-400">
               <CountUp end={students.countMATHSCI === 0 ? "0" : students.countMATHSCI} duration={5}/>
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
            {/* <div>
              <h1
                className="text-1xl font-bold text-sky-500 tooltip"
              >
                สาขาศิลป์คำนวณ
              </h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countARTMATH === 0 ? "0" : students.countARTMATH}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div> */}

            <div>
              <h1
                className="text-1xl font-bold text-sky-500 tooltip"
              >
                สาขาศิลป์ภาษา
              </h1>
              <h2 className="text-2xl font-bold text-amber-400">
              <CountUp end={students.countARTENG === 0 ? "0" : students.countARTENG} duration={5} />
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
            
            {/* <div>
              <h1
                className="text-1xl font-bold text-sky-500 tooltip"
              >
                สาขาศิลป์สังคม
              </h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countARTSOC === 0 ? "0" : students.countARTSOC}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div> */}

            <div>
              <h1
                className="text-1xl font-bold text-sky-500 tooltip"
              >
                อื่นๆ
              </h1>
              <h2 className="text-2xl font-bold text-amber-400">
                <CountUp end={students.countOthers === 0 ? "0" : students.countOthers} duration={5}/>
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
