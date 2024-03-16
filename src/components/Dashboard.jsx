import axios from 'axios'
import React, { useEffect, useState } from 'react'




export default function Dashboard() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        const getS = async () => {
            const rs = await axios.get("http://localhost:8000/user/dashboard")
            setStudents(rs.data.count)
        }
        getS()
    },[])
  return (
<div>
<div className='max-w-[80rem] mx-auto mt-16 select-none'>
    <div className='bg-white p-3 rounded-2xl max-w-[53rem] mx-auto'>
        <div className="mt-3 flex gap-5 justify-center text-white text-center">
            <div className='w-[135px] h-[129px] p-3 bg-[#FF90BC] rounded-xl flex justify-center items-center tooltip' >
                <div>
                    <h1 className='text-1xl font-bold' >จำนวนผู้สมัคร</h1>
                    <h2 className='text-2xl font-bold'>
                        {students}
                         
                    </h2>
                    <label className='text-2xl font-bold'>คน</label>
                </div>
            </div>
            <div className='w-[135px] h-[129px] p-3 bg-[#FF90BC] rounded-xl flex justify-center items-center tooltip'  >
                <div>
                    <h1 className='text-1xl  font-bold'>นักเรียนทั้งหมด</h1>
                    <h2 className='text-2xl font-bold'>
                        <label>คน</label>
                    </h2>
                    <h1 className="text-[12px] font-bold mt-1">คิดเป็น % ของผู้ใช้ทั้งหมด</h1>
                </div>
            </div>
            <div className='w-[135px] h-[129px] p-3 bg-[#6096B4] rounded-xl flex justify-center items-center tooltip' >
                <div>
                    <h1 className='text-1xl font-bold' >จำนวนครูทั้งหมด</h1>
                    <h2 className='text-2xl font-bold'> <label>คน</label></h2>
                    <h1 className="text-[12px] font-bold mt-1">คิดเป็น % ของผู้ใช้ทั้งหมด</h1>
                </div>
            </div>
            <div className='w-[135px] h-[129px] p-3 bg-[#6096B4] rounded-xl flex justify-center items-center tooltip' >
                <div>
                    <h1 className='text-1xl font-bold' >จำนวนวิชาทั้งหมด</h1>
                    <h2 className='text-2xl font-bold'> <label>วิชา</label></h2>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}
