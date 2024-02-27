import { useContext } from "react";
import AuthContextG from "../contexts/AuthContextGuest";

export default function GuestAuth() {
    return useContext(AuthContextG)
}