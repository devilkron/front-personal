import React, { useEffect, useState } from "react";
import axios from "axios";

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
  console.log(students);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-[18px]">
            <tr>
                
              <th>Name</th>
              <th>Lastname</th>
              <th>Status</th>
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
                      <div>
                        <div className="font-bold">{std.std_name}</div>
                        <div className="text-sm opacity-50">{std.std_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">
                    {std.std_lastname}
                    <br />
                  </td>
                  <td>
                    {std.status === "W8"
                      ? "รอยืนยัน"
                      : std.status === "AGREE"
                      ? "ยอมรับ"
                      : std.status === "REJECT"
                      ? "ปฏิเสธ"
                      : std.status}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-sm text-sky-400">เพิ่มเติม</button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
