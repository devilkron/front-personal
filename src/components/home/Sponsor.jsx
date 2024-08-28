import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imgspon1 from "../../assets/LEGO.png"
import imgspon2 from "../../assets/React.png"
import imgspon3 from "../../assets/imgspon3.jpg"
import imgspon4 from "../../assets/Apple.png"

const indicators = (index) => (<div className="indicator">{index + 1}</div>);

const Sponsor = () => {
    const images = [
        imgspon1,
        imgspon2,
        imgspon3,
        imgspon4
    ]
    return (
        <div >
            
        <div >
        <Slide indicators={indicators}>
        <div className="each-slide-effect h-auto max-w-lg mx-auto">
            <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                
            </div>
        </div>
        <div className="each-slide-effect h-auto max-w-lg mx-auto">
            <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                
            </div>
        </div>
        <div className="each-slide-effect h-auto max-w-lg mx-auto">
            <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                
            </div>
        </div>
        <div className="each-slide-effect h-auto max-w-lg mx-auto">
            <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                
            </div>
        </div>
       
    </Slide>
        </div>

        
    </div>
        
         
    );
}

export default Sponsor;