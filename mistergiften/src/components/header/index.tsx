import React, { useEffect, useState } from "react";
import OnLikeText from "../onLikeText";
import DrawerCart from "../drawerCart";
import { NavLink } from "react-router-dom";
import Basket from "../basket";

interface PropsType {
  isLikeOpen?: boolean | undefined;
  setOpenLike?: (status: boolean) => void;
  isBasketOpen?: boolean | undefined;
  setOpenBasket?: (status: boolean) => void;
  updateCardLike?: any;
  updateCardAdd?: any;
  carts?: [];
  onLike: any;
}
interface header {
  likedCart: any;
  onLike: any;
  addedCart: any;
  increment: any;
  decrement: any;
  removeAdd?: any;
  setAddedCarts: any;
  classLikeText: any;
  removeAllAdded: any;
}
interface Like {
  likedCart: any;
  setOpenLike: any;
  classeForButton: any;
  onLike: any;
}

interface Add {
  addedCart: any;
  classForText: any;
  price: any;
  setOpenAdd: any;
  classeForButton: any;
}

const LikedCart: React.FC<PropsType> = ({
  isLikeOpen,
  setOpenLike,
  onLike,
  carts,
}) => {
  const closeMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
    const clickedElement = event.target as HTMLDivElement;
    if (clickedElement.className === "like like--active") {
      setOpenLike ? setOpenLike(false) : console.log("not foutn function");
    } else {
      console.log("No");
    }
  };
  const dataLenght = carts?.length;
  return (
    <section
      onClick={(e: any) => closeMenu(e)}
      className={isLikeOpen ? "like like--active" : "like"}
    >
      <div className="like__wrapper">
        <h2 className="like__title">
          Уподобане:
          <span
            className="like__exit "
            onClick={() => setOpenLike && setOpenLike(!isLikeOpen)}
          ></span>
        </h2>

        {dataLenght ? (
          <div className="like__block">
            {carts.map((cart: any, index: number) => {
              return (
                <DrawerCart
                  setOpenLike={setOpenLike}
                  onLike={onLike}
                  Cart={cart}
                  smallButton={false}
                  action="like"
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="like__nothing">
            <h2 className="like__text">Ви ще нічого не вподобали</h2>
            <button
              className="like__button"
              onClick={() => setOpenLike && setOpenLike(!isLikeOpen)}
            >
              ВПОДОБАТИ
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const LikeButton: React.FC<Like> = ({
  classeForButton,
  likedCart,
  setOpenLike,
}) => {
  return (
    <button
      className={`LikeButton`}
      style={
        likedCart.length > 0
          ? { opacity: "1", zIndex: "3" }
          : { opacity: "0", zIndex: "-1233" }
      }
      onClick={() => setOpenLike(true)}
    >
      <div className={`LikeButton__wrapper ${classeForButton}`}>
        <svg
          width="34"
          height="34"
          viewBox="0 0 26 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.3095 7.82226C24.3095 14.1423 13 20.8677 13 20.8677C13 20.8677 1.69043 14.1423 1.69043 7.82226C1.69043 -0.758756 13 -0.642878 13 6.90926C13 -0.642878 24.3095 -0.529907 24.3095 7.82226Z"
            stroke="#444ad3"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="header__mobile_number header__mobile_number_blue">
        {likedCart.length}
      </span>
    </button>
  );
};

const AddButton: React.FC<Add> = ({
  addedCart,
  price,
  classForText,
  classeForButton,
  setOpenAdd,
}) => {
  return (
    <button
      className={`AddButton ${classeForButton}`}
      style={
        addedCart.length
          ? { opacity: "1", zIndex: "3" }
          : { opacity: "0", zIndex: "-1233" }
      }
      onClick={() => setOpenAdd(true)}
    >
      <div className={`AddButton__wrapper ${classeForButton}`}>
        <div className={`${classForText}`}>{price}</div>
        <img
          width="40px"
          height="40px"
          decoding="async"
          src={`${process.env.PUBLIC_URL}/img/shopping-bag-shopper-svgrepo-com.svg`}
          alt="button for adding carts in basket"
        />
      </div>
      <span className="header__mobile_number header__mobile_number_red">
        {addedCart.length}
      </span>
    </button>
  );
};

const Header: React.FC<header> = ({
  removeAllAdded,
  setAddedCarts,
  removeAdd,
  classLikeText,
  onLike,
  likedCart,
  addedCart,
  decrement,
  increment,
}) => {
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [isBasketOpen, setOpenBasket] = useState(false);
  const [isLikeOpen, setOpenLike] = useState(false);
  const [classeLike, setLikeClass] = useState("LikeButton_animation");
  const [classeAdd, setAddClass] = useState("LikeButton_animation");
  const [addedCartPrice, setAddedPrice] = useState(0);
  const [boxsPriceBasket, setBoxsPriceBasket] = useState(0);
  const [price, setPrice] = useState(0);
  const [classForText, setClassForText] = useState("TextShow");

  useEffect(() => {
    animation("like");
  }, [likedCart]);

  useEffect(() => {
    animation("add");
  }, [addedCart]);

  useEffect(() => {
    let number = 0;
    addedCart.forEach((element: any) => {
      let ss = element.price * element.count;
      number += ss;
    });
    setAddedPrice(number);
  }, [addedCart]);

  useEffect(() => {
    setPrice(boxsPriceBasket + addedCartPrice);
  }, [boxsPriceBasket, addedCartPrice]);

  useEffect(() => {
    console.log(addedCartPrice);
  }, [addedCartPrice]);

  const animation = (button: any) => {
    if (button === "like") {
      setLikeClass((prevValue: any) => (prevValue = "LikeButton_animation"));
      setTimeout(() => {
        setLikeClass((prevValue: any) => (prevValue = ""));
      }, 1000);
    } else {
      setAddClass("LikeButton_animation");
      setClassForText("TextShow TextShow_active");
      setTimeout(() => {
        setAddClass((prevValue: any) => (prevValue = ""));
        setClassForText("TextShow");
      }, 500);
    }
  };
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  isBasketOpen || isMenuOpen || isLikeOpen
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const closeMenu = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ): void => {
    if (event.currentTarget.classList[0] === "header__menu") {
      setOpenMenu(false);
    } else {
      console.log("No");
    }
  };
  return (
    <>
      {likedCart.length ? (
        <OnLikeText
          classLikeText={classLikeText}
          name={likedCart[likedCart.length - 1].name}
        />
      ) : null}
      <LikeButton
        onLike={onLike}
        classeForButton={classeLike}
        likedCart={likedCart}
        setOpenLike={setOpenLike}
      />
      <AddButton
        price={price}
        classForText={classForText}
        addedCart={addedCart}
        classeForButton={classeAdd}
        setOpenAdd={setOpenBasket}
      />
      <LikedCart
        carts={likedCart}
        onLike={onLike}
        isLikeOpen={isLikeOpen}
        setOpenLike={setOpenLike}
      />
      <Basket
        removeAllAdded={removeAllAdded}
        price={price}
        setBoxsPriceBasket={setBoxsPriceBasket}
        decrement={decrement}
        increment={increment}
        onLike={onLike}
        carts={addedCart}
        isBasketOpen={isBasketOpen}
        setOpenBasket={setOpenBasket}
        removeAdd={removeAdd}
        boxsPriceBasket={boxsPriceBasket}
      />
      <header className="header">
        <div className="container">
          <NavLink
            to={""}
            onClick={() => {
              setOpenMenu(false);
              scrollToTop();
            }}
          >
            <div className="header__logo">
              <img
                width="40px"
                height="40px"
                decoding="async"
                src={`${process.env.PUBLIC_URL}/img/logo.png`}
                className="header__img"
                alt="mister giften logo"
              />
            </div>
          </NavLink>
          <div
            onClick={(
              e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
            ): void => closeMenu(e)}
            className={
              isMenuOpen
                ? " header__menu header__menu--active"
                : "header__menu "
            }
          >
            <div
              className={
                isMenuOpen
                  ? "header__wrapper header__wrapper--active"
                  : "header__wrapper"
              }
            >
              <nav className="header__menu-block">
                <ul className="header__menu-block">
                  <li className="header__menu_li">
                    <NavLink
                      to={"/cupsWidthPhotos"}
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      className="header__menu-block-link"
                    >
                      Чашки з фото
                    </NavLink>
                  </li>
                  <li className="header__menu_li">
                    <NavLink
                      to={"/chameleon"}
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      className="header__menu-block-link"
                    >
                      Чашки з хамелеон
                    </NavLink>
                  </li>
                  <li className="header__menu_li">
                    {" "}
                    <NavLink
                      to={"/BigSize"}
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      className="header__menu-block-link"
                    >
                      Big Size
                    </NavLink>
                  </li>
                  <li className="header__menu_li">
                    {" "}
                    <NavLink
                      to={"/Boxs"}
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      className="header__menu-block-link"
                    >
                      Бокси
                    </NavLink>
                  </li>
                  <li className="header__menu_li">
                    {" "}
                    <NavLink
                      to={"/Delivery"}
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      className="header__menu-block-link"
                    >
                      Доставка
                    </NavLink>
                  </li>
                  <li className="header__menu_li">
                    {" "}
                    <NavLink
                      to={"/AboutUs"}
                      onClick={() => {
                        setOpenMenu(false);
                        scrollToTop();
                      }}
                      className="header__menu-block-link"
                    >
                      Про нас
                    </NavLink>
                  </li>
                  <li className="header__menu_li">
                    <NavLink to={""}>
                      <p className="header__menu-description">
                        Mr.Gifter- найдивовижніші подарунки!
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <div className="header__menu-social-block">
                <a
                  href="https://www.instagram.com/mister.gifter/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="40px"
                    height="40px"
                    decoding="async"
                    className="header__menu-social-img"
                    src={`${process.env.PUBLIC_URL}/img/instagram-svgrepo-com.svg`}
                    alt="mistergiften instagram"
                  />
                </a>
                <a
                  href="https://t.me/mister_gifter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="40px"
                    height="40px"
                    decoding="async"
                    className="header__menu-social-img"
                    src={`${process.env.PUBLIC_URL}/img/telegram-svgrepo-com.svg`}
                    alt="mistergiften social"
                  />
                </a>
                <a
                  href="viber://chat?number=%2B380639652780/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/img/viber-chat-app-svgrepo-com.svg`}
                    alt="mistergiften social"
                    className="header__menu-social-img"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="header__mobile">
            <div
              className={`header__mobile-like header__mobile-link `}
              onClick={() => setOpenLike((status) => !status)}
            >
              {likedCart.length > 0 ? (
                <span className="header__mobile_number header__mobile_number_blue">
                  {likedCart.length}
                </span>
              ) : null}

              <img
                width="40px"
                height="40px"
                decoding="async"
                className={classeLike}
                alt="mistergiften social"
                src={`${process.env.PUBLIC_URL}/img/love-svgrepo-com.svg`}
              />
            </div>
            <div
              className="header__mobile-cart header__mobile-link"
              onClick={() => setOpenBasket((status) => !status)}
            >
              {addedCart.length ? (
                <span className="header__mobile_number header__mobile_number_red">
                  {addedCart.length}
                </span>
              ) : null}

              <img
                width="40px"
                height="40px"
                decoding="async"
                className={classeAdd}
                alt="mistergiften social"
                src={`${process.env.PUBLIC_URL}/img/cart-svgrepo-com.svg`}
              />
            </div>
            <div
              className={
                isMenuOpen
                  ? "header__mobile-button header__mobile-link header__mobile-button--active"
                  : "header__mobile-button header__mobile-link"
              }
              onClick={() => setOpenMenu((status) => !status)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
