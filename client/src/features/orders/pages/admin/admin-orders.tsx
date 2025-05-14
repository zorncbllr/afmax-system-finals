import ForbiddenPage from "@/components/forbidden-page";
import { useAuthStore } from "@/features/auth/store";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "@/layouts/admin-layout";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { Order } from "../../types";
import { useFetchOrders } from "../../api/queries";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, ReceiptTextIcon, Trash2 } from "lucide-react";

export const columns: ColumnDef<Order>[] = [
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
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "orderList",
    header: "Products",
    cell: ({ row }) => (
      <div className="whitespace-normal">{row.getValue("orderList")}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.getValue("email")}`}
        className="text-blue-500 hover:underline"
      >
        {row.getValue("email")}
      </a>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ReceiptTextIcon className="mr-2 h-4 w-4" />
              Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/orders",
    itemName: "Orders",
  },
];

const AdminOrders = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { isAuthenticated, user } = useAuthStore();
  const { data: orders, isSuccess } = useFetchOrders();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[3]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || user?.role != "Admin") {
    return <ForbiddenPage />;
  }

  const AddOrderButton = () => <Button>Add Order</Button>;

  return (
    <AdminLayout>
      <h1>Orders</h1>
      {isSuccess && (
        <>
          <DataTable
            actions={[<AddOrderButton />]}
            columnFilter="user"
            columns={columns}
            data={orders!}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
