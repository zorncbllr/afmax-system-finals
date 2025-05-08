import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { ColumnDef } from "@tanstack/react-table";
import { Inventory } from "@/features/inventory/types";
import { DataTable } from "@/components/data-table";
import { useFetchInventoryData } from "@/features/inventory/hooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/features/inventory/components/status-badge";

const columns: ColumnDef<Inventory>[] = [
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
    accessorKey: "inventoryId",
    header: "Inventory ID",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));
      return `${quantity.toLocaleString()} ${row.original.abbreviation}`;
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "expiration",
    header: "Expiration Date",
  },
  {
    accessorKey: "dateStocked",
    header: "Date Stocked",
  },
  {
    accessorKey: "isExpired",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.isExpired ? "expired" : "active";
      return <StatusBadge status={status} size="sm" />;
    },
  },
];

export const breadcrumbList: BreadcrumbItem[] = [
  {
    href: "/admin/dashboard",
    itemName: "Admin",
  },
  {
    href: "/admin/inventoy",
    itemName: "Inventory",
  },
];

const AddItemButton = () => <Button>Add Item</Button>;

const AdminInventory = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { data: inventoryData, isFetched } = useFetchInventoryData();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[2]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  return (
    <AdminLayout>
      <h1>Admin Inventory</h1>
      {isFetched && (
        <DataTable
          columnFilter="productName"
          columns={columns}
          data={inventoryData!}
          actions={[<AddItemButton />]}
        />
      )}
    </AdminLayout>
  );
};

export default AdminInventory;
