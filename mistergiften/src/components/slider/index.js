import Cart from "../cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const Slider = ({ title }) => {
    return (
        <section className="popular">
            <h2 className="popular__title title">{title}</h2>
            <div className="popular__slider slider">
                <Swiper className="slider__row" spaceBetween={35} slidesPerView={1.3}>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />

                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/page"}>
                            <Cart
                                name={`Кастомна чашка з фото "Моя ти киця"`}
                                price={499}
                                oldPrice={599}
                                redText={"Топ продаж"}
                                images={["cart-img.image.png", "57086714.png"]}
                            />
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}
export default Slider