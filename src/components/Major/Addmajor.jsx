import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import Majortb from "./Majortb";

function Addmajor() {
  const [input, setInput] = useState({
    major_type: "",
  });
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(null);
  const majorRef = useRef(null);

  const hdlSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { isConfirmed } = await Swal.fire({
        icon: "question",
        title: "ต้องการยืนยันการส่งหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();
          if (confirmButton) {
            confirmButton.style.backgroundColor = '#4CAF50'; // สีเขียว
            confirmButton.style.color = 'white';
          }
          if (cancelButton) {
            cancelButton.style.backgroundColor = '#f44336'; // สีแดง
            cancelButton.style.color = 'white';
          }
        },
      });
  
      if (isConfirmed) {
        if (!input.major_type) {
          toast.warning("กรุณากรอกชื่อแผนการเรียนด้วยครับ");
          return;
        }
  
        const token = localStorage.getItem("token");
        const url = edit
          ? `http://localhost:8000/student/updatemajor/${edit.major_id}`
          : "http://localhost:8000/student/addmajor";
        const method = edit ? "patch" : "post";
        const rs = await axios[method](url, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (rs.status === 200) {
          toast.success(edit ? "แก้ไขแผนการเรียนเรียบร้อย" : "เพิ่มแผนการเรียนเรียบร้อย");
          setInput({ major_type: "" });
          setReload(!reload);
          setEdit(null);
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.response.data.message,
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();
          if (confirmButton) {
            confirmButton.style.backgroundColor = '#4CAF50'; // สีเขียว
            confirmButton.style.color = 'white';
          }
          if (cancelButton) {
            cancelButton.style.backgroundColor = '#f44336'; // สีแดง
            cancelButton.style.color = 'white';
          }
        },
      });
    }
  };
  

  const hdlChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const hdlEdit = (major) => {
    setInput({ major_type: major.major_type });
    setEdit(major);
  };

  const hdlReset = () => {
    setInput({ major_type: "" });
    setEdit(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {edit ? "แก้ไขแผนการเรียน" : "เพิ่มแผนการเรียน"}
        </Typography>
        <form onSubmit={hdlSubmit}>
          <TextField
            label="ชื่อแผนการเรียน"
            variant="outlined"
            fullWidth
            margin="normal"
            name="major_type"
            value={input.major_type}
            onChange={hdlChange}
            inputRef={majorRef}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {edit ? "แก้ไขแผนการเรียน" : "เพิ่มแผนการเรียน"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={hdlReset}
          >
            รีเซ็ต
          </Button>
        </form>
      </Paper>
      <Typography variant="h4" component="h3" align="center" sx={{ mt: 5 }}>
        รายชื่อแผนการเรียน
      </Typography>
      <Majortb reload={reload} onEdit={hdlEdit} />
    </Container>
  );
}

export default Addmajor;
