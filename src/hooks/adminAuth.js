import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function adminAuth() {
    return useContext(AuthContext)
}