import SearchedCarts from "../searchedCart";
import style from "./search.module.scss";
import React, { useState } from "react";

interface ISearch {
  carts: any;
  sortAndCountByName: any;
}
const Search: React.FC<ISearch> = ({ carts, sortAndCountByName }) => {
  const [value, setValue] = useState("");
  const [searchedCarts, setSearchedCards] = useState([]);
  const showSearchedCarts = (event: any) => {
    setValue(event.target.value);
    const newCardsList = carts.filter((element: any) =>
      element.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchedCards(sortAndCountByName(newCardsList));
  };
  return (
    <div className={style.block}>
      <div className={style.inputBlock}>
        <img
          width="40px"
          height="40px"
          decoding="async"
          alt=""
          className={style.img}
          src={`${process.env.PUBLIC_URL}/img/loupe-search-svgrepo-com.svg`}
        />
        <input
          onChange={(e) => showSearchedCarts(e)}
          className={style.input}
          value={value}
          placeholder="Пошук...."
        />
      </div>
      <button className={style.button}>Пошук</button>
      <div>
        {value.length === 0 ? null : searchedCarts.length > 0 ? (
          searchedCarts.map((element: any, index: number) => (
            <SearchedCarts setValue={setValue} Cart={element} />
          ))
        ) : (
          <div className="NothingFound">Нічого не знайдено</div>
        )}
      </div>
    </div>
  );
};
export default Search;
