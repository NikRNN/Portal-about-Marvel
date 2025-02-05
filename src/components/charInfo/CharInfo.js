import "./charInfo.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/useMarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({ charInfo }) => {
  const [char, setChar] = useState(null);

  const { loading, error, getSingleCharacter, clearError } = useMarvelService();

  const updateChar = () => {
    const id = charInfo;
    if (!id) {
      return;
    }
    clearError();
    getSingleCharacter(id).then((res) => {
      setChar(res);
    });
  };

  useEffect(() => {
    if (charInfo) {
      updateChar();
    }
  }, [charInfo]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <Spinner /> : null;
  const content = !(errorMessage || loadingMessage || !char) ? (
    <View char={char} />
  ) : null;
  const skeleton =
    errorMessage || loadingMessage || content ? null : <Skeleton />;
  console.log("render");

  return (
    <div className="char__info">
      {errorMessage}
      {loadingMessage}
      {skeleton}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt="abyss"
          style={
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? { width: 150, height: 150, objectFit: "contain" }
              : { width: 150, height: 150, objectFit: "cover" }
          }
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Домашняя страница</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Вики</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">
        {comics.length !== 0 ? "Комиксы:" : null}
      </div>
      <ul className="char__comics-list">
        {comics.map((item, i) => {
          return (
            <li className="char__comics-item" key={i}>
              {i + 1}. {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
