import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Majortb({reload}) {
  const [getmajor, setGetmajor] = useState([]);

  const getMajor = async () => {
    const rs = await axios.get("http://localhost:8000/student/major");
    setGetmajor(rs.data);
    console.log(rs.data);
  };

  const hdlDelete = async (major_id) => {
    if (confirm("ต้องการลบสาขานี่หรือไม่ ?") === true) {
      try {
        let token = localStorage.getItem("token");
        const rs = await axios.delete(`http://localhost:8000/student/delmajor/${major_id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if(rs.status === 200){
            toast.success("ลบสาขาเรียบร้อย")
            getMajor()
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  useEffect(() => {
    getMajor();
  }, [reload]);
  return (
    <div>
      <table className="table mt-5 text-center">
        <thead className="text-[18px]">
          <tr>
            <th>ลำดับ</th>
            <th>รายชื่อสาขา</th>
            <th>ชื่อผู้เพิ่ม</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {getmajor &&
            getmajor.getM?.map((mj) => (
              <tr key={mj.major_id}>
                <td>
                  <div className="font-bold">{mj.major_id}</div>
                </td>
                <td>
                  <div className="font-bold">{mj.major_type}</div>
                </td>
                <td>
                  <div className="font-bold">
                    {mj.user.user_name} {mj.user.user_lastname}
                  </div>
                </td>

                <th>
                  <a className="btn btn-ghost btn-sm text-yellow-400">
                    แก้ไข
                  </a>
                  <a onClick={() => {hdlDelete(mj.major_id)}} className="btn btn-ghost btn-sm text-red-500">ลบ</a>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Majortb;
