import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getS = async () => {
      const rs = await axios.get("http://localhost:8000/user/dashboard");
      setStudents(rs.data);
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
                {students.count}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>

            <div>
              <h1 className="text-1xl  font-bold text-sky-500">ม.1</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countClass}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>

            <div>
              <h1 className="text-1xl  font-bold text-sky-500">ม.4</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countClass2}
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
              <h1 className="text-1xl font-bold text-sky-500 tooltip" data-tip={`ม.1 : ${students.countclsMATHSCI} คน / ม.4 : ${students.countcls2MATHSCI} คน`}>สาขาวิทย์คณิต</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countMATHSCI}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
            <div>
              <h1 className="text-1xl font-bold text-sky-500 tooltip" data-tip={`ม.1 : ${students.countcls1ARTMATH} คน / ม.4 : ${students.countcls2ARTMATH} คน`}>สาขาศิลป์คำนวณ</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countARTMATH}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
            <div>
              <h1 className="text-1xl font-bold text-sky-500 tooltip" data-tip={`ม.1 : ${students.countcls1ARTENG} คน / ม.4 : ${students.countcls2ARTENG} คน`}>สาขาศิลป์ภาษา</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countARTENG}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
            <div>
              <h1 className="text-1xl font-bold text-sky-500 tooltip" data-tip={`ม.1 : ${students.countcls1ARTSOC} คน / ม.4 : ${students.countcls2ARTSOC} คน`}>สาขาศิลป์สังคม</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countARTSOC}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
            <div>
              <h1 className="text-1xl font-bold text-sky-500 tooltip" data-tip={`ม.1 : ${students.countcls1ARTFREE} คน / ม.4 : ${students.countcls2ARTFREE} คน`}>สาขาศิลป์ทั่วไป</h1>
              <h2 className="text-2xl font-bold text-amber-400">
                {students.countARTFREE}
              </h2>
              <label className="text-2xl font-bold text-amber-400">คน</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
