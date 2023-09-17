import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { actFetchBanner } from "./duck/actions";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Banner() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listBannerReducer);
  useEffect(() => dispatch(actFetchBanner()), []);
  return (
    <section className="banner-section">
      {" "}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data &&
          data.map((banner, key) => {
            return (
              <SwiperSlide>
                <img
                  style={{ objectFit: "cover", width: "100%", height: "1000px" }}
                  src={banner.hinhAnh}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}
