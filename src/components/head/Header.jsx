import {Link, useNavigate} from "react-router-dom"
import adminAuth from "../../hooks/adminAuth"

const guestNav = [
  { to: '/login', text: 'Login' },
  { to: '/register', text: 'register' }
]


const adminNav = [
    {to: '/', text : 'Home'},
    {to: '/add', text: 'Add admin'}

]

export default function Header() {
  const { user, logout, setTheme } = adminAuth();
    const finalNav = user?.user_id ? adminNav : guestNav

    const navigate = useNavigate()

  
    return(
      
        <div>
          
        <nav className="bg-gradient-to-r from-blue-700 from-10% via-sky-500 via-30% to-pink-500 to-90% w-full h-[70px] flex flex-row justify-between text-3xl items-center px-5 text-white ">
        
                    
          
          <div className="btn-ghost  btn-xl text-lime-500 hover:text-amber-400 w-[286px]">
            <Link to="/guest">
              ลงทะเบียนสมัครสอบ 
            </Link>
          </div>
          <div>
           <Link to='/'> <img
              className="rounded-full w-[60px]"
              src="https://www.sps.ac.th/wp-content/uploads/2018/06/logosps64x64.png"
              alt=""
            /></Link>
          </div>

       
          
         <div className="dropdown dropdown-end ">
            <div 
              tabIndex={0}
              role="button"
              className="btn-ghost btn-xl   text-amber-400 hover:text-lime-500 w-[315px]"
            >
               ล็อคอินสำหรับ Admin
             
            </div>
            
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow bg-white rounded-box w-64  mt-5 p-3"
            >
              <figure><img src="https://img.freepik.com/free-vector/hand-drawn-high-school-logo-template_23-2149689290.jpg" className="h-[100px]" alt="logo" /></figure>
              <div tabIndex={0} className="card-body text-black">
                <h2 className="card-title ">หากยังไม่มีรหัสโปรดติดต่อฝ่ายทะเบียน</h2>
                
              </div>
              <div dir="ltr">
           
              <Link to='/login'><button className="btn btn-sm  btn-outline btn-success  w-[35%] ms-[65%] ">ล็อคอิน</button></Link>
              </div>
            </div>
          </div>
          
        </nav>
      </div>
     
  
    )
}
