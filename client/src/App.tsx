import { Route, Routes } from "react-router";
import Home from "./features/home/pages/home";
import UserProducts from "./features/user/pages/user-products";
import UserSupplies from "./features/user/pages/user-supplies";
import Dashboard from "./features/admin/pages/dashboard";
import AdminProducts from "./features/admin/pages/admin-products";
import AdminUsers from "./features/admin/pages/admin-users";
import AdminTransactions from "./features/admin/pages/admin-transactions";
import { Toaster } from "react-hot-toast";
import UserProductView from "./features/user/pages/user-product-view";
import AdminProductView from "./features/admin/pages/admin-product-view";
import PageNotFound from "./components/page-not-found";
import AdminInventory from "./features/admin/pages/admin-inventory";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<UserProducts />} />
        <Route path="/supplies" element={<UserSupplies />} />

        <Route path="/products/:productId" element={<UserProductView />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route
          path="/admin/products/:productId"
          element={<AdminProductView />}
        />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
