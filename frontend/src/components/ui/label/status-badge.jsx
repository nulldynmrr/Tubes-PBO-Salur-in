import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const statusVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        accepted:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        rejected:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        pending:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        processing:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        completed:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        default:
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function StatusBadge({ className, variant, status, ...props }) {
  let finalVariant = variant || "default";

  if (status) {
    const statusLower = status.toLowerCase();
    if (
      statusLower === "accepted" ||
      statusLower === "rejected" ||
      statusLower === "pending" ||
      statusLower === "processing" ||
      statusLower === "completed" ||
      statusLower === "default"
    ) {
      finalVariant = statusLower;
    }
  }

  return (
    <span
      className={cn(statusVariants({ variant: finalVariant }), className)}
      {...props}
    >
      {status || variant || "Unknown"}
    </span>
  );
}
