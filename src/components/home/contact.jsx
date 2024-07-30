import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function contact() {
//   useEffect(()=> {
// location.reload()
//   },[])

  return (
    <div className="w-[80rem] mx-auto flex flex-col item-center justify-center">
      <h3 className="text-3xl mx-auto flex justify-center mt-3">
        ติดต่อโรงเรียน
      </h3>
      <div className="flex flex-row">
        <div className="flex justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
            className="w-[300px] max-h-[300px]"
          />
        </div>

        <div className="mt-5 text-2xl">
          ที่อยู่ Walk in
          <p className="mt-3">680 ถ. นิตโย Muang สกลนคร 47000</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30491.604331132574!2d104.08988610069623!3d17.196919318533816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313c8cc952ff3a5d%3A0x65f081b8161df448!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lij4Liy4LiK4Lig4Lix4LiP4Liq4LiB4Lil4LiZ4LiE4Lij!5e0!3m2!1sth!2sth!4v1709003478248!5m2!1sth!2sth"
            className="w-[600px] h-[400px]"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex justify-end">
          <img
            src="https://i.pinimg.com/564x/90/55/09/905509e37d5fb75b1aaf4866a93c9d46.jpg"
            className="w-[300px] max-h-[300px]"
          />
        </div>
        <div className="mt-10 text-2xl">
          <h1 className="mt-4 ">Email</h1>
          <p className="mt-5">
            chalongrach.ph64@snru.ac.th, devilkron@gmail.com
          </p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex justify-end">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXBI4OyBdatLrVutR2Ku7CXGTVb5MOq5BBQA&s"
            className="w-[300px] max-h-[300px]"
          />
        </div>

        <div className="mt-10 text-2xl">
          <h1 className="mt-4 ">Social Network</h1>
          <p className="mt-5">
            Facebook{" "}
            <a
              href="https://www.facebook.com/CP.KornEiEi40"
              target="_blank"
              className="text-sky-300 hover:text-blue-400"
            >
              Chalongrach Phukhongnak
            </a>
          </p>
          <p className="mt-5">
            Linkdin{" "}
            <a
              href="https://www.linkedin.com/in/chalongrach-phukhongnak-a2b8002ab/"
              target="_blank"
              className="text-sky-300 hover:text-blue-400"
            >
              Chalongrach Phukhongnak
            </a>
          </p>
          <p className="mt-5">
            Line{" "}
            <Link to={"/line"} className=" text-sky-300 hover:text-blue-400">
              kroneiei40
            </Link>
          </p>
          <p className="mt-5">
            Instagram{" "}
            <a
              href="https://www.instagram.com/kkorn_ii/?hl=th"
              target="_blank"
              className="text-sky-300 hover:text-blue-400"
            >
              kkorn_ii
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
