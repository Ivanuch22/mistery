import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

interface INotLoad {
  isSlider?: boolean;
}
const NotLoadedCarts: React.FC<INotLoad> = ({ isSlider }) => {
  var arr = [];
  for (let index = 0; index < 12; index++) {
    arr.push(
      <SwiperSlide key={index} className={isSlider ? "NotLoaded_padding" : ""}>
        <div className="NotLoaded">
          <div className="NotLoaded_img"></div>
          <h3 className="NotLoaded_title"> </h3>
          <div className="NotLoaded_row">
            <span className="NotLoaded_red"></span>
            <span className="NotLoaded_grey"></span>
          </div>
          <button className="NotLoaded_button"></button>
          <button className="NotLoaded_like"></button>
        </div>
      </SwiperSlide>
    );
  }
  return arr;
};
export default NotLoadedCarts;
