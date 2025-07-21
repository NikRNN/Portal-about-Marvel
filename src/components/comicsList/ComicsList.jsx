import "./comicsList.scss";

import useMarvelService from "../../services/useMarvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import { Link } from "react-router-dom";

const setContent = (process, Component, newComicsLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newComicsLoading ? <Component /> : <Spinner />;
    case "finished":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Ошибка: неожиданное состояние процесса");
  }
};

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { getAllComics, process, setProcess } = useMarvelService();

  useEffect(() => {
    makeComicsList();
  }, []);

  const makeComicsList = () => {
    getAllComics().then((res) => {
      setComicsList(res);
      setProcess("finished");
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

  const comicsRender = (arr) => {
    const comics = arr.map((item, i) => {
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
    });

    return (
      <div className="comics__list">
        <ul className="comics__grid">{comics}</ul>
      </div>
    );
  };

  return (
    <>
      {setContent(process, () => comicsRender(comicsList), newComicsLoading)}
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
    </>
  );
};

export default ComicsList;
