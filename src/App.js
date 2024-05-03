import { Route, Routes } from "react-router-dom";

import Welcome from "./pages/WelcomePage/WelcomePage";
import MainPage from "./pages/mainPage/mainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
  );
}

export default App;
