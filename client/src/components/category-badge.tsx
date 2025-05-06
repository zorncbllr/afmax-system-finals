import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const colorVariants = [
  "bg-blue-50 text-blue-600 hover:bg-blue-100",
  "bg-purple-50 text-purple-600 hover:bg-purple-100",
  "bg-pink-50 text-pink-600 hover:bg-pink-100",
  "bg-teal-50 text-teal-600 hover:bg-teal-100",
  "bg-orange-50 text-orange-600 hover:bg-orange-100",
  "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  "bg-rose-50 text-rose-600 hover:bg-rose-100",
] as const;

const getColorIndex = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % colorVariants.length;
};

export function CategoryBadge({
  category,
  className,
  action,
  size = "md",
}: CategoryBadgeProps) {
  const variant = colorVariants[getColorIndex(category)];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md font-medium transition-colors duration-200",
        variant,
        sizeClasses[size],
        className
      )}
    >
      {category}
      {action}
    </span>
  );
}
