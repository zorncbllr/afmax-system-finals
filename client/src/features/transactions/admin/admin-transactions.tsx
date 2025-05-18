import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../../../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useAuthStore } from "../../auth/store";
import ForbiddenPage from "@/components/forbidden-page";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types";
import { useFetchTransactions } from "../api/queries";
import { DataTable } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "payment",
    header: "Payment Method",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <div>{formattedDate}</div>;
    },
  },
];

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/transactions",
    itemName: "Transaction List",
  },
];

const AdminTransactions = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { isAuthenticated, user } = useAuthStore();
  const { data: transactions, isSuccess } = useFetchTransactions();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[5]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || user?.role != "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <AdminLayout>
      <h1>Orders</h1>
      {isSuccess && (
        <>
          <DataTable
            actions={[<></>]}
            columnFilter="user"
            columns={columns}
            data={transactions!}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminTransactions;
