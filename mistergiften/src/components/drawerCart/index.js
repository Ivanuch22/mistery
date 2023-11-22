const DrawerCart = (smallButtons) => {
    return (
        <div className="drawer__cart">
            <div className="drawer__cart-img-block">
                <img
                    src="img/carts/cart-img.image.png"
                    className="drawer__cart-img"
                />
            </div>
            <div className="drawer__cart-text">
                <h4 className="drawer__cart-title">
                    Кастомна чашка з фото "Моя ти киця"
                </h4>
                <div className="drawer__cart-text-wrapper">
                    {smallButtons ? <p className="drawer__cart-minus">-</p> : null}
                    <p className="drawer__cart-counter">1</p>
                    {smallButtons ? <p className="drawer__cart-plus">+</p> : null}
                    <p className="drawer__cart-price">339$</p>
                </div>
            </div>

            <button className="drawer__button-remove"></button>
        </div>
    )
}
export default DrawerCart;