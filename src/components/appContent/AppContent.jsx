import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              timeout={550}
              classNames="fade"
              unmountOnExit
            >
              <Routes location={location}>
                <Route path="/" element={<MainPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route
                  path="/comics/:comicId"
                  element={
                    <ErrorBoundary>
                      {" "}
                      <SingleComicPage />
                    </ErrorBoundary>
                  }
                />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </CSSTransition>
          </SwitchTransition>
        </Suspense>
      </main>
    </div>
  );
};

export default AppContent;
