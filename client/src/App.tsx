import { Route, Routes } from "react-router";
import Home from "./features/home/pages/home";
import UserProducts from "./features/user/pages/user-products";
import UserSupplies from "./features/user/pages/user-supplies";
import Dashboard from "./features/admin/pages/dashboard";
import AdminProducts from "./features/admin/pages/admin-products";
import AdminUsers from "./features/admin/pages/admin-users";
import AdminTransactions from "./features/admin/pages/admin-transactions";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<UserProducts />} />
        <Route path="/supplies" element={<UserSupplies />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
      </Routes>
    </>
  );
}

export default App;
