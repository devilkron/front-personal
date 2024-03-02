import axios from 'axios'
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        let token = localStorage.getItem('token')
        if(!token) {
            return
        }

        const rs = await axios.get("http://localhost:8000/auth/me",{
          headers : {Authorization : `Bearer ${token}`}  
        })
        setUser(rs.data);
        

      } catch (err) {
        // next(err);
        console.log(err.message)
      }finally {
        setLoading(false)
      }
    };
    run()
  },[]);
  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }
  return (
    <AuthContext.Provider value={{user, setUser, loading, logout, theme, setTheme}}>
        {props.children}
    </AuthContext.Provider>

  )
}
export {AuthContextProvider}
export default AuthContext
