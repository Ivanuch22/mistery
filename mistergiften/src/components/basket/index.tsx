import React, { useEffect, useState, ChangeEvent } from "react";
import DrawerCart from "../drawerCart";
import { Link } from "react-router-dom";
interface PropsType {
  isLikeOpen?: boolean | undefined;
  setOpenLike?: (status: boolean) => void;
  isBasketOpen?: boolean | undefined;
  setOpenBasket?: (status: boolean) => void;
  updateCardLike?: any;
  updateCardAdd?: any;
  carts?: [];
  onLike: any;
  increment: any;
  decrement: any;
  setBoxsPriceBasket: any;
  removeAdd: any;
  price: number;
  boxsPriceBasket: any;
  removeAllAdded: any;
}

interface array {
  name: string;
  price: number;
  img: string;
}

interface InputData {
  fullName: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  phoneNumber: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  city: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  novaPoshtaBranch: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  comment: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
}

interface ActiveCity {
  Present: string;
  MainDescription: string;
}

const Basket: React.FC<PropsType> = ({
  removeAllAdded,
  removeAdd,
  decrement,
  increment,
  isBasketOpen,
  onLike,
  setBoxsPriceBasket,
  setOpenBasket,
  price,
  carts,
  boxsPriceBasket,
}) => {
  const [basketBox, setBasketBox] = useState<any>([]);
  const [inputMessenger, setInputMessenger] = useState("viber");
  const [inputPayment, setInputPayment] = useState("monopay");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isShowMessage, setShowMessage] = useState(false);

  const [listCityes, setListCityes] = useState([]);
  const [novaDepartment, setNovaDepartment] = useState([]);

  const [activeCity, setActiveCity] = useState<ActiveCity>({
    Present: "",
    MainDescription: "",
  });
  const [isShowCity, setShowCity] = useState(false);
  const [isShowDepartment, setShowDepartment] = useState(true);
  const [inputData, setInputData] = useState<InputData>({
    fullName: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    phoneNumber: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    city: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    novaPoshtaBranch: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    comment: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
  });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/basket.json`)
      .then((response) => response.json())
      .then((data) => setBasketBox(data))
      .catch(() => console.log("basket not find"));
  }, []);
  useEffect(() => {
    console.log(carts);
  }, [carts]);
  const testApiNovaPoshta = async (value: string) => {
    const url = "https://api.novaposhta.ua/v2.0/json/";
    const key = "fac23a4d2d34c603535680b0e25fac94";
    const response: any = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        apiKey: key,
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: value,
          Limit: "5",
          Page: "1",
        },
      }),
    });
    const { data, success } = await response.json();
    if (success) {
      const newData = data[0].Addresses.map((citi: any) => ({
        ...citi,
        isActive: false,
      }));
      setListCityes(newData);
      setShowCity(true);
    }
  };
  const Department = async (value: string) => {
    const url = "https://api.novaposhta.ua/v2.0/json/";
    const key = "fac23a4d2d34c603535680b0e25fac94";
    const response: any = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        apiKey: key,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: activeCity.MainDescription,
          Page: "1",
          Limit: "5",
          Language: "UA",
          WarehouseId: value,
        },
      }),
    });
    const { data, success } = await response.json();
    if (success) {
      const newData = data.map((Department: any) => ({
        ...Department,
        isActive: false,
      }));
      setNovaDepartment(newData);
      setShowDepartment(true);
    }
  };
  const clearAllValues = () => {
    const updatedInputData: any = {};

    Object.keys(inputData).forEach((key) => {
      updatedInputData[key] = {
        value: "",
        isValid: true,
        errorMessage: "",
      };
    });

    setInputData(updatedInputData);
  };
  const onChangeInput = (
    even: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = even.target;
    let isValid = true;
    let errorMessage = "";
    switch (name) {
      case "fullName":
        value.length > 5 ? (isValid = true) : (isValid = false);
        errorMessage = isValid ? "" : "Мінімальна довжина 5 букв";
        break;
      case "phoneNumber":
        value = handleInputChange(value);
        value.length === 13 ? (isValid = true) : (isValid = false);
        errorMessage = isValid ? "" : "Ведіть правильно номер телефону";
        break;
      case "city":
        value.length > 2 ? (isValid = true) : (isValid = false);
        testApiNovaPoshta(value);
        errorMessage = isValid ? "" : "Мінімальна довжина 3 букв";
        break;
      case "novaPoshtaBranch":
        Department(value);
        value.length > 0 ? (isValid = true) : (isValid = false);
        errorMessage = isValid ? "" : "Виберіть номер віділення";
        break;
      default:
        break;
    }
    console.log("aa");
    setInputData((prevData) => ({
      ...prevData,
      [name]: {
        value,
        isValid,
        errorMessage,
      },
    }));
  };

  const handleInputChange = (value: string) => {
    // Виконати перевірки для формату та довжини
    let formattedInput = value.trim();

    if (formattedInput.startsWith("0")) {
      formattedInput = `+38${formattedInput}`;
    } else if (formattedInput.startsWith("380")) {
      formattedInput = `+${formattedInput}`;
    } else if (formattedInput.startsWith("+")) {
      // Нічого не змінюємо
    } else {
      // Якщо введений текст не починається з 0, 380 або "+", ви можете застосувати ваші власні логіки обробки
      // Наприклад, додаткові перевірки або ігнорування неприпустимих символів.
    }
    return formattedInput;
  };

  const sendMessageToTelegram = async (data: any) => {
    const TOKEN = "6619280299:AAGIL6f6uD5nOU1Sjw26zzqvyI0V_fZZKq0";
    const CHAT_ID = "-1002007095666";
    const URL_API = `https://api.telegram.org/bot${TOKEN}`;

    let message = `<b>Заявка з сайта! </b>
      `;

    message += `
Імя замовника <i>${inputData.fullName.value}</i>
Номер телефону <i>${inputData.phoneNumber.value}</i>
Адреса на яку відправити:
<i>Місто ${inputData.city.value},
Номер віділення ${inputData.novaPoshtaBranch.value}</i>
Коментар <i>${inputData.comment.value}</i>

<b>Замовлення</b>
Загальна сума : <i>${price} грн</i>

<b>Карточки</b>`;
    data.forEach((element: any) => {
      message += `
<b>${element.name} </b>:
<b>Тип чашки </b> <i>${
        element.type.length > 0
          ? element.type.filter((element: any) => element.isActive)[0].name
          : "Без типа"
      }</i>
Ціна за чашку:  <i>${element.price}</i> гривень
Кількість чашок: <b>${element.count}</b>
`;
    });
    message += `
<b>Додатковий бокс, ціна:</b> <i>
${boxsPriceBasket > 0 ? boxsPriceBasket : "Бокс не був вибраний"}</i>
Спосіб оплати ${inputPayment} 
Спосіб звязку ${inputMessenger}`;

    //preparing sending data
    const formData = new URLSearchParams();
    formData.append("chat_id", CHAT_ID);
    formData.append("text", message);
    formData.append("parse_mode", "html");

    //sending data
    fetch(`${URL_API}/sendMessage`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message sent:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const sendMessageToBackEnd = (orderedCarts: any) => {
    let filterCarts: any = [];
    filterCarts = orderedCarts.map((element: any, index: any) => {
      const activeType =
        element.type.length > 0
          ? element.type.filter((type: any) => type.isActive)
          : [];

      return {
        price: element.price, // Замініть на значення з форми або іншого джерела
        quantity: element.count,
        name: element.name, // Замініть на значення з форми або іншого джерела
        picture: `https://kalynych.fun/img/${element.images[0]}`, // Замініть на значення з форми або іншого джерела
        properties:
          activeType.length > 0
            ? [
                {
                  name: "Тип чашки",
                  value: activeType[0].name,
                },
              ]
            : null,
      };
    });
    try {
      const activeBoxBasket = () => {
        return basketBox.filter((element: array) => {
          return element.price === boxsPriceBasket;
        });
      };
      const actBox: array = activeBoxBasket()[0];

      console.log(actBox.img);
      console.log(actBox.img);
      filterCarts.push({
        price: actBox.price, // Замініть на значення з форми або іншого джерела
        quantity: 1,
        name: actBox.name, // Замініть на значення з форми або іншого джерела
        picture: `https://kalynych.fun/img/${actBox.img}`, // Замініть на значення з форми або іншого джерела
        properties: [],
      });
    } catch {
      console.log("basket is not choose");
    }

    const dataForBack = {
      source_id: 2,
      client_comment: `${inputData.comment} Звязатись через ${inputMessenger}`,
      buyer: {
        full_name: `${inputData.fullName.value}`, // Замініть на значення з форми або іншого джерела
        // email: "john.doe@example.com", // Замініть на значення з форми або іншого джерела
        phone: `${inputData.phoneNumber.value}`, // Замініть на значення з форми або іншого джерела
      },
      shipping: {
        shipping_address_city: `${inputData.phoneNumber.value}`, // Замініть на значення з форми або іншого джерела
        shipping_address_region: `${inputData.novaPoshtaBranch.value}`, // Замініть на значення з форми або іншого джерела
      },
      products: filterCarts,
    };

    fetch(
      `https://dry-wildwood-96930-d95ea0cd167f.herokuapp.com/send-to-keycrm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        body: JSON.stringify(dataForBack),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (inputPayment === "monopay") {
          getDataFromMonoUser(carts, data.id);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const onSubmitFunc = (e: any) => {
    e.preventDefault();
    let status = false;

    const newArr: any = {};
    for (const fieldName in inputData) {
      const element = (inputData as any)[fieldName];
      if (fieldName !== "comment") {
        element.value.length === 0 && element.isValid
          ? (element.isValid = false)
          : console.log("ele");
      }
      (newArr as any)[fieldName] = element;
    }
    const areSomeHaveValue: any = Object.values(inputData).some((file) => {
      return file.value.length > 0;
    });
    if (areSomeHaveValue) {
      status = Object.values(inputData).every((field) => field.isValid);
    }
    setInputData(newArr);
    setIsValid(status);

    if (status) {
      sendMessageToTelegram(carts);
      sendMessageToBackEnd(carts);
      clearAllValues();
      removeAllAdded();
      setShowMessage(true);
      setOpenBasket && setOpenBasket(false);
      return;
    }
  };

  const dataLenght = carts?.length;

  const getDataFromMonoUser = (orderedCarts: any, id: number) => {
    const dataAboutCartForMono = orderedCarts.map(
      (cart: any, index: number) => {
        return {
          name: cart.name,
          qty: cart.count,
          sum: cart.price * 100,
          icon: `https://kalynych.fun/img/${cart.images[0]}`,
          unit: "шт.",
          barcode: "string",
          header: "string",
          footer: "string",
          tax: [],
          uktzed: "string",
          discounts: [
            {
              type: "DISCOUNT",
              mode: "VALUE",
              value: cart.oldPrice,
            },
          ],
        };
      }
    );

    try {
      const activeBoxBasket = () => {
        return basketBox.filter((element: any) => {
          console.log(element.price, boxsPriceBasket);
          return element.isActive;
        });
      };

      const actBox: any = activeBoxBasket();
      actBox.forEach((element: any) => {
        dataAboutCartForMono.push({
          name: element.name,
          qty: 1,
          sum: element.price * 100,
          icon: `https://kalynych.fun/img/${element.img}}`,
          unit: "шт.",
          barcode: "string",
          header: "string",
          footer: "string",
          tax: [],
          uktzed: "string",
        });
      });
    } catch {
      console.log("error");
    }
    fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": "utR_bnF6LUzdc4pr3yFNFF2kKEPk75xeIlItZx9QfaxY",
      },
      body: JSON.stringify({
        amount: price * 100,
        redirectUrl: "http://kalynych.fun",
        webHookUrl: `https://dry-wildwood-96930-d95ea0cd167f.herokuapp.com/webhook`,
        merchantPaymInfo: {
          reference: `${id}_84d0070ee4e44667b31371d8f8813947`,
          destination: "Подарунок від MISTER GIFTER",
          comment: "Подарунок від MISTER GIFTER",
          customerEmails: [
            "ivan.kalunuch12@gmail.com",
            "ivan.kalunuch31@gmail.com",
          ],
          paymentType: "debit",
          basketOrder: dataAboutCartForMono,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.location.href = data.pageUrl;
        console.log(data);
      })
      .catch((response) => console.log(response));
  };

  const closeMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
    const clickedElement = event.target as HTMLDivElement;
    if (clickedElement.className === "drawer drawer--active") {
      setOpenBasket ? setOpenBasket(false) : console.log("not foutn function");
    } else if (clickedElement.className === "ModalMessage") {
      setShowMessage(false);
    } else {
      console.log("No");
    }
  };

  return (
    <>
      {!isShowMessage ? (
        <section
          className={isBasketOpen ? "drawer drawer--active" : "drawer"}
          onClick={(e: any) => closeMenu(e)}
        >
          <form
            className="drawer__wrapper"
            onSubmit={(e: any) => onSubmitFunc(e)}
          >
            {dataLenght ? (
              <>
                <h2 className="drawer__title">
                  Ваше замовлення:{" "}
                  <span
                    className="drawer__exit"
                    onClick={() =>
                      setOpenBasket && setOpenBasket(!isBasketOpen)
                    }
                  ></span>
                </h2>
                <div className="drawer__carts-block">
                  {carts.map((cart: any, index: number) => {
                    return (
                      <div key={index}>
                        <DrawerCart
                          setOpenBasket={setOpenBasket}
                          removeAdd={removeAdd}
                          increment={increment}
                          onLike={onLike}
                          decrement={decrement}
                          Cart={cart}
                          smallButton={true}
                          action="add"
                          key={index}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="drawer__price">Сума {price} ₴ </div>
                <Link
                  aria-activedescendant="Перейти до категоріх boxs"
                  onClick={() => setOpenBasket && setOpenBasket(!isBasketOpen)}
                  to={"/Boxs"}
                >
                  <div className="drawer__description">
                    Додай бокс для вау ефекту! ✨⬇️
                  </div>
                </Link>
                <div className="drawer__row">
                  {basketBox.map((element: any, index: any) => {
                    return (
                      <div key={index}>
                        <input
                          id={`${element.name} ${index}`}
                          className="drawer__box-checkbox"
                          type="checkbox"
                          name="RADIOBOXS"
                          onChange={(e: any) => {
                            console.log(e.target.checked);
                            const newEle = {
                              ...element,
                              isActive: !element.isActive,
                            };
                            setBasketBox((prevData: any) =>
                              prevData.map((box: any) =>
                                box.name === element.name ? newEle : box
                              )
                            );
                            setBoxsPriceBasket((prevPrice: number) =>
                              e.target.checked
                                ? element.price + prevPrice
                                : prevPrice - element.price
                            );
                          }}
                        />
                        <label
                          htmlFor={`${element.name} ${index}`}
                          className="drawer__box"
                        >
                          <img
                            width="200px"
                            height="200px"
                            decoding="async"
                            src={`${process.env.PUBLIC_URL}/img/${element.img}`}
                            className="drawer__box-img"
                            alt={element.name}
                          />
                          <h5 className="drawer__box-title">{element.name}</h5>
                        </label>
                      </div>
                    );
                  })}
                </div>
                <h4 className="drawer__text">Прізвище та Імя:</h4>
                <input
                  className="drawer__input"
                  tabIndex={1}
                  name="fullName"
                  value={inputData.fullName.value}
                  onChange={onChangeInput}
                  style={{
                    borderColor: inputData.fullName.isValid ? "#444ad3" : "red",
                  }}
                  type="text"
                  placeholder="Прізвище Імя По-батькові"
                />
                {inputData.fullName.errorMessage && (
                  <p style={{ color: "red" }}>
                    {inputData.fullName.errorMessage}
                  </p>
                )}
                <h3 className="drawer__text">Телефон:</h3>
                <input
                  style={{
                    borderColor: inputData.phoneNumber.isValid
                      ? "#444ad3"
                      : "red",
                  }}
                  className="drawer__input"
                  tabIndex={2}
                  type="text"
                  name="phoneNumber"
                  value={inputData.phoneNumber.value}
                  maxLength={13}
                  onChange={onChangeInput}
                  placeholder="+38 (___) ___-__-__"
                />
                {inputData.phoneNumber.errorMessage && (
                  <p style={{ color: "red" }}>
                    {inputData.phoneNumber.errorMessage}
                  </p>
                )}
                <h4 className="drawer__text">Місто:</h4>
                <input
                  name="city"
                  className="drawer__input"
                  type="text"
                  tabIndex={3}
                  value={inputData.city.value}
                  onChange={onChangeInput}
                  placeholder="м. Київ"
                  style={{
                    borderColor: inputData.city.isValid ? "#444ad3" : "red",
                  }}
                />
                {inputData.city.errorMessage && (
                  <p style={{ color: "red" }}>{inputData.city.errorMessage}</p>
                )}
                <div className={isShowCity ? "showed showedActive" : "showed"}>
                  {listCityes.length > 0
                    ? listCityes.map((city: any, index: number) => (
                        <div
                          onClick={(e: any) => {
                            let newItem = { ...city, isActive: true };
                            let newArr = {
                              ...inputData,
                              city: {
                                ...city,
                                isValid: true,
                                value: newItem.Present,
                              },
                              novaPoshtaBranch: {
                                isValid: false,
                                value: "",
                                errorMessage: "Ведіть номер віділення",
                              },
                            };
                            setShowCity(false);
                            setInputData(newArr);
                            setActiveCity(newItem);
                          }}
                          key={index}
                        >
                          {city.Present}
                        </div>
                      ))
                    : null}
                </div>

                <h4 className="drawer__text">Відділення Нової Пошти:</h4>
                <input
                  value={inputData.novaPoshtaBranch.value}
                  name="novaPoshtaBranch"
                  onChange={onChangeInput}
                  className="drawer__input"
                  tabIndex={4}
                  type="text"
                  placeholder=""
                  style={{
                    borderColor: inputData.novaPoshtaBranch.isValid
                      ? "#444ad3"
                      : "red",
                  }}
                />
                {inputData.novaPoshtaBranch.errorMessage && (
                  <p style={{ color: "red" }}>
                    {inputData.novaPoshtaBranch.errorMessage}
                  </p>
                )}
                <div
                  className={
                    isShowDepartment ? "showed showedActive" : "showed"
                  }
                >
                  {novaDepartment.length > 0
                    ? novaDepartment.map((department: any) => (
                        <div
                          onClick={(e) => {
                            let newItem = { ...department, isActive: true };
                            let newArr = {
                              ...inputData,
                              novaPoshtaBranch: {
                                ...department,
                                isValid: true,
                                value: `${department.CityDescription} ${department.Description}`,
                              },
                            };
                            setShowDepartment(false);
                            setInputData(newArr);
                            setNovaDepartment(newItem);
                          }}
                        >
                          {department.Description}
                        </div>
                      ))
                    : null}
                </div>

                <h4 className="drawer__text">Коментар:</h4>
                <input
                  tabIndex={5}
                  style={{
                    borderColor: inputData.comment.isValid ? "#444ad3" : "red",
                  }}
                  value={inputData.comment.value}
                  onChange={onChangeInput}
                  name="comment"
                  className="drawer__input"
                  type="text"
                  placeholder="Залиште комендар до свого замовлення"
                />

                <h4 className="drawer__text">Як з вами звязатись</h4>
                <label className="drawer__label">
                  <input
                    className="drawer__label-input"
                    type="radio"
                    name="connection"
                    tabIndex={6}
                    value="viber"
                    onClick={(e: any) => setInputMessenger(e.target.value)}
                  />
                  <h5 className="drawer__label-title">Viber</h5>
                </label>
                <label className="drawer__label">
                  <input
                    className="drawer__label-input"
                    tabIndex={7}
                    type="radio"
                    onClick={(e: any) => setInputMessenger(e.target.value)}
                    value="telegram"
                    name="connection"
                    defaultChecked
                  />
                  <h5 className="drawer__label-title">Telegram</h5>
                </label>
                <h4 className="drawer__text">Спосіб оплати</h4>
                <label className="drawer__label">
                  <input
                    onClick={(e: any) => setInputPayment(e.target.value)}
                    defaultChecked
                    className="drawer__label-input"
                    type="radio"
                    value="monopay"
                    tabIndex={8}
                    name="pay"
                  />
                  <h5 className="drawer__label-title">
                    Оплата онлайн з monopay
                  </h5>
                </label>
                <label className="drawer__label">
                  <input
                    className="drawer__label-input"
                    onClick={(e: any) => setInputPayment(e.target.value)}
                    tabIndex={9}
                    type="radio"
                    name="pay"
                    value="novaposhta"
                  />
                  <h5 className="drawer__label-title">
                    При отриманні на пошті
                  </h5>
                </label>
                <div className="drawer__price">Сума {price} ₴</div>
                {!isValid ? (
                  <div className="drawer__error">
                    Будь ласка, заповніть всі обов'язкові поля
                  </div>
                ) : null}
                <button className="drawer__button" tabIndex={10} type="submit">
                  Оформити замовлення
                </button>
                <p className="drawer__smallText">
                  Натискаючи кнопку, ви погоджуєтесь з
                  <Link to={"/privacy-policy"}>
                    {" "}
                    Політикою конфіденційності
                  </Link>{" "}
                  та
                  <Link to={"/oferta"}> Договором публічної оферти</Link>
                </p>
              </>
            ) : (
              <div className="like__nothing">
                <h2 className="like__text">Ви ще нічого не замовили</h2>
                <button
                  aria-label="Повернутись на головну "
                  className="like__button"
                  onClick={() => setOpenBasket && setOpenBasket(!isBasketOpen)}
                >
                  ЗАМОВИТИ
                </button>
              </div>
            )}
          </form>
        </section>
      ) : (
        <ModalMessage
          setShowMessage={setShowMessage}
          closeMenu={closeMenu}
          status="f"
        />
      )}
    </>
  );
};
interface IModal {
  status: string;
  setShowMessage: any;
  closeMenu: any;
}
const ModalMessage: React.FC<IModal> = ({
  status,
  setShowMessage,
  closeMenu,
}) => {
  return (
    <div className="ModalMessage" onClick={(e: any) => closeMenu(e)}>
      <div className="ModalMessage_wrapper">
        <h1 className="ModalMessage_title">Замовлення оформлено</h1>
        <p className="ModalMessage_description">
          Згодом з вами звяжеться менеджер :)
        </p>
        <p className="ModalMessage_text">
          Для швидшої обробки замовлення, краще напишіть нам в
          <a
            aria-label="Перейти в телеграм"
            className="ModalMessage_viber"
            href="https://t.me/mister_gifter"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Телеграм{" "}
          </a>
          або
          <a
            aria-label="Перейти в вайбер"
            className="ModalMessage_telegram"
            href="viber://chat?number=%2B380639652780/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Viber{" "}
          </a>
        </p>
        <Link
          aria-label="Перейти на головну, Go to the main page"
          to={""}
          onClick={() => setShowMessage(false)}
          className=" firstSection__button ModalMessage_button"
        >
          На головну
        </Link>
      </div>
    </div>
  );
};

export default Basket;
