import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../../../../layouts/admin-layout";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";

import { ProductTableDTO } from "@/features/products/types";
import { useFetchAdminProducts } from "@/features/products/api/queries";

import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  X,
  MoreHorizontal,
  Eye,
  Trash2,
  Pencil,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryBadge } from "@/features/categories/components/category-badge";
import ProductForm from "../../components/product-form";
import { useNavigate } from "react-router";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useProductFormStore } from "../../store";
import { useSetFeatured } from "@/features/featured-products/mutations";
import { useDeleteProduct } from "../../api/mutations";
import ForbiddenPage from "@/components/forbidden-page";
import { useAuthStore } from "@/features/auth/store";

export const columns: ColumnDef<ProductTableDTO>[] = [
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
      const { mutate: mutateDelete } = useDeleteProduct();
      const navigator = useNavigate();
      const { mutate: mutateFeatured } = useSetFeatured();

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
            </DropdownMenuItem>{" "}
            <DropdownMenuItem
              onClick={() =>
                mutateFeatured({
                  productId: product.productId,
                  value: !product.isFeatured,
                })
              }
            >
              {product.isFeatured ? (
                <>
                  <XIcon className="mr-2 h-4 w-4" />
                  Featured
                </>
              ) : (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Feature
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator(`/admin/products/edit/${product.productId}`)
              }
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => mutateDelete(product.productId)}
              className="text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const AddButton = () => {
  const { setIsOpen } = useProductFormStore();

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
  const { data: products, isSuccess } = useFetchAdminProducts();
  const { setActivePage, setBreadcrumbList } = useBreadcrumb();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[1]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || user?.role != "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <AdminLayout>
      <h1>Products</h1>
      {isSuccess && (
        <>
          <DataTable
            actions={[<AddButton />]}
            columnFilter="productName"
            columns={columns}
            data={products!}
          />
          <ProductForm />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
