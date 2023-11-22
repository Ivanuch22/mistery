// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import CartPage from "./pages/cartPage";
import Questions from "./components/questions";
import Feedback from "./components/feedback";
import Slider from "./components/slider";

import "./style.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Autorization from "./pages/autorization";

const HomePage = () => {
  return (
    <>
      <section
        className="firstSection"
        style={{ background: `url("img/BG.jpg")` }}
      >
        <h1 className="firstSection__title">Mister Gifter</h1>
        <p className="firstSection__description">Найдивовижніші подарунки!</p>
        <button className="firstSection__button">дивитись чашки</button>
      </section>
      <Slider title="Найпопулярніші товари" />

      <Slider title={"Big Size"} />
      <section className="box">
        <h2 className="title box__title ">Вибери потрібний подарунок</h2>
        <div className="box__img-wrapper">
          <img className="box__img" src="img/carts/5.png" />
        </div>
        <h2 className="title box__title-blue ">Для нього</h2>
        <div className="box__img-wrapper">
          <img className="box__img" src="img/carts/5.png" />
        </div>
        <h2 className="title box__title-red">Для неї</h2>
      </section>
      <Slider title={"Подуранкові бокси"} />
      <Questions />

    </>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/mistery" element={<HomePage />}>

        </Route>
        <Route path="page" element={<CartPage />} />
        <Route path="cart" element={<CartPage title={"Cart"} />} />
        <Route path="autorization" element={<Autorization />} />
      </Routes>
      <Feedback />
      <Footer />
    </div>
  );
}

export default App;
