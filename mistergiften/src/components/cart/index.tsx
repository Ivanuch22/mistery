import React from "react";
import style from "./style.module.scss";

interface PropTypes {
  cart: any;
  onLike: any;
  carts?: any;
  onAdd?: any;
}

const Cart: React.FC<PropTypes> = ({ onLike, cart, onAdd }) => {
  const [firstImg] = cart.images;
  return (
    <>
      <div className={style.slider__cart}>
        <div className={style.slider__cartImgBlock}>
          <img
            loading="lazy"
            decoding="async"
            width="200px"
            height="200px"
            className={style.slider__cartImgFirst}
            src={`${process.env.PUBLIC_URL}/img/${firstImg}`}
            alt={cart.name}
          />
        </div>
        <h3 className={style.slider__cartTitle}>{cart.name}</h3>
        <div className={style.slider__cartPrice}>
          <span className={style.slider__cartPriceCurrent}>{cart.price}₴</span>
          <span className={style.slider__cartPriceOld}>{cart.oldPrice}₴</span>
        </div>
        <button
          aria-label="Додати цей товар до кошика"
          className={style.slider__cartButton}
          onClick={(e) => onAdd(e, cart)}
        >
          Додати в кошик
        </button>
        <button
          aria-label="Додати цей товар до вподобаного"
          className={
            cart.isLike
              ? `${style.slider__cartLike} ${style.slider__cartLike_active}`
              : `${style.slider__cartLike}`
          }
          onClick={(e) => onLike(e, cart)}
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
        {cart.redText.length > 2 ? (
          <span
            dangerouslySetInnerHTML={{ __html: cart.redText }}
            className={style.slider__cartButtonRed}
          >
            {}
          </span>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
