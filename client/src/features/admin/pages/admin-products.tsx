import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";

import { ProductDTO } from "@/features/products/types";
import {
  useDeleteProduct,
  useFetchProducts,
} from "@/features/products/product-hooks";

import { ColumnDef } from "@tanstack/react-table";
import { Check, X, MoreHorizontal, Eye, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryBadge } from "@/features/categories/components/category-badge";
import { useAdminProductsStore } from "../stores/admin-products-store";
import ProductForm from "../components/product-form";
import { useNavigate } from "react-router";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";

export const columns: ColumnDef<ProductDTO>[] = [
  // Checkbox column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Original columns
  {
    accessorKey: "productId",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    enableSorting: true,
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      return new Intl.NumberFormat("fil-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) =>
      row.getValue("isFeatured") ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories: string[] = row.getValue("categories");
      return (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryBadge
              key={category}
              category={category}
              className="text-xs"
            />
          ))}
        </div>
      );
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={"http://localhost:8000" + row.getValue("image")}
        alt="Product"
        className="h-10 w-10 object-cover rounded-md"
      />
    ),
  },
  // Actions column
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const { mutate } = useDeleteProduct();
      const navigator = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator(`/admin/products/${product.productId}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Edit", product.productId)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => mutate(product.productId)}
              className="text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const AddButton = () => {
  const { setIsOpen } = useAdminProductsStore();

  return <Button onClick={() => setIsOpen(true)}>Add Product</Button>;
};

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/products",
    itemName: "Product List",
  },
];

const AdminProducts = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { data, isFetched } = useFetchProducts();
  const { setActivePage, setBreadcrumbList } = useBreadcrumb();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[1]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>Products</h1>
      {isFetched && (
        <DataTable
          actions={[<AddButton />]}
          columnFilter="productName"
          columns={columns}
          data={data!}
        />
      )}

      <ProductForm />
    </AdminLayout>
  );
};

export default AdminProducts;
