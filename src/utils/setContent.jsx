import Spinner from "../components/spinner/Spinner.jsx";
import ErrorMessage from "../components/errorMessage/ErrorMessage.jsx";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "finished":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Ошибка: неожиданное состояние процесса");
  }
};

export default setContent;
