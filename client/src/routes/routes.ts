import PageNotFound from "@/components/page-not-found";
import SignInPage from "@/features/auth/pages/signin-page";
import SignUpPage from "@/features/auth/pages/signup-page";
import Dashboard from "@/features/dashboard/dashboard";
import Home from "@/features/home/home";
import AdminInventory from "@/features/inventory/pages/admin-inventory";
import AdminOrders from "@/features/orders/pages/admin/admin-orders";
import AdminProductView from "@/features/products/pages/admin/admin-product-view";
import AdminProducts from "@/features/products/pages/admin/admin-products";
import ProductEditView from "@/features/products/pages/admin/product-edit-view";
import UserProductView from "@/features/products/pages/user/user-product-view";
import UserProducts from "@/features/products/pages/user/user-products";
import AdminTransactions from "@/features/transactions/admin/admin-transactions";
import FailedTransaction from "@/features/transactions/user/failed-transaction";
import SuccessTransaction from "@/features/transactions/user/success-transaction";
import AdminUsers from "@/features/users/admin-users";
import React from "react";

interface Route {
  path: string;
  element: React.FC;
  protected?: boolean;
}

export const routes: Route[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/auth/sign-in",
    element: SignInPage,
  },
  {
    path: "/auth/sign-up",
    element: SignUpPage,
  },
  {
    path: "/products",
    element: UserProducts,
  },
  {
    path: "/products/:productId",
    element: UserProductView,
  },
  {
    path: "/transactions/success",
    element: SuccessTransaction,
  },
  {
    path: "/transactions/failed",
    element: FailedTransaction,
  },
  {
    path: "/admin/products",
    element: AdminProducts,
    protected: true,
  },
  {
    path: "/admin/products/:productId",
    element: AdminProductView,
    protected: true,
  },
  {
    path: "/admin/products/edit/:productId",
    element: ProductEditView,
    protected: true,
  },
  {
    path: "/admin/dashboard",
    element: Dashboard,
    protected: true,
  },
  {
    path: "/admin/inventory",
    element: AdminInventory,
    protected: true,
  },
  {
    path: "/admin/orders",
    element: AdminOrders,
    protected: true,
  },
  {
    path: "/admin/users",
    element: AdminUsers,
    protected: true,
  },
  {
    path: "/admin/transactions",
    element: AdminTransactions,
    protected: true,
  },
  {
    path: "*",
    element: PageNotFound,
  },
];
