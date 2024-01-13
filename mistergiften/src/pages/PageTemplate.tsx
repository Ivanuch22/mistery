import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Cart from "src/components/cart";
import NotLoadedCarts from "src/components/notLoadedCarts ";
import QuestionLabel from "src/components/question";

interface PropsType {
  carts?: Array<any>;
  onLike: any;

  description?: string;
  title?: string;
  isShowCarts: boolean;
  isShowText: boolean;
  isShowLables: boolean;
  onAdd: any;
  loading: any;
}
const PageTemplate: React.FC<PropsType> = ({
  loading,
  carts,
  onAdd,
  onLike,

  isShowLables,
  isShowText,
  isShowCarts,
  title,
  description,
}) => {
  const showCarts = (): ReactNode[] => {
    return carts
      ? carts.map((cart, index) => (
          <Link
            aria-label={"Перейти до " + cart.name}
            to={`/${cart.id}`}
            key={cart.id}
          >
            <Cart onAdd={onAdd} carts={carts} cart={cart} onLike={onLike} />
          </Link>
        ))
      : [];
  };

  return (
    <>
      <div className="page__wrapper">
        {isShowCarts ? loading ? <NotLoadedCarts /> : showCarts() : null}
      </div>
      <div className="page__container">
        {isShowLables ? (
          <>
            <QuestionLabel
              title="Детальніше про продукт"
              description={`Подарунковий бокс, йде тільки в комплекті з Чашкою або Бокалом. <br/> Гарантує успішну доставку, оскільки бокс окрім своєї краси, є іще і доволі міцним (В нової пошти немає шансів) Бокс прикрашений декоративним сіном - всередині і подарунковою стрічку з бантиком - ззовні.<br/><br/> і ще багато води, бла бла бла... якщо щось не розписав, напишіть мені в <a href ='https://t.me/mister_gifter'>телеграм</a>, відповідаю швидко`}
            />
            <QuestionLabel
              title="Доставка і оплата"
              description={`Оформлені до 18:00 замовлення відправляємо в той же день!<br/>
        Доставка Новою Поштою 1-3 дні`}
            />
          </>
        ) : null}
        {isShowText ? (
          <>
            <h2 className="page__title">{title}</h2>
            <p className="page__description">{description}</p>
          </>
        ) : null}
      </div>
    </>
  );
};
export default PageTemplate;
