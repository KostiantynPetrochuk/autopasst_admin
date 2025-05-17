import Image from "next/image";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { SellCarRequest } from "@/types";
import { BACKEND_URL } from "@/lib/Constants";

const SellCarRequestSwiper = ({
  sellCarRequest,
}: {
  sellCarRequest: SellCarRequest;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: "center",
        marginTop: 2,
      }}
      elevation={24}
    >
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        style={{
          aspectRatio: "16/9",
          maxWidth: "100%",
        }}
      >
        {sellCarRequest?.imageNames?.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`${BACKEND_URL}uploads/sell_car_requests/${image}`}
              alt={`${image} logo`}
              width={300}
              height={300}
              priority={true}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper: SwiperClass) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{
          marginTop: 10,
          maxWidth: "100%",
          maxHeight: 200,
        }}
      >
        {sellCarRequest?.imageNames?.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`${BACKEND_URL}uploads/sell_car_requests/${image}`}
              alt={`${image} logo`}
              height={200}
              width={200}
              priority={true}
              quality={100}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
};

export default SellCarRequestSwiper;
