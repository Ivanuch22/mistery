import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import style from "./feedback.module.scss"

const Feedback = () => {
    return (

        <section className={style.feedback}>
            <h2 className={`title ${style.feedback__title} `}>Відгуки наших клієнтів</h2>
            <Swiper
                className={style.feedback__slider}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                slidesPerView={1}
                spaceBetween={50}
                navigation
                loop={true}
                keyboard={{ enable: true }}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
            >
                <SwiperSlide className={style.feedback__slide}>
                    <img src="img/feedback/feedback1.jpeg" />
                </SwiperSlide>
                <SwiperSlide className={style.feedback__slide}>
                    <img src="img/feedback/feedback1.jpeg" />
                </SwiperSlide>
                <SwiperSlide className={style.feedback__slide}>
                    <img src="img/feedback/feedback1.jpeg" />
                </SwiperSlide>
                <SwiperSlide className={style.feedback__slide}>
                    <img src="img/feedback/feedback1.jpeg" />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
export default Feedback;    