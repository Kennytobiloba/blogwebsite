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
        duration: 2,
        stagger: 0.5,
        ease: "power3.out",
      });
    }, 100);

    return () => clearTimeout(timeout); // Cleanup when component unmounts
  }, []);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        modules={[Autoplay]}
        className="mySwiper w-full"
      >
        {/* First Slide */}

        <SwiperSlide className="w-full h-full">
          <div className="w-full relative h-full">
            <img src={imgone} alt="Charity and Legacy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center mt-10 justify-center z-30 text-white p-8">
              <div className="text-center font-roboto">
                <h1 className="md:text-lg text-sm text-line font-medium mb-2">Welcome to TUWCO</h1>
                <h1 className="lg:text-4xl md:text-2xl text-[20px] text-line font-bold">The Ultimate Wrestling and Charity Organization</h1>
                <p className="mt-4 text-lg text-line w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                We empower individuals by providing basic infrastructure, linking them to international platforms, and helping them grow into global stars. TUWCO is committed to bringing opportunities to those who need them most.
                </p>
                <div className="text-line mt-2">
                  <HomeButton />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>



        <SwiperSlide className="w-full h-full">
          <div className="w-full relative h-full">
            <img src={imgthree} alt="Charity and Legacy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center mt-10 justify-center z-30 text-white p-8">
              <div className="text-center font-roboto">
                <h1 className="text-lg text-line font-medium mb-2">Welcome to TUWCO</h1>
                <h1 className="lg:text-4xl md:text-2xl text-[20px] text-line font-bold">The Ultimate Wrestling and Charity Organization</h1>
                <p className="mt-4 text-lg text-line w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                  TUWCO focuses on uncovering unique talents and nurturing them into world-class celebrities through innovative support and exposure. We aim to create a lasting impact on individuals and communities.
                </p>
                <div className="text-line mt-2">
                  <HomeButton />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Second Slide */}
        <SwiperSlide className="w-full h-full">
          <div className="w-full relative h-full">
            <img src={imgtwo} alt="Developing Talents" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center mt-10 justify-center z-30 text-white p-8">
              <div className="text-center font-roboto">
                <h1 className="md:text-lg text-sm text-line font-medium mb-2">Welcome to TUWCO</h1>
                <h1 className="lg:text-4xl md:text-2xl text-[20px] text-line font-bold">The Ultimate Wrestling and Charity Organization</h1>
                <p className="mt-4 text-lg text-line w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                TUWCO promotes unity and empowers communities through charity events. We create world-class opportunities for talents and ensure that everyone has a chance to thrive. Join us in creating a lasting impact through both sport and charity.              
                </p>
                <div className="text-line mt-2">
                  <HomeButton />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Third Slide */}
       
      </Swiper>

      {/* Custom Pagination Style */}
      <div
        className="swiper-pagination"
        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
      ></div>
    </div>
  );
};

export default Hero;
