import React, { useState,useEffect } from "react";

export default function showDetail() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const showSTD = async () => {
      const std_id = students.std_id;
      let token = localStorage.getItem("token");
      const rs = await axios.get(`http://localhost:8000/user/detail/${std_id}`, {
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
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
}
