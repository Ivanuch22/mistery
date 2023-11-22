import React, { useState } from "react";
import style from "./question.module.scss";
const QuestionLabel = ({ title, description }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={style.questions__block}>
      <h3
        className={
          isOpen ? `${style.questions__text} ${style.questions__text_active}` : style.questions__text
        }
        onClick={() => setOpen((status) => !status)}
      >
        {title}
      </h3>
      <p
        className={
          isOpen
            ? `${style.questions__description} ${style.questions__description_active}`
            : style.questions__description
        }
      >
        {description}
      </p >
    </div >
  );
};
export default QuestionLabel;
