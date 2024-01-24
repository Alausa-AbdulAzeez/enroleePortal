import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function SwiperComponent({ userDetails, authCodes }) {
  return (
    <div className="h-[300px] overflow-auto">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-slate-900 rounded-xl p-3 flex flex-col">
            <h3 className="font-bold text-[#a1a0a0]">Enrolee Name</h3>
            <p className="text-white font-semibold">
              {userDetails?.name} {userDetails?.fullName}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-slate-900 rounded-xl p-3 flex flex-col">
            <h3 className="font-bold text-[#a1a0a0]">
              Number of authorization code requests
            </h3>
            <p className="text-white font-semibold">{authCodes?.length + 1}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-slate-900 rounded-xl p-3 flex flex-col">
            <h3 className="font-bold text-[#a1a0a0]">
              Hospital with the highest authorization code request
            </h3>
            <p className="text-white font-semibold">{authCodes?.length + 1}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
