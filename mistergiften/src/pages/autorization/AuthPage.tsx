import React, { useEffect, useState } from "react";
import style from "./autorization.module.scss";

interface componentTypes {}

const Authorization: React.FC<componentTypes> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentURL, setUrl] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let url = window.location.pathname.split("/").pop() || "";
    setUrl(url);
  }, []);

  const sendUserData = (email: string, password: string) => {
    if (!(email.length > 4) || !(password.length > 4)) {
      return;
    }

    const endpoint = currentURL === "registration" ? "registration" : "login";
    const url = `http://localhost:5000/api/user/${endpoint}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderForm = () => {
    const isRegistration = currentURL === "registration";

    return (
      <div className={style.authorization}>
        <h2 className={style.authorization__title}>
          {isRegistration ? "Зареєструватись" : "Авторизація"}
        </h2>
        <input
          className={style.authorization__input}
          type="email"
          placeholder="Введіть ваш email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.authorization__input}
          type="password"
          value={password}
          placeholder="Введіть ваш пароль..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={style.authorization__text}>
          {isRegistration ? "Є аккаунт?" : "Немає аккаунта?"}{" "}
          <button className={style.authorization__span} onClick={() => {}}>
            {isRegistration ? "Увійти" : "Зареєструватись"}
          </button>
        </p>
        <button
          className={style.authorization__button}
          onClick={() => sendUserData(email, password)}
        >
          Увійти
        </button>
      </div>
    );
  };

  return renderForm();
};

export default Authorization;
