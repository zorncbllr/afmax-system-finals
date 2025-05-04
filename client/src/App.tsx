import { Route, Routes } from "react-router";
import Home from "./features/home/pages/home";
import UserProducts from "./features/user/pages/user-products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<UserProducts />} />
    </Routes>
  );
}

export default App;
