import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import image1 from "../assets/schedule1.jpg"
import image2 from "../assets/school.jpg"
import image3 from "../assets/Schedule.png"
import image4 from "../assets/ss.png"
import Sponsor from './Sponsor';
import Dashboard from './Dashboard';
const indicators = (index) => (<div className="indicator">{index + 1}</div>);

// const { user } = adminAuth();

// console.log(user)

const Home = () => {
    const images = [
        image1,
        image2,
        image3,
        image4
            
    ];


    return (
        <div className=' relative'>
            
            <div className='text-3xl text-amber-400 flex justify-center mb-5 mt-5 bg-yellow-200 w-[450px] mx-auto rounded-lg'>โรงเรียนมัธยมรังษีวิทยาแบ่งปัน</div>
            <div className='mb-5'>
                <Dashboard/>
            </div>
            <div className='mb-10'>
        <Slide indicators={indicators} >
            <div className="each-slide-effect h-auto max-w-lg mx-auto"> 
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect object-cover mx-auto" >
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect  mx-auto" >
                <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                    
                </div>
            </div>
           
        </Slide>

        </div>
        {/* <div >

            <Sponsor/>
           
        </div> */}
         </div>
            
        
    );
};


export default Home;