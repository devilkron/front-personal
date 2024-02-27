import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imgspon1 from "../assets/imgspon1.jpg"
import imgspon2 from "../assets/imgspon2.jpg"
import imgspon3 from "../assets/imgspon3.jpg"

const indicators = (index) => (<div className="indicator">{index + 1}</div>);

const Sponsor = () => {
    const imgspon = [
        imgspon1,
        imgspon2,
        imgspon3
    ]
    return (
        <Slide indicators={indicators}>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${imgspon[0]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${imgspon[1]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect h-auto max-w-lg mx-auto">
                <div style={{ 'backgroundImage': `url(${imgspon[2]})` }}>
                    
                </div>
            </div>
           
        </Slide>
        
         
    );
}

export default Sponsor;