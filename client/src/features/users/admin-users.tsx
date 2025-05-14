import { useSidebar } from "@/features/sidebar/store";
import AdminLayout from "../../layouts/admin-layout";
import { useEffect } from "react";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useAuthStore } from "../auth/store";
import ForbiddenPage from "@/components/forbidden-page";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { User } from "./types";
import { useFetchUsers } from "./api/queries";
import { DataTable } from "@/components/data-table";

const columns: ColumnDef<User>[] = [
  // Selection Checkbox
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
  // User ID
  {
    accessorKey: "userId",
    header: "User ID",
  },
  // Profile Image
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) =>
      row.getValue("profile") ? (
        <img
          src={row.getValue("profile")}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-primary-foreground"></div>
      ),
  },
  // Name
  {
    accessorKey: "name",
    header: "Name",
  },
  // Email
  {
    accessorKey: "email",
    header: "Email",
  },
  // Company
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => <span>{row.getValue("company") || "N/A"}</span>,
  },
  // Role
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.getValue("role") === "Admin"
            ? "border-red-200 text-red-600"
            : "border-blue-200 text-blue-600"
        }
      >
        {row.getValue("role")}
      </Badge>
    ),
  },
  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(user.userId.toString())
              }
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(user.profile, "_blank")}
            >
              View Profile Image
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Edit user", user)}>
              Edit User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete user", user)}
              className="text-red-500 focus:text-red-500"
            >
              Delete User
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
    href: "/admin/users",
    itemName: "User List",
  },
];

const AddOrderButton = () => <Button>Add User</Button>;

const AdminUsers = () => {
  const { setActiveItem, sidebarProps } = useSidebar();
  const { setBreadcrumbList, setActivePage } = useBreadcrumb();
  const { isAuthenticated, user } = useAuthStore();
  const { data: users, isSuccess } = useFetchUsers();

  useEffect(() => {
    setActiveItem(sidebarProps?.sections[0].items[4]);
    setBreadcrumbList(breadcrumbList);
    setActivePage(breadcrumbList[1]);
  }, [sidebarProps]);

  if (!isAuthenticated || user?.role != "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <AdminLayout>
      <h1>Users</h1>
      {isSuccess && (
        <>
          <DataTable
            actions={[<AddOrderButton />]}
            columnFilter="name"
            columns={columns}
            data={users!}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
