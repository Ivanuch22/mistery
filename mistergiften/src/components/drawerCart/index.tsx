import React from "react";
import { Link } from "react-router-dom";
interface PropTypes {
  smallButton: boolean;
  Cart?: any;
  action: string;
  onLike: any;
  increment?: any;
  decrement?: any;
  setOpenBasket?: any;
  removeAdd?: any;
  setOpenLike?: any;
}
const DrawerCart: React.FC<PropTypes> = ({
  removeAdd,
  smallButton,
  Cart,
  onLike,
  action,
  increment,
  decrement,
  setOpenBasket,
  setOpenLike,
}) => {
  console.log(action);
  const CheckData = () => {
    if (smallButton) {
      return (
        <>
          <p className="drawer__cart-minus" onClick={(e) => decrement(e, Cart)}>
            -
          </p>
          <p className="drawer__cart-counter">{Cart.count ? Cart.count : 0}</p>
          <p className="drawer__cart-plus" onClick={(e) => increment(e, Cart)}>
            +
          </p>
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="drawer__cart">
      <div className="drawer__cart-img-block">
        <img
          width="200px"
          height="200px"
          decoding="async"
          src={`${process.env.PUBLIC_URL}/img/${Cart.images[0]}`}
          className="drawer__cart-img"
          alt={Cart.name}
        />
      </div>
      <div className="drawer__cart-text">
        <Link
          aria-activedescendant={"Перейти до " + Cart.name}
          to={`/${Cart.id}`}
          onClick={() =>
            action === "add"
              ? setOpenBasket && setOpenBasket(false)
              : setOpenLike(false) && setOpenLike
          }
        >
          <h4 className="drawer__cart-title">{Cart.name}</h4>
        </Link>
        {Cart.type.length > 0 ? (
          <p className="drawer__cart-type">
            {`Чашка: ${
              Cart.type.filter((element: any) => element.isActive)[0].name
            }`}
          </p>
        ) : null}
        <div className="drawer__cart-text-wrapper">
          <CheckData />

          <p className="drawer__cart-price">
            {Cart.count ? Cart.price * Cart.count : Cart.price} ₴
          </p>
        </div>
      </div>

      <div
        onClick={(e) => (action === "add" ? removeAdd(Cart) : onLike(e, Cart))}
        className="drawer__button-remove"
      ></div>
    </div>
  );
};
export default DrawerCart;
