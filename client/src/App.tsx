import { Route, Routes } from "react-router";
import Home from "./features/home/pages/home";
import UserProducts from "./features/user/pages/user-products";
import UserSupplies from "./features/user/pages/user-supplies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<UserProducts />} />
      <Route path="/supplies" element={<UserSupplies />} />
    </Routes>
  );
}

export default App;
