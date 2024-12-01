import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import imgone from "../assets/imgone.jpg";
import imgtwo from "../assets/imgthree.jpeg";
import imgthree from "../assets/imgtwo.jpg";
import 'swiper/css';
import 'swiper/css/navigation';
import gsap from "gsap";
import HomeButton from './HomeButton';

const Hero = () => {
  useEffect(() => {
    // GSAP animation for text
    const timeout = setTimeout(() => {
      gsap.from(".text-line", {
        opacity: 0,
        y: 40,
        duration: 2, // Adjusted duration
        stagger: 0.5, // Adjusted stagger time
        ease: "power3.out",
      });
    }, 100); // slight delay before running GSAP

    return () => clearTimeout(timeout); // Cleanup when component unmounts
  }, []);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30} // Spacing between slides
        centeredSlides={false} // Disable centering slides
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true, // Enable clickable pagination
          el: '.swiper-pagination', // Custom selector for pagination
        }}
        modules={[Autoplay]}
        className="mySwiper w-full"
      >
        {/* First Slide */}
        <SwiperSlide className="w-full h-full">
          <div className="w-full relative h-full">
            {/* Image */}
            <img src={imgone} alt="" className="w-full h-full object-cover" />
            
            {/* Content */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-start z-30 text-white p-8">
              <div className="text-start">
                <h3 className="text-sm text-line font-poppins">Welcome To The UAAPF</h3>
                <h2 className="text-3xl text-line tracking-wider mt-2">United Abia Artistes</h2>
                <h1 className="mt-2 tracking-wider text-line font-titillium text-5xl font-bold">
                  & Patriots Forum.
                </h1>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Second Slide */}
      

        {/* Third Slide */}
        <SwiperSlide className="w-full h-full">
          <div className="w-full relative h-full">
            {/* Second Image */}
            <img src={imgtwo} alt="Second Slide" className="w-full h-full object-cover" />
            
            {/* Content */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-start z-30 text-white p-8">
              <div className="text-start">
                <h3 className="text-sm text-line font-poppins">Welcome To The UAAPF</h3>
                <h2 className="text-3xl text-line tracking-wider mt-2">United Abia Artistes</h2>
                <h1 className="mt-2 tracking-wider text-line font-titillium text-5xl font-bold">
                  & Patriots Forum.
                </h1>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Add more slides as needed */}
        {/* slide 3 */}
        <SwiperSlide className="w-full h-full">
          <div className="w-full relative h-full">
            {/* Second Image */}
            <img src={imgthree} alt="Second Slide" className="w-full h-full object-cover" />
            
            {/* Content */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-start z-30 text-white p-8">
              <div className="text-start">
                <h3 className="text-sm text-line font-poppins">Welcome To The UAAPF</h3>
                <h2 className="text-3xl text-line tracking-wider mt-2">United Abia Artistes</h2>
                <h1 className="mt-2 tracking-wider text-line font-titillium text-5xl font-bold">
                  & Patriots Forum.
                </h1>

              </div>
            </div>
          </div>
        </SwiperSlide>
        
      </Swiper>

      {/* Custom Pagination Style */}
      <div className="swiper-pagination" style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}></div>
    </div>
  );
};

export default Hero;
