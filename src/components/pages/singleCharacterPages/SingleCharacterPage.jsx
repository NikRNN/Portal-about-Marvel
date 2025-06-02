import "./singleCharacterPage.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../../services/useMarvelService";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";
import AppBanner from "../../AppBanner/AppBanner";

const SingleCharacterPage = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  console.log(char);

  const { getSingleCharacter, clearError, loading, error } = useMarvelService();

  const updateChar = () => {
    clearError();
    getSingleCharacter(charId).then((res) => setChar(res));
  };

  useEffect(() => {
    updateChar();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <Spinner /> : null;
  const content = !(errorMessage || loadingMessage || !char) ? (
    <View char={char} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {loadingMessage}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { thumbnail, name, description } = char;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterPage;
