import React, { useEffect, useState } from "react";
import adminAuth from "../hooks/adminAuth";
import axios from "axios";

export default function profile() {
  const { user } = adminAuth();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    user_name: user.user_name,
    user_lastname: user.user_lastname,
    user_email: user.user_email,
    user_identity: user.user_identity,
   
  });
  
  const Click = () => {
    setEdit(!edit);
  };
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    if(!input.user_name || !input.user_lastname || !input.user_email || !input.user_identity ){
        return alert("ห้ามไม่ให้ข้อมูลว่าง")
    }
    try {
      const id = user.user_id;
      const apiUrl = `http://localhost:8000/auth/update/${id}`;

     const rs = await axios.patch(apiUrl, input);

      if (rs.status === 200) {
        alert("แก้ไขข้อมูลเรียบร้อย");
        location.reload();
        setEdit(false);
      }
    } catch (err) {
      console.error(err.message)
    }
  };
  return (
    <>
      {edit ? (
        <div className="border-2   w-1/2 mx-auto text-xl  mt-5 rounded-lg bg-[url(https://img.freepik.com/free-photo/abstract-extruded-voronoi-blocks-background-minimal-light-clean-corporate-wall-3d-geometric-surface-illustration-polygonal-elements-displacement_1217-2503.jpg)] ">
          <div className="flex gap-2 py-3 items-center text-base pl-2">
          
            <div className="w-full ">
              <p>ชื่อ</p> 
              <input
                type="text"
                name="user_name"
                className="input input-bordered w-full max-w-xs"
                value={input.user_name}
                onChange={hdlChange}
              />
            </div>
            <div className="w-full">
              <p>นามสกุล</p>
              <input
                type="text"
                name="user_lastname"
                className="input input-bordered w-full max-w-xs"
                value={input.user_lastname}
                onChange={hdlChange}
              />
            </div>
          </div>

          <div className="flex gap-2 items-center text-base pl-2">
            <div className="w-full">
              <p>อีเมล</p>
              <input
                type="text"
                name="user_email"
                className="input input-bordered w-full max-w-xs"
                value={input.user_email}
                onChange={hdlChange}
              />
            </div>

            <div className="w-full">
              <p>รหัสบัตรประชาชน</p>
              <input
                type="text"
                name="user_identity"
                className="input input-bordered w-full max-w-xs "
                value={input.user_identity}
                onChange={hdlChange}
              />
            </div>
          </div>

          <div className="flex justify-end p-2 gap-1">
            <button className="btn btn-outline btn-success" onClick={hdlSubmit}>
              บันทึก
            </button>
            <button className="btn btn-outline btn-error" onClick={Click}>
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2   w-1/2 mx-auto text-xl text-sky-400 mt-5 rounded-lg bg-[url(https://img.freepik.com/free-photo/abstract-extruded-voronoi-blocks-background-minimal-light-clean-corporate-wall-3d-geometric-surface-illustration-polygonal-elements-displacement_1217-2503.jpg)] ">
          <div className="flex justify-center py-3">
            <h1>ชื่อ {user.gender?.gender_type === "BOY" ? "ด.ช." : user.gender?.gender_type === "MR" ? "นาย" : user.gender?.gender_type === "GIRL" ? "ด.ญ." : user.gender?.gender_type === "MISS" ? "นางสาว" : user.gender?.gender_type === "MRS" ? "นาง"  : user.gender?.gender_type} {user.user_name} {user.user_lastname}</h1>
            </div>
            <div className="flex flex-col justify-center items-center"> 

          <h1>อีเมล {user.user_email}</h1>
          <h1>รหัสบัตรประชาชน {user.user_identity}</h1>
            </div>
          
          <div className="flex justify-end p-2">
            <button className="btn btn-outline btn-warning" onClick={Click}>
              แก้ไขข้อมูล
            </button>
          </div>
        </div>
      )}
    </>
  );
}
