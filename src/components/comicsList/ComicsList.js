import "./comicsList.scss";

import useMarvelService from "../../services/useMarvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { getAllComics, error, loading } = useMarvelService();

  useEffect(() => {
    makeComicsList();
  }, []);

  const makeComicsList = () => {
    getAllComics().then((res) => {
      setComicsList(res);
      setOffset(offset + 9);
      setNewComicsLoading(true);
    });
  };

  const onRepeatRequest = (offset) => {
    let ended = false;
    setDisabled(true);
    getAllComics(offset).then((res) => {
      if (res.length < 8) {
        ended = true;
      }
      setComicsList((charList) => [...charList, ...res]);
      setOffset((offset) => offset + 9);
      setComicsEnded(ended);
      setDisabled(false);
    });
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingStatus = loading && !newComicsLoading ? <Spinner /> : null;

  const content = !(errorMessage || loadingStatus) ? (
    <div className="comics__list">
      <ul className="comics__grid">
        {comicsList.map((item, i) => {
          return (
            <li className="comics__item" key={i}>
              <Link to={`/comics/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="comics__item-img"
                />
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
              </Link>
            </li>
          );
        })}
      </ul>

      {comicsEnded ? (
        <button className="button button__main button__long" disabled>
          <div className="inner">Комиксы закончились!</div>
        </button>
      ) : (
        <button
          disabled={disabled}
          className="button button__main button__long"
          onClick={() => {
            onRepeatRequest(offset);
          }}
        >
          <div className="inner">
            {disabled ? "Идет загрузка..." : "Показать больше"}
          </div>
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

export default ComicsList;
