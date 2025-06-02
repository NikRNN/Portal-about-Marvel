import "./singleComicPage.scss";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useMarvelService from "../../../services/useMarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getSingleComic, clearError } = useMarvelService();

  const updateComic = () => {
    clearError();
    getSingleComic(comicId).then((res) => {
      setComic(res);
    });
  };

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <Spinner /> : null;
  const content = !(errorMessage || loadingMessage || !comic) ? (
    <View comic={comic} />
  ) : null;

  return (
    <ErrorBoundary>
      {errorMessage}
      {loadingMessage}
      {content}
    </ErrorBoundary>
  );
};

const View = ({ comic }) => {
  const { thumbnail, title, price, description, pageCount, language } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Вернуться к списку комиксов
      </Link>
    </div>
  );
};

export default SingleComicPage;
