import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";

import { ProductDTO } from "@/features/products/types";
import { useFetchProducts } from "@/features/products/product-hooks";

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
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/components/category-badge";

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
    accessorKey: "imagePath",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.getValue("imagePath")}
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
              onClick={() =>
                navigator.clipboard.writeText(product.productId.toString())
              }
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
              onClick={() => console.log("Delete", product.productId)}
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
const AdminProducts = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { data, isFetched } = useFetchProducts();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[1]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>products</h1>
      {isFetched && (
        <DataTable columnFilter="productName" columns={columns} data={data!} />
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
