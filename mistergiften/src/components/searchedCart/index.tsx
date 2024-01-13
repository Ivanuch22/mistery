import React from "react";
import { Link } from "react-router-dom";
interface ISearchCart {
  Cart: any;
  setValue: any;
}

const SearchedCarts: React.FC<ISearchCart> = ({ setValue, Cart }) => {
  return (
    <div className="drawer__cart searchCart">
      <div className="drawer__cart-img-block">
        <img
          width="40px"
          height="40px"
          decoding="async"
          src={`${process.env.PUBLIC_URL}/img/${Cart.images[0]}`}
          className="drawer__cart-img"
          alt={`Чашка з фото ${Cart.name}`}
        />
      </div>
      <div className="drawer__cart-text">
        <Link onClick={() => setValue("")} to={`/${Cart.id}`}>
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
          <p className="drawer__cart-price">
            {Cart.count ? Cart.price * Cart.count : Cart.price} ₴
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchedCarts;
