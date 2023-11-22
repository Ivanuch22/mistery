import "./footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="img/logo.svg" />
      </div>
      <ul className="footer__menu">
        <li className="footer__link">Чашки</li>
        <li className="footer__link">Big Size</li>
        <li className="footer__link">Кастомні чашки</li>
        <li className="footer__link">Бокси</li>
        <li className="footer__link">Про нас</li>
        <li className="footer__link">Доставка</li>
        <li className="footer__link">Політика конфіденційності</li>
        <li className="footer__link">Договір публічної оферти</li>
      </ul>
      <ul className="footer__social">
        <li className="footer__social-link">
          <img
            className="footer__social-img"
            src="img/instagram-svgrepo-com.svg"
          />
        </li>
        <li className="footer__social-link">
          <img
            className="footer__social-img"
            src="img/telegram-svgrepo-com.svg"
          />
        </li>
        <li className="footer__social-link">
          <img
            className="footer__social-img"
            src="img/viber-chat-app-svgrepo-com.svg"
          />
        </li>
        <li className="footer__social-link">
          <img
            className="footer__social-img"
            src="img/phone-call-svgrepo-com.svg"
          />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
