import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

export const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      normal: "text-[14px]",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      black: "font-black",
    },
    color: {
      gray: "text-gray-500",
      gray_200: "text-gray-200",
      gray_300: "text-gray-300",
      gray_400: "text-gray-400",
      gray_500: "text-gray-500",
      gray_600: "text-gray-600",
      gray_700: "text-gray-700",
      gray_800: "text-gray-800",
      gray_900: "text-gray-900",
      white: "text-white",
      primary_200: "text-primary-200",
      primary_300: "text-primary-300",
      primary_500: "text-primary-500",
      primary_600: "text-primary-600",
      primary_700: "text-primary-700",
      primary_800: "text-primary-800",
      primary_900: "text-primary-900",
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
      danger: "text-red-600",
      destructive: "text-red-500",
      teal: "text-teal-600",
      muted: "text-muted-foreground",
    },
    variant: {
      p: "",
      title: "font-medium",
      titleBold: "font-semibold",
      containerTitle: "font-semibold text-gray-500",
      statisticNumber: "font-semibold text-primary-700",
      xs: "text-xs",
    },
  },

  compoundVariants: [
    {
      variant: "title",
      color: "gray",
      className: "text-gray-900",
    },
    {
      variant: "titleBold",
      color: "gray",
      className: "text-gray-900",
    },
  ],

  defaultVariants: {
    variant: "p",
    weight: "medium",
    size: "normal",
    color: "gray",
  },
});

type TextProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & VariantProps<typeof textVariants> &
  React.HTMLAttributes<HTMLElement>;

export default function Typography({
  children,
  className,
  color,
  variant,
  size,
  weight,
  as,
  ...props
}: TextProps) {
  let Component: ElementType = as || "p";
  if (!as && variant === "title") {
    Component = "h2";
  }

  return (
    <Component
      className={cn(textVariants({ weight, size, color, variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
