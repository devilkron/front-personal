import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function footer() {
  return (
    <div className="text-center text-sm mt-5 bg-sky-500 ">
      <Link to="/contact">
        <p className="text-white hover:text-red-400">ติดต่อเรา</p>
      </Link>
      <label className="text-center mt-3 text-red-300">
        SNRU ฉลองราช ภูครองนาค
      </label>
    </div>
  );
}
