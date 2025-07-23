import "./charList.scss";
import { useState, useEffect, useMemo, useCallback } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import useMarvelService from "../../services/useMarvelService";
import Spinner from "../spinner/Spinner";

const setContent = (process, Component, newItemsLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemsLoading ? <Component /> : <Spinner />;
    case "finished":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Ошибка: неожиданное состояние процесса");
  }
};

const CharList = ({ changeSelectedChar }) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  useEffect(() => {
    makeCharList();
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const makeCharList = () => {
    getAllCharacters()
      .then((res) => {
        setCharList(res);
        setOffset(offset + 9);
        setNewItemsLoading(true);
      })
      .then(() => setProcess("finished"));
  };

  const onRepeatRequest = (offset) => {
    let ended = false;
    setDisabled(true);
    getAllCharacters(offset)
      .then((res) => {
        if (res.length < 5) {
          ended = true;
        }
        setCharList((charList) => [...charList, ...res]);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
        setDisabled(false);
      })
      .then(() => setProcess("finished"));
  };

  const charRender = (arr) => {
    const chars = arr.map((item) => {
      return (
        // <CSSTransition
        //   key={item.id}
        //   timeout={500}
        //   classNames="fade"
        //   in={isVisible}
        //   appear
        // >
        <li
          onClick={() => changeSelectedChar(item.id)}
          className="char__item"
          key={item.id}
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
        // </CSSTransition>
      );
    });

    return (
      <div className="char__list">
        <ul className="char__grid">
          <TransitionGroup component={null}>{chars}</TransitionGroup>
        </ul>
        {charEnded ? (
          <button className="char__notchar inner">
            Извините, больше персонажей нет!
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
    );
  };

  const elements = useMemo(() => {
    return setContent(process, () => charRender(charList), newItemsLoading);
  }, [process, charList]);

  return <>{elements}</>;
};

export default CharList;
