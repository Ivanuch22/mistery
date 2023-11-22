import Cart from "../../components/cart";

import style from "./cartPage.module.scss"
const CartPage = ({ title }) => {
  return (
    <div className={style.page__wrapper}>
      {title ? <h2 className={style.page__title}>{title}</h2> : null}
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />
      <Cart
        name={`Кастомна чашка з фото "Моя ти киця"`}
        price={499}
        oldPrice={599}
        redText={"Топ продаж"}
        images={["cart-img.image.png", "57086714.png"]}
      />

    </div>
  );
};
export default CartPage;
