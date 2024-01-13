import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import style from "./feedback.module.scss";
import React, { useEffect, useRef, useState } from "react";

const Feedback = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [imagesColection, setImgColetion] = useState([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/feedback.json`)
      .then((response) => response.json())
      .then((data) => setImgColetion(data));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      swiperRef.current.swiper.slideTo(0);
    }, 500);
  }, []);

  return (
    <section className={style.feedback}>
      <h2 className={`title ${style.feedback__title} `}>
        Відгуки наших клієнтів
      </h2>
      <Swiper
        className={style.feedback__slider}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        slidesPerView={1}
        autoHeight={true}
        spaceBetween={50}
        ref={swiperRef}
        navigation={{
          nextEl: `${style.swiper_button_next}`,
          prevEl: `${style.swiper_button_prev}`,
        }}
        loop={true}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
      >
        {imagesColection.map((element: string, index: number) => {
          return (
            <SwiperSlide className={style.feedback__slide} key={index}>
              <img
                width="200px"
                height="200px"
                decoding="async"
                src={`${process.env.PUBLIC_URL}/img/${element}`}
                alt="feedback"
              />
            </SwiperSlide>
          );
        })}
        <div className={style.swiper_button_next} ref={navigationPrevRef} />
        <div className={style.swiper_button_prev} ref={navigationNextRef} />
      </Swiper>
    </section>
  );
};
export default Feedback;
