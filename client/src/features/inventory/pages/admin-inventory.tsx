import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../../../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { ColumnDef } from "@tanstack/react-table";
import { Inventory } from "@/features/inventory/types";
import { DataTable } from "@/components/data-table";
import { useFetchInventoryData } from "@/features/inventory/api/queries";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/features/inventory/components/status-badge";
import { useInventoryStore } from "../store";
import InventoryForm from "../components/inventory-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PencilIcon, Trash2 } from "lucide-react";
import { useDeleteInventory } from "../api/mutations";

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
      const raw = row.original;

      return `${raw.quantity} ${raw.abbreviation}`;
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

  {
    id: "actions",
    cell: ({ row }) => {
      const raw = row.original;
      const { mutate: deleteInventory } = useDeleteInventory();

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
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => deleteInventory(raw.inventoryId)}
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

const AddItemButton = () => {
  const { setIsOpen } = useInventoryStore();

  return <Button onClick={() => setIsOpen(true)}>Add Item</Button>;
};

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
          columnFilter="product"
          columns={columns}
          data={inventoryData!}
          actions={[<AddItemButton />]}
        />
      )}

      <InventoryForm />
    </AdminLayout>
  );
};

export default AdminInventory;
