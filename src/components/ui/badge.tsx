import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------- Variants -------------------- */

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-[--primaryBlack]",
        Up_to_date: "bg-[#D3FBEE] text-[#0C9857]",
        Action_Required: "bg-[#FEF8E6] text-[#F4B400]",
        Pending: "bg-[#EDF6FF] text-[#4DA3FF]",
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
  | "Up_to_date"
  | "Action_Required"
  | "Pending";

/* -------------------- Props -------------------- */

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: BadgeText;
  variant?: BadgeVariant;
}

/* -------------------- Mapping -------------------- */

const mapTextToVariant = (text: BadgeText): BadgeVariant => {
  switch (text) {
    // Roles
    // case "Residential Care":
    // case "Health Post":
    //   return "Up_to_date";

    // case "Internship":
    //   return "Action_Required";

    // case "Ifashe Tugufashe":
    //   return "pending";

    // Statuses
    case "Up_to_date":
      return "Up_to_date";

    case "Action_Required":
      return "Action_Required";

    case "Pending":
      return "Pending";

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
