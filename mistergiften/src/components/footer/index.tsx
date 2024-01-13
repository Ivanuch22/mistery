import { Link } from "react-router-dom";
import React from "react";
import "./footer.scss";
const Footer = () => {
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };
  return (
    <footer className="footer">
      <Link
        aria-activedescendant={"Перейти на головну"}
        onClick={scrollToTop}
        to={"/"}
        className="footer__logo"
      >
        <img
          src={` ${process.env.PUBLIC_URL}/img/logo.svg`}
          alt="mister giften"
        />
      </Link>
      <ul className="footer__menu">
        <Link
          aria-activedescendant={"Перейти до категорії хамелеон"}
          onClick={scrollToTop}
          to={"/chameleon"}
          className="footer__link"
        >
          Чашки
        </Link>
        <Link
          aria-activedescendant={"Перейти до категорії bigsize"}
          onClick={scrollToTop}
          to={"/BigSize"}
          className="footer__link"
        >
          Big Size
        </Link>
        <Link
          aria-activedescendant={"Перейти на сторінку Кастомні чашки"}
          onClick={scrollToTop}
          to={"/custom"}
          className="footer__link"
        >
          Кастомні чашки
        </Link>
        <Link onClick={scrollToTop} to={"/Boxs"} className="footer__link">
          Бокси
        </Link>
        <Link onClick={scrollToTop} to={"/AboutUs"} className="footer__link">
          Про нас
        </Link>
        <Link onClick={scrollToTop} to={"/Delivery"} className="footer__link">
          Доставка
        </Link>
        <Link
          onClick={scrollToTop}
          to={"/privacy-policy"}
          className="footer__link"
        >
          Політика конфіденційності
        </Link>
        <Link onClick={scrollToTop} to={"/oferta"} className="footer__link">
          Договір публічної оферти
        </Link>
      </ul>
      <ul className="footer__social">
        <li className="footer__social-link">
          <img
            width="40px"
            height="40px"
            decoding="async"
            alt="mistergiften instagram"
            className="footer__social-img"
            src={`${process.env.PUBLIC_URL}/img/instagram-svgrepo-com.svg`}
          />
        </li>
        <li className="footer__social-link">
          <img
            width="40px"
            height="40px"
            decoding="async"
            alt="mistergiften telegram"
            className="footer__social-img"
            src={`${process.env.PUBLIC_URL}/img/telegram-svgrepo-com.svg`}
          />
        </li>
        <li className="footer__social-link">
          <img
            width="40px"
            height="40px"
            decoding="async"
            alt="mistergiften viber"
            className="footer__social-img"
            src={`${process.env.PUBLIC_URL}/img/viber-chat-app-svgrepo-com.svg`}
          />
        </li>
        <li className="footer__social-link">
          <img
            width="40px"
            height="40px"
            decoding="async"
            alt="mistergiften phone"
            className="footer__social-img"
            src={`${process.env.PUBLIC_URL}/img/phone-call-svgrepo-com.svg`}
          />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
