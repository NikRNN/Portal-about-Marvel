import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner.js";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.js";
import "./app-content.scss";
const Page404 = lazy(() => import("../pages/404.js"));
const MainPage = lazy(() => import("../pages/MainPage.js"));
const ComicsPage = lazy(() => import("../comicsList/ComicsList.js"));
const SingleComicPage = lazy(() =>
  import("../pages/SingleComicPages/SingleComicPage.js")
);

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={550}
              classNames="fade"
              appear
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <CSSTransition
                      key={location.pathname}
                      timeout={550}
                      classNames="fade"
                      appear
                    >
                      <MainPage />
                    </CSSTransition>
                  }
                />
                <Route
                  path="/comics"
                  element={
                    <CSSTransition
                      key={location.pathname}
                      timeout={550}
                      classNames="fade"
                      appear
                    >
                      <ComicsPage />
                    </CSSTransition>
                  }
                />
                <Route
                  path="/comics/:comicId"
                  element={
                    <CSSTransition
                      key={location.pathname}
                      timeout={550}
                      classNames="fade"
                      appear
                    >
                      <ErrorBoundary>
                        {" "}
                        <SingleComicPage />
                      </ErrorBoundary>
                    </CSSTransition>
                  }
                />
                <Route
                  path="*"
                  element={
                    <CSSTransition
                      key={location.pathname}
                      timeout={550}
                      classNames="fade"
                      appear
                    >
                      <Page404 />
                    </CSSTransition>
                  }
                />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
      </main>
    </div>
  );
};

export default AppContent;
