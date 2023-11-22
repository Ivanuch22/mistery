import { useState } from "react";
import style from "./style.module.scss"

const Cart = ({ name, price, oldPrice, redText, images }) => {
  const [isLike, setLike] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [firstImg, secondImg] = images;
  return (
    <div className={style.slider__cart}>
      <div className={style.slider__cartImgBlock}>
        <img className={style.slider__cartImgFirst} src={`img/carts/${firstImg}`} />
        <img className={style.slider__cartImgSecond} src={`img/carts/${secondImg}`} />
      </div>
      <h3 className={style.slider__cartTitle}>{name}</h3>
      <div className={style.slider__cartPrice}>
        <span className={style.slider__cartPriceCurrent}>{price}$</span>
        <span className={style.slider__cartPriceOld}>{oldPrice}$</span>
      </div>
      <button
        className={style.slider__cartButton}
        onClick={() => setAdd((status) => !status)}
      >
        Додати в кошик
      </button>
      <button
        className={style.slider__cartLike}
        onClick={() => setLike((status) => !status)}
      >
        <img src="img/heart-svgrepo-com.svg" />
      </button>
      <span className={style.slider__cartButtonRed}>{redText}</span>
    </div>
  );
};

export default Cart;
