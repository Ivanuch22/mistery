import style from "./autorization.module.scss";


const Autorization = () => {
    console.log("autorizations");
    return (
        <div className={style.autorization}>
            <h2 className={style.autorization__title}>Авторизація</h2>
            <input className={style.autorization__input} type="email" placeholder="Ведіть ваш email..." />
            <input className={style.autorization__input} type="password" placeholder="Ведіть ваш пароль..." />
            <p className={style.autorization__text}>Немає аккаунта? <button className={style.autorization__span}>Зареєструватись</button></p>
            <button className={style.autorization__button}>Увійти</button>
        </div>
    )
}
export default Autorization;
