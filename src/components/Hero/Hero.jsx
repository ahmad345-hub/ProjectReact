import { useState } from "react";

import sofa1 from "../../assets/sofa1.png";
import sofa2 from "../../assets/sofa2.png";
import sofa3 from "../../assets/sofa3.png";

export default function Hero() {

  const images = [sofa1, sofa2, sofa3];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="pt-[70px]">
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[536px] relative overflow-hidden">

        <img
          src={images[current]}
          alt="slider"
          className="w-full h-full object-cover"
        />

        {/* left arrow */}

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full shadow flex items-center justify-center"
        >
          ❮
        </button>

        {/* right arrow */}

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full shadow flex items-center justify-center"
        >
          ❯
        </button>

        {/* dots */}

        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}