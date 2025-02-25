import { BrowserRouter } from "react-router-dom";
import AppContent from "../appContent/AppContent";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
