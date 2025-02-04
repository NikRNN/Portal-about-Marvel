import "./randomChar.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [homepage, setHomepage] = useState(null);
  const [wiki, setWiki] = useState(null);
  const [comics, setComics] = useState(null);

  const { loading, error, getSingleCharacter } = useMarvelService();

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getSingleCharacter(id).then((res) => {
      setName(res.name);
      setDescription(res.description);
      setThumbnail(res.thumbnail);
      setHomepage(res.homepage);
      setWiki(res.wiki);
      setComics(res.comics);
    });
  };

  useEffect(() => {
    updateChar();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingStatus = loading ? <Spinner /> : null;
  const content = !(errorMessage || loadingStatus) ? (
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
  ) : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {loadingStatus}
      {content}
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

export default RandomChar;
