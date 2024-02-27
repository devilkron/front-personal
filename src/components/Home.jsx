import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import image1 from "../assets/schedule1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import imgspon1 from "../assets/imgspon1.jpg"
import imgspon2 from "../assets/imgspon2.jpg"
import imgspon3 from "../assets/imgspon3.jpg"
import adminAuth from '../hooks/adminAuth';


const indicators = (index) => (<div className="indicator">{index + 1}</div>);

// const { user } = adminAuth();

// console.log(user)

const Home = () => {
    const images = [
        image1,
        image2,
        image3,
        imgspon1,
            imgspon2,
            imgspon3
    ];


    return (
        <div>
            <div>
        <Slide indicators={indicators}>
            <div className="each-slide-effect h-auto max-w-lg mx-auto"> 
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto" >
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    
                </div>
            </div>
           
        </Slide>

        </div>
        <div >
            
            <div>
            <Slide indicators={indicators}>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${images[4]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${images[5]})` }}>
                    
                </div>
            </div>
           
        </Slide>
            </div>

            
        </div>
         </div>
            
        
    );
};


export default Home;