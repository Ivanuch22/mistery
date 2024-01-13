import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

const AdminPage = () => {
  document.body.style.overflow = "hidden";
  return (
    <div className="Admin">
      <div className="Admin__wrapper">
        <div className="Admin__row">
          <button className="Admin__button_top Admin__button_top_active">
            Типи
          </button>
          <button className="Admin__button_top">Карточки</button>
        </div>
        <AdminTypes />
        <ModalType />
        <AdminCards />
        <ModalCard />
      </div>
    </div>
  );
};

const AdminTypes = () => {
  return (
    // TypeActive
    <div className=" Type  ">
      <div className="Admin__row">
        <input className="Admin__input" placeholder="Добавити новий тип..." />
        <button className="Admin__button">Добавити новий тип...</button>
      </div>
      <div className="Admin__type">
        <h3 className="Admin__type_text">Big size</h3>
        <button className="Admin__type_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 13.3334H14"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 2.3332C11.2652 2.06799 11.6249 1.91899 12 1.91899C12.1857 1.91899 12.3696 1.95557 12.5412 2.02664C12.7128 2.09771 12.8687 2.20188 13 2.3332C13.1313 2.46453 13.2355 2.62043 13.3066 2.79201C13.3776 2.96359 13.4142 3.14749 13.4142 3.3332C13.4142 3.51892 13.3776 3.70282 13.3066 3.8744C13.2355 4.04598 13.1313 4.20188 13 4.3332L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.3332Z"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="Admin__type_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 4H3.33333H14"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.33331 4.00003V2.66669C5.33331 2.31307 5.47379 1.97393 5.72384 1.72388C5.97389 1.47383 6.31302 1.33336 6.66665 1.33336H9.33331C9.68694 1.33336 10.0261 1.47383 10.2761 1.72388C10.5262 1.97393 10.6666 2.31307 10.6666 2.66669V4.00003M12.6666 4.00003V13.3334C12.6666 13.687 12.5262 14.0261 12.2761 14.2762C12.0261 14.5262 11.6869 14.6667 11.3333 14.6667H4.66665C4.31302 14.6667 3.97389 14.5262 3.72384 14.2762C3.47379 14.0261 3.33331 13.687 3.33331 13.3334V4.00003H12.6666Z"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66669 7.33337V11.3334"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.33331 7.33337V11.3334"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
const AdminCards = () => {
  return (
    <>
      <div className="Admin__row">
        <input className="Admin__input" placeholder="Добавити нову карточку" />
        <button className="Admin__button">Добавити</button>
      </div>
      <div className="Admin__row">
        <input
          className="Admin__input"
          type="text"
          placeholder="Пошук по назві.."
        />
        <button className="Admin__button">Знайти</button>
      </div>
      <div>
        <AdminCart />
        <AdminCart />
        <AdminCart />
      </div>
    </>
  );
};

const ModalType = () => {
  return (
    <div className="TypeModal Modal">
      <div className="TypeModal__wrapper Modal__wrapper">
        <button className="TypeModal__close"></button>
        <h2 className="TypeModal__title">Big size</h2>
        <div className="Admin__row">
          <input
            className="Admin__input"
            type="text"
            placeholder="Пошук по назві.."
          />
          <button className="Admin__button">Знайти</button>
        </div>
        <AdminCart />
        <AdminCart />
        <AdminCart />
      </div>
    </div>
  );
};

const ModalCard = () => {
  return (
    <div className="ModalCard Modal">
      <div className="Modal__wrapper ">
        <button className="TypeModal__close"></button>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={20}
          className="ModalCard__slider"
        >
          <SwiperSlide className="ModalCard__slide">
            <div className="ModalCard__img_block">
              <img
                className="ModalCard__img"
                src={`${process.env.PUBLIC_URL}/img/carts/5.png`}
              />
              <button className="ModalCard__img_button_delete ModalCard__img_button">
                <img
                  src={`${process.env.PUBLIC_URL}/img/delete-left-svgrepo-com.svg`}
                />
              </button>
              <button className="ModalCard__img_button_change ModalCard__img_button">
                <input type="file" accept="image/png, image/jpeg" />
                <img
                  src={`${process.env.PUBLIC_URL}/img/change-camera-basic-svgrepo-com.svg`}
                />
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="ModalCard__slide">
            <div className="ModalCard__img_block">
              <img
                className="ModalCard__img"
                src={`${process.env.PUBLIC_URL}/img/carts/5.png`}
              />
              <button className="ModalCard__img_button_delete ModalCard__img_button">
                <img
                  src={`${process.env.PUBLIC_URL}/img/delete-left-svgrepo-com.svg`}
                />
              </button>
              <button className="ModalCard__img_button_change ModalCard__img_button">
                <input type="file" accept="image/png, image/jpeg" />
                <img
                  src={`${process.env.PUBLIC_URL}/img/change-camera-basic-svgrepo-com.svg`}
                />
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="ModalCard__slide">
            <div className="ModalCard__img_block">
              <img
                className="ModalCard__img"
                src={`${process.env.PUBLIC_URL}/img/carts/5.png`}
              />
              <button className="ModalCard__img_button_delete ModalCard__img_button">
                <img
                  src={`${process.env.PUBLIC_URL}/img/delete-left-svgrepo-com.svg`}
                />
              </button>
              <button className="ModalCard__img_button_change ModalCard__img_button">
                <input type="file" accept="image/png, image/jpeg" />
                <img
                  src={`${process.env.PUBLIC_URL}/img/change-camera-basic-svgrepo-com.svg`}
                />
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="ModalCard__slide">
            <div className="ModalCard__img_block ModalCard__img_block_last ">
              <button className="ModalCard__img_button_change ModalCard__img_button">
                <input type="file" accept="image/png, image/jpeg" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12H18M12 6V18"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="ModalCard__wrapper">
          <h2 className="ModalCard__title">Назва*</h2>
          <input
            className="ModalCard__description"
            type="text"
            placeholder="Наприклад  Чашка `Ти моя киця"
          />
          <h2 className="ModalCard__title">Тип:</h2>
          <div className="ModalCard__radio">
            <input
              type="radio"
              id="contactChoice1"
              name="contact"
              value="none"
              checked
            />
            <label htmlFor="contactChoice1">Немає</label>

            <input
              type="radio"
              id="contactChoice2"
              name="contact"
              value="chameleon"
            />
            <label htmlFor="contactChoice2">Є</label>
          </div>
          <h2 className="ModalCard__title">Ціна*</h2>
          <input className="ModalCard__description red" type="number" />
          <h2 className="ModalCard__title">Стара ціна*</h2>
          <input className="ModalCard__description grey" type="number" />
        </div>
        <h2 className="ModalCard__title"> Опис</h2>
        <textarea className="ModalCard__description"></textarea>
        <h2 className="ModalCard__title">Характеристики </h2>
        <textarea className="ModalCard__description"></textarea>
        <div className="ModalCard__row">
          <button className="ModalCard__button">Зберегти</button>
          <button className="ModalCard__button">Видалити</button>
        </div>
      </div>
    </div>
  );
};

const AdminCart = () => {
  return (
    <div className="Type__row">
      <div className="Type__img_wrapper">
        <img
          className="Type__img"
          src={`${process.env.PUBLIC_URL}/img/carts/57086714.png`}
        />
      </div>
      <div className="Type__text_wrapper">
        <h3 className="Type__title">Чашка “Ти моя киця”</h3>
        <span className="Type__price">399 $</span>
        <span className="Type__oldPrice"> 499 $</span>
      </div>
      <div className="Type__wrapper">
        <button className="Type__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 13.3335H14"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="Type__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 4H3.33333H14"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.33331 4.00004V2.66671C5.33331 2.31309 5.47379 1.97395 5.72384 1.7239C5.97389 1.47385 6.31302 1.33337 6.66665 1.33337H9.33331C9.68694 1.33337 10.0261 1.47385 10.2761 1.7239C10.5262 1.97395 10.6666 2.31309 10.6666 2.66671V4.00004M12.6666 4.00004V13.3334C12.6666 13.687 12.5262 14.0261 12.2761 14.2762C12.0261 14.5262 11.6869 14.6667 11.3333 14.6667H4.66665C4.31302 14.6667 3.97389 14.5262 3.72384 14.2762C3.47379 14.0261 3.33331 13.687 3.33331 13.3334V4.00004H12.6666Z"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66669 7.33337V11.3334"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.33331 7.33337V11.3334"
              stroke="#C8CAD8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
