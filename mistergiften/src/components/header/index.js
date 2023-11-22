import React, { useState } from "react";
import DrawerCart from "../drawerCart";
import { Link } from "react-router-dom";


const Header = () => {
    const [isMenuOpen, setOpenMenu] = useState(false);
    const [isBasketOpen, setOpenBasket] = useState(false);
    const [isLikeOpen, setOpenLike] = useState(false);

    isBasketOpen || isMenuOpen || isLikeOpen
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");

    const closeMenu = (element) => {
        element.target.classList[0] === "header__menu"
            ? setOpenMenu(false)
            : console.log("No");
    };
    return (
        <>
            <section className={isLikeOpen ? "like like--active" : "like"}>
                <div className="like__wrapper">
                    <h2 className="like__title">
                        Ваше замовлення:
                        <span
                            className="like__exit "
                            onClick={() => setOpenLike((status) => !status)}
                        ></span>
                    </h2>
                    <div className="like__block">
                        <DrawerCart smallButton={false} />
                        <DrawerCart smallButton={false} />
                        <DrawerCart smallButton={false} />
                    </div>
                </div>
            </section>
            <section className={isBasketOpen ? "drawer drawer--active" : "drawer"}>
                <div className="drawer__wrapper">
                    <h2 className="drawer__title">
                        Ваше замовлення:{" "}
                        <span
                            className="drawer__exit "
                            onClick={() => setOpenBasket((status) => !status)}
                        ></span>
                    </h2>
                    <div className="drawer__carts-block">
                        <DrawerCart smallButton={true} />
                        <DrawerCart smallButton={true} />
                        <DrawerCart smallButton={true} />
                    </div>
                    <div className="drawer__price">Сума 898$</div>
                    <div className="drawer__description">
                        Додай бокс для вау ефекту! ✨⬇️
                    </div>
                    <div className="drawer__row">
                        <input
                            id="drawer-box-checkbox1"
                            className="drawer__box-checkbox"
                            type="radio"
                            name="box"
                        />
                        <label for="drawer-box-checkbox1" className="drawer__box">
                            <img className="drawer__box-img" src="img/carts/low_price.jpg" />
                            <h5 className="drawer__box-title">Rafaello Box</h5>
                        </label>
                        <input
                            id="drawer-box-checkbox2"
                            className="drawer__box-checkbox"
                            type="radio"
                            name="box"
                        />
                        <label for="drawer-box-checkbox2" className="drawer__box">
                            <img className="drawer__box-img" src="img/carts/low_price.jpg" />
                            <h5 className="drawer__box-title">Rafaello Box</h5>
                        </label>
                        <input
                            id="drawer-box-checkbox3"
                            className="drawer__box-checkbox"
                            type="radio"
                            name="box"
                        />
                        <label for="drawer-box-checkbox3" className="drawer__box">
                            <img className="drawer__box-img" src="img/carts/low_price.jpg" />
                            <h5 className="drawer__box-title">Rafaello Box</h5>
                        </label>
                    </div>
                    <h4 className="drawer__text">Прізвище та Імя:</h4>
                    <input
                        className="drawer__input"
                        type="text"
                        placeholder="Прізвище Імя По-батькові"
                    />
                    <h4 className="drawer__text">Телефон:</h4>
                    <input
                        className="drawer__input"
                        type="number"
                        placeholder="+380-99-999-99-99"
                    />
                    <h4 className="drawer__text">Місто:</h4>
                    <input className="drawer__input" type="text" placeholder="м. Київ" />
                    <h4 className="drawer__text">Відділення Нової Пошти:</h4>
                    <input className="drawer__input" type="text" placeholder="№1" />
                    <h4 className="drawer__text">Коментар:</h4>
                    <input
                        className="drawer__input"
                        type="text"
                        placeholder="Залиште комендар до свого замовлення"
                    />
                    <h4 className="drawer__text">Як з вами звязатись</h4>
                    <label className="drawer__label">
                        <input
                            className="drawer__label-input"
                            type="radio"
                            name="connection"
                        />
                        <h5 className="drawer__label-title">Viber</h5>
                    </label>
                    <label className="drawer__label">
                        <input
                            className="drawer__label-input"
                            type="radio"
                            name="connection"
                        />
                        <h5 className="drawer__label-title">Telegram</h5>
                    </label>
                    <h4 className="drawer__text">Спосіб оплати</h4>
                    <label className="drawer__label">
                        <input className="drawer__label-input" type="radio" name="pay" />
                        <h5 className="drawer__label-title">Оплата онлайн з monopay</h5>
                    </label>
                    <label className="drawer__label">
                        <input className="drawer__label-input" type="radio" name="pay" />
                        <h5 className="drawer__label-title">При отриманні на пошті</h5>
                    </label>
                    <div className="drawer__price">Сума 898$</div>
                    <button className="drawer__button">Оформити замовлення</button>
                    <p className="drawer__smallText">
                        Натискаючи кнопку, ви погоджуєтесь з
                        <span>Політикою конфіденційності</span> та
                        <span>Договором публічної оферти</span>
                    </p>
                </div>
            </section>
            <header className="header">
                <Link
                    to={"/"}
                    onClick={() => setOpenMenu(false)}
                >
                    <div className="header__logo">
                        <img src="img/logo.svg" className="header__img" />
                    </div>
                </Link>
                <div
                    onClick={(e) => closeMenu(e)}
                    className={
                        isMenuOpen ? " header__menu header__menu--active" : "header__menu "
                    }
                >
                    <div
                        className={
                            isMenuOpen
                                ? "header__wrapper header__wrapper--active"
                                : "header__wrapper"
                        }
                    >
                        <ul className="header__menu-block">
                            <Link to={"/page"} onClick={() => setOpenMenu(false)} className="header__menu-block-link">Чашки з фото</Link>
                            <Link to={"/page"} onClick={() => setOpenMenu(false)} className="header__menu-block-link">Чашки з хамелеон</Link>
                            <Link to={"/page"} onClick={() => setOpenMenu(false)} className="header__menu-block-link">Big Size</Link>
                            <Link to={"/page"} onClick={() => setOpenMenu(false)} className="header__menu-block-link">Бокси</Link>
                            <Link to={"/page"} onClick={() => setOpenMenu(false)} className="header__menu-block-link">Доставка</Link>
                            <Link to={"/page"} onClick={() => setOpenMenu(false)} className="header__menu-block-link">Про нас</Link>
                        </ul>
                        <p className="header__menu-description">
                            Mr.Gifter- найдивовижніші подарунки!
                        </p>
                        <div className="header__menu-social-block">
                            <img
                                className="header__menu-social-img"
                                src="img/instagram-svgrepo-com.svg"
                            />
                            <img
                                className="header__menu-social-img"
                                src="img/telegram-svgrepo-com.svg"
                            />
                            <img
                                className="header__menu-social-img"
                                src="img/viber-chat-app-svgrepo-com.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="header__mobile">
                    <div
                        className="header__mobile-like header__mobile-link"
                        onClick={() => setOpenLike((status) => !status)}
                    >
                        <img src="img/love-svgrepo-com.svg" />
                    </div>
                    <div
                        className="header__mobile-cart header__mobile-link"
                        onClick={() => setOpenBasket((status) => !status)}
                    >
                        <img src="img/cart-svgrepo-com.svg" />
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
            </header>
        </>
    );
};

export default Header;
