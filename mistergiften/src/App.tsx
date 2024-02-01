import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import Feedback from "./components/feedback";
import Autorization from "./pages/autorization/AuthPage";
import PageTemplate from "./pages/PageTemplate";
import Search from "./components/search";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";

import "./style.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SendSRM from "./pages/SendSRM";
import Oferta from "./pages/Oferta";
import PrivacyPolicy from "./pages/privacyPolicy";
import CustomPage from "./pages/CustomPage";
import path from "path";

const App = () => {
  const [likedCart, setLikeCarts] = useState<any[]>([]);
  const [addedCart, setAddedCarts] = useState<any[]>([]);
  const [data, setData] = useState<any>([]);
  const [withPhoto, setWithPhoto] = useState<any>([]);
  const [chameleon, setChameleon] = useState<any>([]);
  const [bigSize, setBigSize] = useState<any>([]);
  const [boxs, setBoxs] = useState<any>([]);
  const [popular, setPopular] = useState<any>([]);
  const [classLikeText, setLikeClassText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isShowMessage, setShowMessage] = useState(false);

  const currentLocation = useLocation();

  useEffect(() => {
    const newTitle = getTitleForRoute(currentLocation.pathname);
    document.title = newTitle;
  }, [currentLocation.pathname]);

  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    if (urlParams.get("success") === "true") {
      setShowMessage(true);
    }
  }, [setShowMessage]);
  useEffect(() => {
    const withPhotoFilter = data.filter(
      (element: any) => element.category === "Category 4"
    );
    const chameleonFilter = data.filter(
      (element: any) => element.category === "Category 3"
    );
    const bigSizeFilter = data.filter(
      (element: any) => element.category === "Category 2"
    );
    const boxFilter = data.filter(
      (element: any) => element.category === "Category 1"
    );
    const popularFilter = data.filter(
      (element: any) => element.category === "Category 5"
    );
    setChameleon(chameleonFilter);
    setWithPhoto(withPhotoFilter);
    setBigSize(bigSizeFilter);
    setBoxs(boxFilter);
    setPopular(popularFilter);
  }, [data]);
  const getTitleForRoute = (pathname: string): string => {
    switch (pathname) {
      case "/":
        return "MISTER GIFTER - Найдивовижніші подарунки!";

      case "/cupsWidthPhotos":
        return "Персоналізовані чашки";

      case "/chameleon":
        return "Хамелеон чашки";

      case "/BigSize":
        return "Big Size";

      case "/Boxs":
        return "Boxs";

      case "/Delivery":
        return "Доставка";

      case "/AboutUs":
        return "Про нас";

      case "/custom":
        return "Кастомні чашки";

      case "/oferta":
        return "Договір публічної оферти";

      case "/privacy-policy":
        return "Політика Конфіденційності";

      case "/about":
        return "Про нас";

      // Додайте інші роути за необхідністю
      default:
        const id = pathname.slice(1);
        setTimeout(() => {
          const element = data.filter((cart: any) => cart.id == +id);
          if (element.length > 0) {
            return "Mister Gifter - " + element[0].name;
          }
          return "Mister Gifter";
        }, 100);
        return "Mister Gifter";
    }
  };

  const getAllData = async () => {
    const dataUrl = [
      "boxs.json",
      "bigSize.json",
      "chameleons.json",
      "cupsWithPhotos.json",
      "mostPopularCarts.json",
      "ofer.json",
    ];

    const fetchData: any = async (fileName: string) => {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/data/${fileName}`
      );
      const data = await response.json();
      if (data) {
        setLoading(false);
      }
      return data;
    };

    const loadDataFromFiles = async () => {
      const allData = await Promise.all(dataUrl.map(fetchData));
      return allData;
    };
    const processData = (data: any, category: any) => {
      return data.map((product: any) => ({
        ...product,
        category,
      }));
    };

    const mergeData = async () => {
      try {
        const allData = await loadDataFromFiles();

        const mergedData: any = allData.flatMap((data, index) => {
          const category = `Category ${index + 1}`;
          return processData(data, category);
        });

        // Фильтрация массива с помощью filter
        const withPhotoFilter = mergedData.filter(
          (element: any) => element.category === "Category 4"
        );
        const chameleonFilter = mergedData.filter(
          (element: any) => element.category === "Category 3"
        );
        const bigSizeFilter = mergedData.filter(
          (element: any) => element.category === "Category 2"
        );
        const boxFilter = mergedData.filter(
          (element: any) => element.category === "Category 1"
        );
        const popularFilter = mergedData.filter(
          (element: any) => element.category === "Category 5"
        );
        // Установите данные в стейт, например, в useState
        setData(mergedData);
        setChameleon(chameleonFilter);
        setWithPhoto(withPhotoFilter);
        setBigSize(bigSizeFilter);
        setBoxs(boxFilter);
        setPopular(popularFilter);
      } catch (error) {
        console.error("Error merging and setting data:", error);
      }
    };

    await mergeData();
  };
  const changeStyle = () => {
    setLikeClassText("LikeText_animation");
    setTimeout(() => {
      setLikeClassText("");
    }, 2000);
  };

  const onLike = (e: React.MouseEvent, cart: any) => {
    e.preventDefault();
    const updatedCard = { ...cart, isLike: !cart.isLike };
    if (updatedCard.isLike) {
      changeStyle();
    }
    setData((prevData: any) =>
      prevData.map((card: any) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
    filterLike(updatedCard);
  };

  const filterLike = (updatedCart: any) => {
    if (updatedCart.isLike) {
      setLikeCarts((prevData: any) => [...prevData, updatedCart]);
    } else {
      setLikeCarts((prevData: any) =>
        prevData.filter((cart: any) => cart.id !== updatedCart.id)
      );
    }
  };
  interface MyObjectType {
    name: string;
    type?: {
      isActive: boolean;
      img: string;
    }[];
  }

  function sortAndCountByName(objects: MyObjectType[]) {
    const nameCountMap: {
      [key: string]: {
        name: string;
        count: number;
        type?: { isActive: boolean; img: string }[];
      };
    } = {};

    objects.forEach((obj) => {
      const { name, type, ...rest } = obj;
      const key =
        type && type.length > 0 ? `${name}-${JSON.stringify(type)}` : name;

      if (key in nameCountMap) {
        nameCountMap[key].count++;
      } else {
        nameCountMap[key] = {
          name,
          count: 1,
          type: type ? [...type] : undefined,
          ...rest,
        };
      }
    });

    const sortedObjects = Object.values(nameCountMap).sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name);

      if (nameComparison === 0) {
        // If names are equal, compare by type length
        const typeLengthComparison =
          (b.type?.length || 0) - (a.type?.length || 0);

        if (typeLengthComparison === 0 && a.type && b.type) {
          // If type lengths are equal, compare by type names
          const typeNameComparison = a.type[0].isActive ? -1 : 1;

          return typeNameComparison;
        }

        return typeLengthComparison;
      }

      return nameComparison;
    });

    return sortedObjects;
  }

  const onAdd = (e: React.MouseEvent, updatedCard: any) => {
    e.preventDefault();
    setAddedCarts((prevData: any) =>
      sortAndCountByName([...prevData, updatedCard])
    );
  };

  const increment = (e: any, cart: any) => {
    e.preventDefault();
    const newCart = { ...cart, count: ++cart.count };
    setAddedCarts((prevData: any) =>
      prevData.map((element: any) =>
        element.type === newCart.type ? newCart : element
      )
    );
  };

  const decrement = (e: any, cart: any) => {
    e.preventDefault();
    const newCart = { ...cart, count: --cart.count };
    newCart.count === 0
      ? removeAdd(newCart)
      : setAddedCarts((prevData: any) =>
          prevData.map((element: any) =>
            element.type === newCart.type ? newCart : element
          )
        );
  };
  const removeAdd = (cart: any) => {
    setAddedCarts((prevData: any) => {
      const newArr = prevData.filter(
        (element: any) => element.type !== cart.type
      );
      if (newArr.length === 0) {
        console.log("lsdalj");
      }
      return newArr;
    });
  };
  const changeType = (type: any, cart: any) => {
    const newType = { ...type, isActive: true };
    const newTypes = cart.type.map((element: any) =>
      element.name === newType.name ? newType : { ...element, isActive: false }
    );

    const newCart = { ...cart, type: newTypes };
    setData((prevData: any) =>
      prevData.map((obj: any) => (obj.id === newCart.id ? newCart : obj))
    );
  };

  const removeAllAdded = () => {
    setAddedCarts([]);
    setData((prevData: any) =>
      prevData.map((element: any) => {
        return {
          ...element,
          isAdd: false,
        };
      })
    );
  };

  return (
    <div className="App">
      <Header
        removeAllAdded={removeAllAdded}
        classLikeText={classLikeText}
        setAddedCarts={setAddedCarts}
        removeAdd={removeAdd}
        increment={increment}
        decrement={decrement}
        onLike={onLike}
        addedCart={addedCart}
        likedCart={likedCart}
        isShowMessage={isShowMessage}
        setShowMessage={setShowMessage}
      />
      <Routes>
        <Route
          path=""
          element={
            <HomePage
              loading={loading}
              onAdd={onAdd}
              popular={popular}
              boxs={boxs}
              bigSize={bigSize}
              onLike={onLike}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <CartPage
              changeType={changeType}
              loading={loading}
              onAdd={onAdd}
              cards={data}
              onLike={onLike}
            />
          }
        />
        <Route
          path="/ofer/:id"
          element={
            <CartPage
              changeType={changeType}
              loading={loading}
              onAdd={onAdd}
              cards={data}
              onLike={onLike}
            />
          }
        />
        <Route path="auth" element={<Autorization />} />
        <Route path="registration" element={<Autorization />} />
        <Route path="custom" element={<CustomPage />}></Route>
        <Route
          path="cupsWidthPhotos"
          element={
            <PageTemplate
              loading={loading}
              carts={withPhoto}
              isShowCarts={true}
              isShowLables={false}
              onAdd={onAdd}
              isShowText={false}
              onLike={onLike}
            />
          }
        />
        <Route
          path="chameleon"
          element={
            <PageTemplate
              onAdd={onAdd}
              loading={loading}
              carts={chameleon}
              onLike={onLike}
              isShowCarts={true}
              isShowLables={false}
              isShowText={false}
            />
          }
        />
        <Route
          path="BigSize"
          element={
            <PageTemplate
              loading={loading}
              carts={bigSize}
              onAdd={onAdd}
              onLike={onLike}
              isShowCarts={true}
              isShowLables={false}
              isShowText={false}
            />
          }
        />
        <Route
          path="Boxs"
          element={
            <PageTemplate
              loading={loading}
              carts={boxs}
              isShowCarts={true}
              onAdd={onAdd}
              isShowLables={true}
              isShowText={false}
              onLike={onLike}
            />
          }
        />
        <Route
          path="Delivery"
          element={
            <PageTemplate
              loading={loading}
              onLike={onLike}
              isShowCarts={false}
              onAdd={onAdd}
              isShowLables={false}
              isShowText={true}
              title="Про доставку"
              description="Намагаємось доставити ваше замовлення так швидко, як котик біжить як чує звук відкриття холодильнику.
              Оформлені до 18:00 замовлення відправляємо в той же день!
              Доставка Новою Поштою 1-3 дні. Оплатити можна при отриманні на пошті, або по передплаті на карту."
            />
          }
        />

        <Route path="SRM" element={<SendSRM />}></Route>
        <Route
          path="AboutUs"
          element={
            <PageTemplate
              loading={loading}
              onLike={onLike}
              onAdd={onAdd}
              isShowCarts={false}
              isShowLables={false}
              isShowText={true}
              title="Про нас"
              description="Колись я оновлю цей блок і тут буде інформація про команду і те що ми зробили за весь час."
            />
          }
        />
        <Route path="oferta" element={<PrivacyPolicy />}></Route>
        <Route path="privacy-policy" element={<Oferta />}></Route>
      </Routes>

      <Feedback />
      <Search carts={data} sortAndCountByName={sortAndCountByName} />
      <Footer />
    </div>
  );
};

export default App;
