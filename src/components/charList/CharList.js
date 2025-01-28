import "./charList.scss";
import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = ({ changeSelectedChar }) => {
  const [charList, setCharList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    makeCharList();
  }, []);

  const onCharLoading = () => {
    setNewItemsLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const makeCharList = () => {
    marvelService
      .getAllCharacters()
      .then((res) => {
        setCharList(res);
        setLoading(false);
        setOffset(offset + 9);
      })
      .catch(onError);
  };

  const onRepeatRequest = (offset) => {
    let ended = false;
    onCharLoading();
    marvelService
      .getAllCharacters(offset)
      .then((res) => {
        if (res.length < 9) {
          ended = true;
        }
        setCharList((charList) => [...charList, ...res]);
        setLoading((loading) => false);
        setNewItemsLoading((newItemsLoading) => false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
      })
      .catch(onError);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingStatus = loading ? <Spinner /> : null;

  const content = !(errorMessage || loadingStatus) ? (
    <div className="char__list">
      <ul className="char__grid">
        {charList.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => changeSelectedChar(item.id)}
              className="char__item"
            >
              <img
                src={item.thumbnail}
                className={
                  item.thumbnail ==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                    ? "char__item__notimg"
                    : "char__item__img"
                }
                alt="abyss"
              />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>

      {charEnded ? (
        <button className="char__notchar inner">
          Извините, больше персонажей нет!
        </button>
      ) : (
        <button
          disabled={newItemsLoading}
          className="button button__main button__long"
          // style={{ display: charEnded ? "none" : "block" }}
          onClick={() => {
            onRepeatRequest(offset);
          }}
        >
          <div className="inner">Показать больше</div>
        </button>
      )}
    </div>
  ) : null;

  return (
    <>
      {errorMessage}
      {loadingStatus}
      {content}
    </>
  );
};

export default CharList;
