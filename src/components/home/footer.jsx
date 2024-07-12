import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function footer() {
  const navigate = useNavigate()
  return (
    <div className="text-center text-sm mt-5 bg-sky-500  w-full bottom-0">
      
        <p className="text-white hover:text-red-400 cursor-pointer" onClick={()=> {navigate("/contact"); location.reload()}}>ติดต่อเรา</p>
      
      <label className="text-center mt-3 text-red-300">
        SNRU ฉลองราช ภูครองนาค
      </label>
    </div>
  );
}
