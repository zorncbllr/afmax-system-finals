import { Route, Routes } from "react-router";
import Home from "./features/home/pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
