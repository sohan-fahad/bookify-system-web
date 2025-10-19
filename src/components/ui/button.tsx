import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {

        const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

        const variantClasses = {
            default: "bg-primary/80 text-white font-medium hover:bg-primary/90",
            destructive: "bg-red-600 text-foreground hover:bg-red-700",
            outline: "border border-gray-300 bg-white text-gray-900 hover:bg-primary/10 hover:text-primary",
            ghost: "text-gray-900 hover:bg-gray-100",
            link: "text-primary underline-offset-4 hover:underline",
        }

        const sizeClasses = {
            default: "h-8 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        const combinedClasses = [
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className
        ].filter(Boolean).join(" ")

        return (
            <button
                className={combinedClasses}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = "Button"

export { Button }