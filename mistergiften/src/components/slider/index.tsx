import Cart from "../cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/scrollbar";
import React, { useEffect, useState } from "react";
import NotLoadedCarts from "../notLoadedCarts ";
interface YourComponentProps {
  title?: string;
  data: Array<any>;
  onLike?: any;
  loading: boolean;
  onAdd?: any;
}
const Slider: React.FC<YourComponentProps> = ({
  loading,
  onAdd,
  title,
  data,
  onLike,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
  }, [isMobile]);

  const showCarts = () => {
    return data.map((cart, index) => (
      <SwiperSlide key={index}>
        <Link to={`/${cart.id}`} aria-label={`Перейти до ${cart.name}`}>
          <Cart carts={data} cart={cart} onAdd={onAdd} onLike={onLike} />
        </Link>
      </SwiperSlide>
    ));
  };
  return (
    <section className="popular">
      <h2 className="popular__title title">{title}</h2>
      <div className={isMobile ? "popular__slider slider" : "grid-container"}>
        {isMobile ? (
          <Swiper
            className="slider__row"
            modules={[FreeMode, Scrollbar]}
            freeMode={true}
            breakpoints={{
              0: {
                slidesPerView: 1.3,
                spaceBetween: 35,
              },
              580: {
                slidesPerView: 2.5,
                spaceBetween: 35,
              },
            }}
          >
            {loading ? <NotLoadedCarts isSlider={true} /> : showCarts()}
          </Swiper>
        ) : loading ? (
          <NotLoadedCarts isSlider={true} />
        ) : (
          data.map((cart, index) => (
            <Link
              aria-label={`Перейти до ${cart.name}`}
              key={index}
              to={`/${cart.id}`}
            >
              <Cart carts={data} cart={cart} onAdd={onAdd} onLike={onLike} />
            </Link>
          ))
        )}
      </div>
    </section>
  );
};
export default Slider;
