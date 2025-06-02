import { lazy, Suspense, useRef, createRef } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import AppHeader from "../appHeader/AppHeader.jsx";
import Spinner from "../spinner/Spinner.jsx";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.jsx";
import "./app-content.scss";
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../comicsList/ComicsList"));
const SingleComicPage = lazy(() =>
  import("../pages/SingleComicPages/SingleComicPage.jsx")
);
const SingleCharacterPage = lazy(() =>
  import("../pages/singleCharacterPages/SingleCharacterPage.jsx")
);

const AppContent = () => {
  const location = useLocation();

  const element = useRoutes(
    [
      { path: "/", element: <MainPage /> },
      { path: "/comics", element: <ComicsPage /> },
      {
        path: "/comics/:comicId",
        element: (
          <ErrorBoundary>
            {" "}
            <SingleComicPage />
          </ErrorBoundary>
        ),
      },
      {
        path: "/characters/:charId",
        element: (
          <ErrorBoundary>
            <SingleCharacterPage />
          </ErrorBoundary>
        ),
      },
      { path: "*", element: <Page404 /> },
    ],
    location
  );

  const refsMap = useRef(new Map());

  if (!refsMap.current.has(location.pathname)) {
    refsMap.current.set(location.pathname, createRef());
  }

  const currentRef = refsMap.current.get(location.pathname);

  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={location.pathname}
              timeout={550}
              classNames="fade"
              nodeRef={currentRef}
              unmountOnExit
            >
              <div ref={currentRef} className="transition-wrapper">
                {element}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </Suspense>
      </main>
    </div>
  );
};

export default AppContent;
