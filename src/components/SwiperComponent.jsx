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
import { authRequests, hospital, person } from "../assets/images";

export default function SwiperComponent({
  userDetails,
  authCodes,
  hospitalsList,
}) {
  // Use reduce to count occurrences of each idProvider
  const idProviderCount = authCodes?.reduce((acc, item) => {
    const { idProvider } = item;
    acc[idProvider] = (acc[idProvider] || 0) + 1;
    return acc;
  }, {});

  // Find the idProvider with the highest count
  const mostFrequentIdProvider = Object.keys(idProviderCount).reduce(
    (maxId, id) => {
      return idProviderCount[id] > idProviderCount[maxId] ? id : maxId;
    },
    Object.keys(idProviderCount)[0]
  );

  const findNameOfMostFrequentProvider = () => {
    const foundProvider = hospitalsList?.find((singleHospital) => {
      return singleHospital?.iD_Provider === Number(mostFrequentIdProvider);
    });

    return foundProvider?.providerName;
  };

  return (
    <div className="h-[300px] overflow-auto  max-sm:h-[200px]">
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
          <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-white shadow-2xl max-sm:shadow-none rounded-xl p-3 flex flex-col max-sm:p-3">
            <h3 className="font-bold text-[#a1a0a0]">Enrolee Name</h3>
            <div className="w-[80px] h-[100px]">
              <img src={person} alt="Person" />
            </div>
            <p className="text-[#000] font-semibold w-full h-full">
              {userDetails?.name} {userDetails?.fullName}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-white shadow-2xl rounded-xl p-3 flex flex-col">
            <h3 className="font-bold text-[#a1a0a0]">
              Number of authorization code requests
            </h3>
            <div className="w-[80px] h-[100px]">
              <img src={authRequests} alt="Person" />
            </div>
            <p className="text-[#000] font-semibold">
              {authCodes?.length} auth code requests
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" max-md:min-w-[250px] min-w-[200px]  flex-1 max-lg:min-w-[550px]  bg-white shadow-2xl rounded-xl p-3 flex flex-col">
            <h3 className="font-bold text-[#a1a0a0]">
              Hospital with the highest authorization code request
            </h3>
            <div className="w-[80px] h-[100px]">
              <img src={hospital} alt="Hospital" />
            </div>
            <p className="text-[#000] font-semibold">
              {findNameOfMostFrequentProvider()}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
