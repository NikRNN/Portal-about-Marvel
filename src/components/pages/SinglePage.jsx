import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/useMarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const {
    clearError,
    getSingleComic,
    getSingleCharacter,
    process,
    setProcess,
  } = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getSingleComic(id)
          .then((res) => setData(res))
          .then(() => setProcess("finished"));
        break;
      case "character":
        getSingleCharacter(id)
          .then((res) => setData(res))
          .then(() => setProcess("finished"));
    }
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
