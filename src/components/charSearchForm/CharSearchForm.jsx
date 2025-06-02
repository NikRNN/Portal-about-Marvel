import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/useMarvelService";
import { Link } from "react-router-dom";
import "./charSearchForm.scss";

const CharSearchForm = () => {
  const { getCharacterByName } = useMarvelService();

  function makeRightCharacterName(name) {
    return name
      .split(" ")
      .map((item) =>
        item
          .split("-")
          .map(
            (item) =>
              item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase()
          )
          .join("-")
      )
      .join(" ");
  }

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("Обязательное поле"),
        })}
        onSubmit={async (values, { setSubmitting, setStatus, setValues }) => {
          setSubmitting(true);
          try {
            const res = await getCharacterByName(
              makeRightCharacterName(values.charName)
            );

            if (res === undefined) {
              setStatus({
                error:
                  "Мы не смогли найти такого персонажа. Проверьте имя и попробуйте снова",
              });
            } else {
              setStatus({ success: true, res });
              setValues({ ...values, characterData: res });
            }
          } catch (error) {
            setStatus({ error: error.message });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, status, resetForm, setStatus }) => (
          <Form>
            <label className="char__search-label" htmlFor="charName">
              Или найди персонажа по его имени:
            </label>
            <div className="char__search-wrapper">
              <Field
                id="charName"
                name="charName"
                type="text"
                placeholder="Введите имя"
              />

              <div className="char__search-wrapper-btns">
                <button
                  type="submit"
                  className="button button__main"
                  disabled={isSubmitting}
                  onClick={() => setStatus(null)}
                >
                  <div className="inner">
                    {isSubmitting ? "Ищем..." : "Поиск"}
                  </div>
                </button>

                {status?.success ? (
                  <Link to={`/characters/${status.res.id}`}>
                    <button
                      className="button button__secondary"
                      onClick={() => resetForm()}
                    >
                      <div className="inner">Персонаж</div>
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
            <ErrorMessage
              component="div"
              className="char__search-error"
              name="charName"
            />
            {status?.error ? (
              <div className="char__search-critical-error char__search-error">
                {status.error}
              </div>
            ) : null}
            {status?.success ? (
              <div className="char__search-success">{`Персонаж найден! Хотите посетить страницу ${status.res.name}?`}</div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CharSearchForm;
