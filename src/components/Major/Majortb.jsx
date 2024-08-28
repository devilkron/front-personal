import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";

function Majortb({ reload, onEdit }) {
  const [getmajor, setGetmajor] = useState([]);

  const getMajor = async () => {
    const rs = await axios.get("http://localhost:8000/student/major");
    setGetmajor(rs.data);
    // console.log(rs.data);
  };

  const hdlDelete = async (major_id) => {
    if (confirm("ต้องการลบสาขานี่หรือไม่ ?") === true) {
      try {
        let token = localStorage.getItem("token");
        const rs = await axios.delete(`http://localhost:8000/student/delmajor/${major_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (rs.status === 200) {
          toast.success("ลบสาขาเรียบร้อย");
          getMajor();
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
      <Table className="mt-5" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">เลขที่</TableCell>
            <TableCell align="center">รายชื่อแผนการเรียน</TableCell>
            <TableCell align="center">ชื่อผู้เพิ่ม</TableCell>
            <TableCell align="center" colSpan={2}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getmajor?.getM?.map((mj) => (
            <TableRow key={mj.major_id}>
              <TableCell align="center">{mj.major_id}</TableCell>
              <TableCell align="center">{mj.major_type}</TableCell>
              <TableCell align="center">
                {mj.user.user_name} {mj.user.user_lastname}
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => onEdit(mj)} color="warning">
                  แก้ไข
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => hdlDelete(mj.major_id)} color="error">
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Majortb;
