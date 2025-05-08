import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "expired" | string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const statusVariants = {
  active: "bg-green-50 text-green-600 hover:bg-green-100",
  expired: "bg-red-50 text-red-600 hover:bg-red-100",
  default: "bg-gray-50 text-gray-600 hover:bg-gray-100",
} as const;

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function StatusBadge({
  status,
  className,
  action,
  size = "md",
}: StatusBadgeProps) {
  const variant =
    statusVariants[status as keyof typeof statusVariants] ||
    statusVariants.default;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md font-medium transition-colors duration-200",
        variant,
        sizeClasses[size],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
      {action}
    </span>
  );
}
