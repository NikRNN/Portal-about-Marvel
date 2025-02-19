import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const changeSelectedChar = (id) => {
    setChar(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char__content">
        <ErrorBoundary>
          <CharList changeSelectedChar={changeSelectedChar} />
        </ErrorBoundary>

        <ErrorBoundary>
          <CharInfo charInfo={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
