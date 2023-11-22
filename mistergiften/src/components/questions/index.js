import QuestionLabel from "../question"
import style from "./questions.module.scss";
const Questions = () => {
    return (
        <section className={style.questions}>
            <h2 className={`${style.questionsTitle} title`}>Часті запитання</h2>
            <QuestionLabel
                title={"Чи можна мити чашку в посудомийці/гріти в мікрохвильовці?"}
                description={
                    "Для збереження якісного вигляду чашки не рекомендуємо мити їх в посудомийних машинах або гріти в мікрохвильових печах."
                }
            />
            <QuestionLabel
                title={"Чи можна мити чашку в посудомийці/гріти в мікрохвильовці?"}
                description={
                    "Для збереження якісного вигляду чашки не рекомендуємо мити їх в посудомийних машинах або гріти в мікрохвильових печах."
                }
            />
            <QuestionLabel
                title={"Чи можна мити чашку в посудомийці/гріти в мікрохвильовці?"}
                description={
                    "Для збереження якісного вигляду чашки не рекомендуємо мити їх в посудомийних машинах або гріти в мікрохвильових печах."
                }
            />
        </section>
    )
}
export default Questions