import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------- Variants -------------------- */

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-[--primaryBlack]",
        uptodate: "bg-[--secondaryGreen] text-[--primaryGreen]",
        actionRequired: "bg-red-100 text-red-500",
        pending: "bg-[--secondaryBlue] text-[--primaryBlue]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

/* -------------------- Badge Text -------------------- */

export type BadgeText =
  // Roles
  | "Residential Care"
  | "Ifashe Tugufashe"
  | "Internship"
  | "Health Post"
  // Statuses
  | "uptodate"
  | "actionRequired"
  | "pending";

/* -------------------- Props -------------------- */

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: BadgeText;
  variant?: BadgeVariant;
}

/* -------------------- Mapping -------------------- */

const mapTextToVariant = (text: BadgeText): BadgeVariant => {
  switch (text) {
    // Roles
    case "Residential Care":
    case "Health Post":
      return "uptodate";

    case "Internship":
      return "actionRequired";

    case "Ifashe Tugufashe":
      return "pending";

    // Statuses
    case "uptodate":
      return "uptodate";

    case "actionRequired":
      return "actionRequired";

    case "pending":
      return "pending";

    default:
      return "default";
  }
};

/* -------------------- Component -------------------- */

export function Badge({ className, text, variant, ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className={cn(
        badgeVariants({
          variant: variant ?? mapTextToVariant(text),
          className,
        }),
      )}
    >
      {text}
    </div>
  );
}
