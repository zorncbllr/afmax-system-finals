import { Navigate, Route, Routes } from "react-router";
import Home from "./features/home/pages/home";
import UserProducts from "./features/products/pages/user/user-products";
import Dashboard from "./features/dashboard/dashboard";
import AdminProducts from "./features/products/pages/admin/admin-products";
import AdminUsers from "./features/users/admin-users";
import AdminTransactions from "./features/transactions/admin-transactions";
import { Toaster } from "react-hot-toast";
import UserProductView from "./features/products/pages/user/user-product-view";
import AdminProductView from "./features/products/pages/admin/admin-product-view";
import PageNotFound from "./components/page-not-found";
import AdminInventory from "./features/inventory/pages/admin-inventory";
import ProductEditView from "./features/products/pages/admin/product-edit-view";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<UserProducts />} />

        <Route path="/products/:productId" element={<UserProductView />} />
        <Route
          path="/admin/products/edit/:productId"
          element={<ProductEditView />}
        />

        <Route
          path="/admin"
          element={<Navigate to={"/admin/dashboard"} replace />}
        />
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
