import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";

import Slider from "src/components/slider";
import QuestionLabel from "src/components/question";
import ImageModal from "src/components/modalImg";

import {
  Navigation,
  FreeMode,
  Pagination,
  Zoom,
  EffectFade,
} from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface MyComponentProps {
  cards: any;
  onLike: any;
  onAdd: any;
  changeType: any;
  loading: boolean;
}

const CartPage: React.FC<MyComponentProps> = ({
  loading,
  cards,
  onLike,
  onAdd,
  changeType,
}) => {
  const swiperRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [isTypeOpen, setTypeOpen] = useState(false);
  const { id } = useParams();
  const [openedCart, setOpenedCart] = useState({
    id: "",
    name: "",
    price: 0,
    oldPrice: 0,
    description: "",
    about: "",
    imgOrdered: [],
    images: [],
    type: [],
    isLike: false,
    isAdd: false,
    features: {},
  });
  useEffect(() => {
    setTimeout(() => {
      swiperRef.current.swiper.slideTo(0);
    }, 500);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const openedCarts = cards.filter((element: any) => element.id === id);
    setOpenedCart(openedCarts[0]);
  }, [cards, openedCart, id]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ShowOrderedCups = () => {
    if (openedCart.imgOrdered === undefined) {
      return null;
    }
    return openedCart.imgOrdered.map((imgUrl: string, index: number) => {
      return (
        <img
          width="200px"
          height="200px"
          decoding="async"
          onClick={() =>
            handleImageClick(`${process.env.PUBLIC_URL}/img/${imgUrl}`)
          }
          alt="cup, custom cup"
          className="CartPage__orderedImg"
          src={`${process.env.PUBLIC_URL}/img/${imgUrl}`}
          key={index}
        />
      );
    });
  };

  const ShowCheckBoxs = () => {
    const ShowActiveBoxs = () => {
      let imgUrl = "";
      if (openedCart) {
        return openedCart.type.map((element: any, index: number) => {
          switch (index) {
            case 0:
              imgUrl = openedCart.images[0];
              break;
            case 1:
              imgUrl = openedCart.images[openedCart.images.length - 2];
              break;
            case 2:
              imgUrl = openedCart.images[openedCart.images.length - 1];
              break;
          }
          if (element.isActive) {
            return (
              <div key={index}>
                <h3 className="CartPage__checkBoxs_title">Чашка:</h3>
                <div
                  onClick={() => setTypeOpen(true)}
                  className="CartPage__checkBoxs_active"
                >
                  <img
                    width="200px"
                    height="200px"
                    decoding="async"
                    className="CartPage__checkBoxs_img"
                    src={`${process.env.PUBLIC_URL}/img/${imgUrl}`}
                    alt="cups, чашка, тип чашки, кастомна чашка"
                  />
                  <h3 className="CartPage__checkBoxs_title">{element.name}</h3>
                </div>
              </div>
            );
          }
        });
      }
    };
    const ShowOther = () => {
      if (openedCart) {
        return openedCart.type.map((element: any, index: number) => {
          let indexSlide = 0;
          if (index === 2) {
            indexSlide = openedCart.images.length - 1;
          }
          if (index === 1) {
            indexSlide = openedCart.images.length - 2;
          }
          if (index === 0) {
            indexSlide = 0;
          }
          return (
            <div
              onClick={() => {
                setTypeOpen(false);
                changeType(element, openedCart);
                swiperRef.current.swiper.slideTo(indexSlide);
              }}
              className={
                element.isActive
                  ? "CartPage__checkBoxs_row CartPage__checkBoxs_row--active "
                  : "CartPage__checkBoxs_row "
              }
              key={index}
            >
              <img
                width="200px"
                height="200px"
                decoding="async"
                className="CartPage__checkBoxs_img"
                alt="cups, чашка, тип чашки, кастомна чашка одна із"
                src={`${process.env.PUBLIC_URL}/img/${openedCart.images[indexSlide]}`}
              />
              <h3 className="CartPage__checkBoxs_title">{element.name}</h3>
            </div>
          );
        });
      }
    };
    return (
      <div className="CartPage__checkBoxs_block">
        <ShowActiveBoxs />
        <div
          className={
            isTypeOpen
              ? "CartPage__checkBoxs_wrapper CartPage__checkBoxs_wrapper--active"
              : "CartPage__checkBoxs_wrapper"
          }
        >
          <ShowOther />
        </div>
      </div>
    );
  };
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return (
        '<span class="' +
        className +
        '">' +
        `<img               width="200px"
        height="200px"
        decoding="async" alt="" src ="${process.env.PUBLIC_URL}/img/${openedCart.images[index]}"/>` +
        "</span>"
      );
    },
  };

  const setHTMLForDescription = (obj: any) => {
    let description = "";
    if (obj) {
      description = obj.about ? obj.about : "";
      for (const key in obj.features) {
        if (key === "text") {
          description += `<span>${obj ? obj.features[key] : null}</span>`;
        } else {
          description += `
          <div className="descriptionTab">
            ${key}: <span className="bold">${
            obj ? obj.features[key] : null
          }</span>
          </div>`;
        }
      }
      return description;
    }
  };

  return (
    <div className="CartPage">
      <ImageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageUrl={selectedImageUrl}
      />
      <div className="CartPage__wrapper">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Zoom, FreeMode, Pagination, EffectFade]}
          effect={"fade"}
          // zoom={true}
          className="CartPage__slider"
          slidesPerView={1}
          navigation={true}
          loop={true}
          pagination={pagination}
        >
          {openedCart
            ? openedCart.images.map((img: string, index: number) => {
                return (
                  <SwiperSlide className="CartPage__slide" key={index}>
                    <img
                      width="200px"
                      height="200px"
                      decoding="async"
                      onClick={(event) => {
                        console.log(img);
                        handleImageClick(
                          `${process.env.PUBLIC_URL}/img/${img}`
                        );
                      }}
                      alt="cups, чашка, тип чашки, кастомна чашка"
                      className="CartPage__img"
                      src={`${process.env.PUBLIC_URL}/img/${img}`}
                    />
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
        <div className="CartPage__text_wrapper">
          <h2 className="CartPage__title">
            {openedCart ? openedCart.name : null}
          </h2>
          <div className="CartPage__row">
            <span className="CartPage__price">
              {openedCart ? openedCart.price : null} ₴
            </span>
            <span className="CartPage__oldPrice">
              {openedCart ? openedCart.oldPrice : null} ₴
            </span>
          </div>
          <ShowCheckBoxs />
          <div className="CartPage__row">
            <button
              onClick={(e: any) => onAdd(e, openedCart)}
              className="CartPage__button"
            >
              Замовити
            </button>
            <button
              className={
                openedCart
                  ? openedCart.isLike
                    ? "CartPage__like CartPage__like_active"
                    : "CartPage__like"
                  : ""
              }
              onClick={(e) => onLike(e, openedCart)}
            >
              <svg
                width="26"
                height="23"
                viewBox="0 0 26 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.3095 7.82226C24.3095 14.1423 13 20.8677 13 20.8677C13 20.8677 1.69043 14.1423 1.69043 7.82226C1.69043 -0.758756 13 -0.642878 13 6.90926C13 -0.642878 24.3095 -0.529907 24.3095 7.82226Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p
            className="CartPage__text"
            dangerouslySetInnerHTML={{
              __html: openedCart ? openedCart.description : "",
            }}
          ></p>
        </div>
      </div>
      {openedCart ? (
        openedCart.imgOrdered.length > 0 ? (
          <div className="CartPage__block">
            <h2 className="CartPage__block_title">
              Чашки, які вже замовили з цим дизайном
            </h2>
            <div className="CartPage__block_wrapper">
              <ShowOrderedCups />
            </div>
          </div>
        ) : null
      ) : null}
      <QuestionLabel
        title="Детальніше про продукт"
        description={setHTMLForDescription(openedCart)}
      />
      <QuestionLabel
        title="Доставка і оплата"
        description={`Оформлені до 18:00 замовлення відправляємо в той же день!\n
Доставка Новою Поштою 1-3 дні\n
Оплатити замовлення можна при отриманні на Новій пошті (*крім кастомних чашок), або по передплаті на банківський рахунок.`}
      />

      <Slider
        loading={loading}
        title={"Вам також може сподобатись:"}
        onLike={onLike}
        data={cards}
      />
    </div>
  );
};
export default CartPage;
