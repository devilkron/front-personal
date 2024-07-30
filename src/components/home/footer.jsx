import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Footer } = Layout;

export default function CustomFooter() {
  const navigate = useNavigate();

  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#40a9ff', color: 'white' }}>
      <p className="hover:text-red-400 cursor-pointer " onClick={() => { navigate("/contact"); }}>
        ติดต่อเรา
      </p>
      <label>
        SNRU ฉลองราช ภูครองนาค
      </label>
    </Footer>
  );
}
