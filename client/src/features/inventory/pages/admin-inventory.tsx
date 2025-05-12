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
import CreateInventoryForm from "../components/inventory-creation-form";
import EditInventoryForm from "../components/inventory-edit-form";

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

      if (raw.quantity > 0) {
        return `${raw.quantity} ${raw.abbreviation}`;
      }

      return "----";
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const unit = row.original.unit;

      if (unit.length > 0) {
        return unit;
      }

      return "----";
    },
  },
  {
    accessorKey: "expiration",
    header: "Expiration Date",
    cell: ({ row }) => {
      const expiration = row.original.expiration;

      if (expiration.length > 0) {
        return expiration;
      }

      return "----";
    },
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
      const { setIsEditFormOpen, setInventoryId } = useInventoryStore();

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
              onClick={() => {
                setInventoryId(raw.inventoryId);
                setIsEditFormOpen(true);
              }}
            >
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
  const { setIsCreationFormOpen } = useInventoryStore();

  return <Button onClick={() => setIsCreationFormOpen(true)}>Add Item</Button>;
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

      <CreateInventoryForm />
      <EditInventoryForm />
    </AdminLayout>
  );
};

export default AdminInventory;
