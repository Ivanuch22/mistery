import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Questions from "src/components/questions";
import ImageModal from "src/components/modalImg";
import { Link as ScrollLink } from "react-scroll";

interface InputData {
  type: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  text: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  photos: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  phone: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  comment: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
  box: {
    value: string;
    isValid: boolean;
    errorMessage: string;
    data: any;
  };
}

const CustomPage = () => {
  const [basketBox, setBasketBox] = useState([]);
  const [typeOfCups, setTypeOfCups] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const [file, setFile] = useState<any>([]);
  const [inputData, setInputData] = useState<InputData>({
    type: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    text: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    phone: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    photos: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    comment: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    box: {
      value: "",
      isValid: true,
      errorMessage: "",
      data: {
        name: "",
        price: 0,
        img: "",
      },
    },
  });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/basket.json`)
      .then((response) => response.json())
      .then((data) => setBasketBox(data))
      .catch(() => console.log("basket not find"));

    fetch(`${process.env.PUBLIC_URL}/data/typeOfCups.json`)
      .then((response) => response.json())
      .then((data) => setTypeOfCups(data))
      .catch(() => console.log("type not find"));
  }, []);
  useEffect(() => console.log(inputData), [inputData]);

  const handleFileChange = (event: any) => {
    console.log(event.target.files);
    setFile(event.target.files);
  };
  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChangeInput = (event: any, element: any = null) => {
    let { name, value, files } = event.target;
    let isValid = true;
    let errorMessage = "";
    switch (name) {
      case "text":
        value.length > 0 ? (isValid = true) : (isValid = false);
        errorMessage = isValid ? "" : "Ведіть текст";
        break;
      case "phone":
        value = handleInputChange(value);
        value.length === 13 ? (isValid = true) : (isValid = false);
        errorMessage = isValid ? "" : "Ведіть коректний номер телефону";
        break;
      case "box":
        event.target.checked
          ? (event.target.checked = true)
          : (event.target.checked = false);
        break;
      case "file":
        const fileNames = Array.from(Object.values(files)).map(
          (file: any) => file.name
        );
        value = fileNames.join(", ");
        break;
      default:
        break;
    }
    if (name === "box") {
      console.log("sdaklf");
      setInputData((prevData: any) => ({
        ...prevData,
        [name]: {
          value,
          isValid,
          errorMessage,
          data: element,
        },
      }));
      return;
    }
    setInputData((prevData: any) => ({
      ...prevData,
      [name]: {
        value,
        isValid,
        errorMessage,
      },
    }));
  };

  const handleInputChange = (value: string) => {
    let formattedInput = value.trim();
    if (formattedInput.startsWith("0")) {
      formattedInput = `+38${formattedInput}`;
    } else if (formattedInput.startsWith("380")) {
      formattedInput = `+${formattedInput}`;
    } else if (formattedInput.startsWith("+")) {
    } else {
    }
    return formattedInput;
  };

  const onSubmitForm = async (event: any) => {
    event.preventDefault();
    let areAllInputsValid = false;

    const checkData = async () => {
      !(inputData.type.value.length > 0)
        ? setInputData((prevData: any) => ({
            ...prevData,
            type: { ...prevData.type, isValid: false },
          }))
        : setInputData((prevData: any) => ({
            ...prevData,
            type: { ...prevData.type, isValid: true },
          }));
      !(inputData.text.value.length > 0)
        ? setInputData((prevData: any) => ({
            ...prevData,
            text: { ...prevData.text, isValid: false },
          }))
        : setInputData((prevData: any) => ({
            ...prevData,
            text: { ...prevData.text, isValid: true },
          }));

      !(inputData.photos.value.length > 0)
        ? setInputData((prevData: any) => ({
            ...prevData,
            photos: { ...prevData.photos, isValid: false },
          }))
        : setInputData((prevData: any) => ({
            ...prevData,
            photos: { ...prevData.photos, isValid: true },
          }));

      !(inputData.phone.value.length === 13)
        ? setInputData((prevData: any) => ({
            ...prevData,
            phone: { ...prevData.phone, isValid: false },
          }))
        : setInputData((prevData: any) => ({
            ...prevData,
            phone: { ...prevData.phone, isValid: true },
          }));

      const check = Object.values(inputData).some(
        (field: any) => field.value.length > 0
      );
      if (check) {
        areAllInputsValid = await Object.values(inputData).every(
          (field: any) => field.isValid
        );
      }
      console.log(check);
    };
    const sendDataToTelegram = async () => {
      const TOKEN = "6619280299:AAGIL6f6uD5nOU1Sjw26zzqvyI0V_fZZKq0";
      const CHAT_ID = "-1002007095666";
      const URL_API = `https://api.telegram.org/bot${TOKEN}`;

      const packing = () => {
        let message = `<b>Унікальна чашка😁</b>

Тип чашки:
${inputData.type.value}
Текст: 
${inputData.text.value}
Номер телефону: 
${inputData.text.value}
Коментар:
${inputData.comment.value.length > 0 ? inputData.comment.value : "Нєма 😔"}
Додатковий бокс:
${inputData.box.value.length > 0 ? inputData.box.value : "Нєма 😔"}
        `;
        return message;
      };

      const sendingImages = () => {
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", file[0]);
        formData.append("caption", packing());

        fetch(`${URL_API}/sendPhoto`, {
          method: "POST",
          body: formData,
        }).then((respose) =>
          respose.ok ? console.log("ура") : console.log("o now")
        );
      };
      try {
        await sendingImages();
      } catch {
        console.log("sd");
      }
    };

    const sendMessageToBackEnd = () => {
      let filterCarts: any = [
        {
          price: 1,
          quantity: 1,
          name: inputData.text.value,
          picture: "",
          properties: [
            {
              name: "Тип чашки",
              value: inputData.type,
            },
          ],
        },
      ];
      inputData.box.data.name.length > 0
        ? filterCarts.push({
            price: inputData.box.data.price,
            quantity: 1,
            name: inputData.box.data.name,
            picture: inputData.box.data.img,
          })
        : console.log("ho chose box");
      const dataForBack = {
        source_id: 2,
        client_comment: inputData.comment.value,
        buyer: {
          full_name: `Не знаю`,
          phone: `${inputData.phone.value}`,
        },
        shipping: {
          shipping_address_city: `Не вказано`,
          shipping_address_region: `Не вказано`,
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
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    };

    await checkData();
    if (areAllInputsValid) {
      sendDataToTelegram();
      sendMessageToBackEnd();
    }
  };

  return (
    <>
      <ImageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageUrl={selectedImageUrl}
      />
      <section
        className="customFirstSection"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/customBg.png)`,
        }}
      >
        <div className="customFirstSection_wrapper">
          <div className="container">
            <h2 className="customFirstSection_title title">
              Створи свою неповторну чашку!
            </h2>
            <p className="customFirstSection_description">
              Хочеш подарувати незабутні емоції для своїх рідних і близьких?
              Кастомізуй чашку, додай свій текст та картинки, які хочеш нанести
              на чашку. Кращого подарунку просто не існує!
            </p>
            <ScrollLink
              to="yourElement"
              spy={true}
              smooth={true}
              duration={500}
            >
              <button className="customFirstSection_button firstSection__button">
                зробити свою чашку
              </button>
            </ScrollLink>
          </div>
        </div>
      </section>
      <section className="secondSection">
        <div className="container">
          <h2 className="secondSection_title title">
            Як замовити кастомну чашку зі своїм дизайном?
          </h2>
          <div className="secondSection_row">
            <article className="secondSection_block">
              <h3 className="secondSection_block_title">Завантажити фото</h3>
              <p className="secondSection_block_description">
                Завантажте фото або картинку, яку хочете нанести на чашку.
              </p>
            </article>
            <article className="secondSection_block">
              <h3 className="secondSection_block_title">Додайте текст</h3>
              <p className="secondSection_block_description">
                За бажанням додайте текст, який хочете нанести на чашку.
              </p>
            </article>
            <article className="secondSection_block">
              <h3 className="secondSection_block_title">Виберіть чашку</h3>
              <p className="secondSection_block_description">
                Виберіть тип чашки, на яку хочете нанести свій дизайн (Хамелеон,
                Full Black, Біла, Біла 425мл, Бокал 500 мл, Бокал 625мл).
              </p>
            </article>
            <article className="secondSection_block">
              <h3 className="secondSection_block_title">Узгодження</h3>
              <p className="secondSection_block_description">
                Узгодьте з нашим менеджером дизайн, ціну а також інші побажання
                щодо замовлення.
              </p>
            </article>
            <article className="secondSection_block">
              <h3 className="secondSection_block_title">Оплата</h3>
              <p className="secondSection_block_description">
                Після узгодження, оплатіть своє замовлення за зазначеними
                реквізитами, щоб воно було передано в роботу.
              </p>
            </article>
            <article className="secondSection_block">
              <h3 className="secondSection_block_title">
                Отримайте свою чашку
              </h3>
              <p className="secondSection_block_description">
                Отримайте свою чашку протягом 1-3 робочих днів на найближчому
                відділенні нової пошти!
              </p>
            </article>
          </div>
        </div>
      </section>
      <form
        name="yourElement"
        className="customForm"
        encType="multipart/form-data"
        method="post"
        action="/upload"
      >
        <div className="container">
          <h2 className="customForm_title title">
            Створи свою унікальну чашку!
          </h2>
          <article className="customForm_column">
            <h3 className="customForm_name">Тип чашки:</h3>
            <div
              className="customForm_row"
              style={
                inputData.type.isValid
                  ? { border: "none" }
                  : {
                      border: "3px solid red",
                      borderRadius: "10px",
                      padding: "10px",
                    }
              }
            >
              {typeOfCups.map((element: any, index: any) => {
                return (
                  <article key={index + 10}>
                    <input
                      id={`${element.name} ${index}`}
                      className="drawer__box-checkbox"
                      type="radio"
                      name="type"
                      value={element.name}
                      onClick={onChangeInput}
                    />
                    <label
                      htmlFor={`${element.name} ${index}`}
                      className="drawer__box"
                    >
                      <img
                        width="200px"
                        height="200px"
                        decoding="async"
                        alt="img"
                        src={`${process.env.PUBLIC_URL}/img/${element.img}`}
                        className="drawer__box-img"
                      />
                      <h5 className="drawer__box-title">{element.name}</h5>
                    </label>
                  </article>
                );
              })}
            </div>
          </article>
          <article className="customForm_column">
            <h3 className="customForm_name">Текст:</h3>
            <input
              className="drawer__input"
              name="text"
              onChange={onChangeInput}
              style={{
                borderColor: inputData.text.isValid ? "#444ad3" : "red",
              }}
              type="text"
              placeholder="Введіть текст який потрібно нанести на чашку"
            />
          </article>
          <article className="customForm_column">
            <h3 className="customForm_name">Завантажте фото:</h3>
            <p className="customForm_description">
              Завантажте фото яке потрібно нанести на чашку
            </p>
            <div>
              {Object.values(file).map((file: any, index: number) => (
                <div
                  id="fileName"
                  className="customForm_addedFile"
                  key={index + 30}
                >
                  {file.name}
                </div>
              ))}
            </div>

            <input
              accept="image/png, image/jpeg"
              onChange={(e: any) => {
                handleFileChange(e);
                onChangeInput(e);
              }}
              id="fileInput"
              className="customForm_input"
              type="file"
              name="photos"
            />
            <label
              htmlFor="fileInput"
              style={
                inputData.photos.isValid ? {} : { border: "3px solid red" }
              }
              className="firstSection__button customForm_column_button"
            >
              заватажити фото
            </label>
          </article>
          <article className="customForm_column">
            <h3 className="customForm_name">Ваш номер телефону:</h3>
            <input
              className="drawer__input"
              type="text"
              name="phone"
              value={inputData.phone.value}
              style={{
                borderColor: inputData.phone.isValid ? "#444ad3" : "red",
              }}
              maxLength={13}
              onChange={onChangeInput}
              placeholder="+38 (___) ___-__-__"
            />
          </article>
          <article className="customForm_column">
            <h3 className="customForm_name">Коментар:</h3>
            <input
              className="drawer__input"
              type="text"
              name="comment"
              value={inputData.comment.value}
              onChange={onChangeInput}
              placeholder="Залиште коментар до свого замовлення"
            />
          </article>
          <article className="customForm_column">
            <h3 className="customForm_name"> Додай бокс для вау ефекту! ✨</h3>
            <div className="customForm_row">
              {basketBox.map((element: any, index: any) => {
                return (
                  <article key={index + 20}>
                    <input
                      id={`${element.name} ${index}`}
                      className="drawer__box-checkbox"
                      type="radio"
                      name="box"
                      onChange={(e) => onChangeInput(e, element)}
                      value={element.name}
                    />
                    <label
                      // onClick={() => setBoxsPriceBasket(element.price)}
                      htmlFor={`${element.name} ${index}`}
                      className="drawer__box"
                    >
                      <img
                        width="200px"
                        height="200px"
                        decoding="async"
                        alt="img"
                        src={`${process.env.PUBLIC_URL}/img/${element.img}`}
                        className="drawer__box-img"
                      />
                      <h5 className="drawer__box-title">{element.name}</h5>
                    </label>
                  </article>
                );
              })}
            </div>
          </article>
          <button
            className="customForm_order_button firstSection__button"
            type="submit"
            onClick={onSubmitForm}
          >
            Дізнатись ціну
          </button>
        </div>
        <footer className="customFooter">
          Натискаючи кнопку, ви погоджуєтесь з
          <Link
            aria-label="Перейти до політики конфеденційності"
            to={"/privacy-policy"}
          >
            {" "}
            Політикою конфіденційності
          </Link>{" "}
          та
          <Link
            aria-label="Перейти до договору публічної оферти"
            to={"/oferta"}
          >
            {" "}
            Договором публічної оферти
          </Link>
        </footer>
      </form>
      <section className="customOrdered">
        <h2 className="customOrdered_title title">
          Кастомні чашки, які вже в нас замовляли покупці
        </h2>
        <article
          onClick={() =>
            handleImageClick(`${process.env.PUBLIC_URL}/img/carts/11159703.jpg`)
          }
          className="customOrdered_cart"
        >
          <img
            width="200px"
            height="200px"
            decoding="async"
            alt="img"
            className="customOrdered_cart_img"
            src={`${process.env.PUBLIC_URL}/img/carts/11159703.jpg`}
          />
        </article>
        <article
          onClick={() =>
            handleImageClick(`${process.env.PUBLIC_URL}/img/carts/11159703.jpg`)
          }
          className="customOrdered_cart"
        >
          <img
            width="200px"
            height="200px"
            decoding="async"
            alt="img"
            className="customOrdered_cart_img"
            src={`${process.env.PUBLIC_URL}/img/carts/11159703.jpg`}
          />
        </article>
      </section>
      <Questions />
    </>
  );
};
export default CustomPage;
