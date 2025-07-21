import { BrowserRouter } from "react-router-dom";
import AppContent from "./components/appContent/AppContent.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
