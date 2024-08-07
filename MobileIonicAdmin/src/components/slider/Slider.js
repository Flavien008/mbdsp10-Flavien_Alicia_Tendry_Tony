import React, { useState } from 'react';
import './Slider.css';
import BtnSlider from './BtnSlider';

interface SliderProps {
  data: Array<{ img: string }>;
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== data.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === data.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(data.length);
    }
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {data.map((obj, index) => {
        return (
          <div
            key={index}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img 
              src={obj.img.startsWith("data:image") ? obj.img : `data:image/png;base64,${obj.img}`} 
              alt={`Slide ${index + 1}`} 
            />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: data.length }).map((_, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
