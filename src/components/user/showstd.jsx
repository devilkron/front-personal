import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function showstd() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const showSTD = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8000/user/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(rs.data.showstd);
    };
    showSTD();
  }, []);
  // console.log(students);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-[18px]">
            <tr>
              <th></th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>โรงเรียน</th>
              <th>ปีการศึกษา</th>
              <th>ระดับชั้น</th>
              <th>สาขา</th>
              <th>เชื้อชาติ</th>
              <th>สัญชาติ</th>
              <th>สถานะ</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {students &&
              students.map((std) => (
                <tr key={std.std_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={std.img_profile}
                            
                          />
                        </div>
                      </div>
                     
                    </div>
                  </td>
                  <td>
                        
                        <div className="font-bold">{std.gender?.gender_type === "MISS" ? "นางสาว" : std.gender?.gender_type === "GIRL" ? "ด.ญ." :std.gender?.gender_type === "MRS" ? "นาง" : std.gender?.gender_type === "BOY" ? "ด.ช." : std.gender?.gender_type === "MR" ? "นาย" : std.gender?.gender_id} {std.std_name}</div>
                        <div className="text-sm opacity-50">{std.gender?.gender_type === "GIRL" ? "MISS" : std.gender?.gender_type === "BOY" ?"MRST" : std.gender?.gender_type} {std.std_nameEN}</div>
                  </td>
                  <td>
                    
                      <div className="font-bold">{std.std_lastname}</div>
                    <div className="text-sm opacity-50">{std.std_lastnameEN}</div>
                  </td>
                  <td>
                    <div className="font-bold">{std.std_school}</div>
                  </td>
                  <td>
                    <div className="font-bold">{std.std_yearIn}</div>
                  </td>
                  <td>
                    <div className="font-bold">{std.class.class_type === "SECONDARY1" ? "ม.1" : "ม.4"}</div>
                  </td>
                  <td>
                    <div className="font-bold">{std.major.major_type}</div>
                  </td>
                  <td>
                    <div className="font-bold">{std.ethicity?.eth_name === "OTHER" ? std.eth_other : std.ethicity.eth_name}</div>
                  </td>
                  <td>
                    <div className="font-bold">{std.nationality?.nation_name === "OTHER" ? std.nation_other : std.nationality.nation_name}</div>
                  </td>
                  <td className="font-bold">
                    {std.status === "W8"
                      ? "รอยืนยัน"
                      : std.status === "AGREE"
                      ? "ยอมรับ"
                      : std.status === "REJECT"
                      ? "ปฏิเสธ"
                      : std.status}
                  </td>
                  <th>
                    {std.status ==="AGREE" ? "" : <Link to={`/update/${std.std_id}`} className="btn btn-ghost btn-sm text-yellow-400">แก้ไข</Link> }
                  <Link to={`/detail/${std.std_id}`} className="btn btn-ghost btn-sm text-sky-400">พิมพ์บัตรเข้าห้องสอบ</Link>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
