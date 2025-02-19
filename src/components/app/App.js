import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner.js";

import ErrorBoundary from "../errorBoundary/ErrorBoundary.js";
const Page404 = lazy(() => import("../pages/404.js"));
const MainPage = lazy(() => import("../pages/MainPage.js"));
const ComicsPage = lazy(() => import("../comicsList/ComicsList.js"));
const SingleComicPage = lazy(() =>
  import("../pages/SingleComicPages/SingleComicPage.js")
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
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
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
