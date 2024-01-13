import Slider from "src/components/slider";
import Questions from "src/components/questions";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface Prop {
  popular: any;
  bigSize: any;
  boxs: any;
  onLike?: any;
  onAdd?: any;
  loading: boolean;
}

const HomePage: React.FC<Prop> = ({
  loading,
  onAdd,
  onLike,
  popular,
  bigSize,
  boxs,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      x
      <section className="firstSection">
        <h1 className="firstSection__title">Mister Gifter</h1>
        <p className="firstSection__description">Найдивовижніші подарунки!</p>
        <Link
          aria-label={`Перейти до категорії хамелеон, Go to the category chameleon `}
          to="/chameleon"
        >
          <button className="firstSection__button">дивитись чашки</button>
        </Link>
      </section>
      <Slider
        loading={loading}
        data={popular}
        onAdd={onAdd}
        onLike={onLike}
        title="Найпопулярніші товари"
      />
      <Slider
        loading={loading}
        data={bigSize}
        onAdd={onAdd}
        onLike={onLike}
        title="Big Size"
      />
      <section className="box">
        <h2 className="title box__title ">Вибери потрібний подарунок</h2>
        <Link
          aria-label={`Перейти до категорії boxs, Go to the category boxes `}
          to={"/Boxs"}
        >
          <div className="box__img-wrapper">
            <img
              width="200px"
              height="200px"
              decoding="async"
              className="box__img"
              src="img/92757869.png"
              alt="box for him бокс для нього"
            />
          </div>
        </Link>
        <h2 className="title box__title-blue ">Для нього</h2>

        <Link
          aria-label={`Перейти до категорії boxs, Go to the category boxes `}
          to={"/Boxs"}
        >
          <div className="box__img-wrapper">
            <img
              width="200px"
              height="200px"
              decoding="async"
              className="box__img"
              src="img/secondBox.png"
              alt="box for her бокс для неї"
            />
          </div>
        </Link>
        <h2 className="title box__title-red">Для неї</h2>
      </section>
      <Slider
        loading={loading}
        data={boxs}
        onAdd={onAdd}
        onLike={onLike}
        title={"Подуранкові бокси"}
      />
      <Questions />
    </>
  );
};
export default HomePage;
