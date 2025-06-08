import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/useMarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const { loading, clearError, getSingleComic, getSingleCharacter, error } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getSingleComic(id).then((res) => setData(res));
        break;
      case "character":
        getSingleCharacter(id).then((res) => setData(res));
    }
  };

  const loadingMessage = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loadingMessage || errorMessage || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {loadingMessage}
      {errorMessage}
      {content}
    </>
  );
};

export default SinglePage;
