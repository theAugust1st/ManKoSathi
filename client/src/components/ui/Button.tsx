import type {ComponentProps } from "react"

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
}
function Button({children,className,variant="primary",...props}:ButtonProps) {
  const baseStyles = "px-4 py-1 md:px-6 md:py-2 min-w-[100px] rounded-lg text-xs sm:text-sm md:text-base lg:text-lg font-bold cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
  const variantSyles = {
    primary: "bg-brand-500 text-brand-50 hover:bg-brand-600",
    secondary: "border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-brand-50"
  }
  return (
  <button {...props}
  className={`${baseStyles} ${variantSyles[variant]} 
  ${className}`}
      >{children}</button>
  )
}

export default Button