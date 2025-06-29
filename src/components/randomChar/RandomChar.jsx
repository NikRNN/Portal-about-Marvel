import "./randomChar.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/useMarvelService";
import setContent from "../../utils/setContent";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const { getSingleCharacter, clearError, process, setProcess } =
    useMarvelService();

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * 20 + 1);
    getSingleCharacter(id)
      .then((res) => {
        setChar(res);
      })
      .then(() => setProcess("finished"));
  };

  useEffect(() => {
    updateChar();
  }, []);

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Случайный персонаж на сегодня!
          <br />
          Хотите узнать его лучше?
        </p>
        <p className="randomchar__title">или выберите другого</p>
        <button
          className="button button__main"
          onClick={() => {
            updateChar();
          }}
        >
          <div className="inner">попробуй это!</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { thumbnail, name, description, homepage, wiki } = data;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={
          thumbnail ==
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? "randomchar__notimg"
            : "randomchar__img"
        }
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Домашняя страница</div>
          </a>

          <a href={wiki} className="button button__secondary">
            <div className="inner">Вики</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
