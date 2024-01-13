import QuestionLabel from "../question";
import style from "./questions.module.scss";
import React, { useEffect, useState } from "react";
const Questions = () => {
  const [questions, setQuestion] = useState([]);
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/mostPopularQuestion.json`)
      .then((response) => response.json())
      .then((data) => setQuestion(data));
  }, []);

  return (
    <section className={style.questions}>
      <h2 className={`${style.questionsTitle} title`}>Часті запитання</h2>
      {questions.map(
        (element: { title: ""; description: "" }, index: number) => {
          return (
            <div key={index}>
              <QuestionLabel
                title={element.title}
                description={element.description}
              />
            </div>
          );
        }
      )}
    </section>
  );
};
export default Questions;
