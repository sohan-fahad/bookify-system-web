import * as React from "react";
import { cn } from "@src/utils/cn.utils";

type CustomInputSize = "sm" | "default" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: "default" | "outline" | "filled" | "ghost";
    size?: CustomInputSize;
    error?: boolean;
    helperText?: string;
    label?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        className = "",
        variant = "default",
        size = "default",
        error = false,
        helperText,
        label,
        leftIcon,
        rightIcon,
        ...props
    }, ref) => {

        const baseClasses = "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

        const variantClasses = {
            default: "border-gray-300 bg-white hover:border-gray-400 focus:border-primary text-black ",
            outline: "border-2 border-gray-300 bg-transparent hover:border-gray-400 focus:border-primary",
            filled: "border-0 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary",
            ghost: "border-0 bg-transparent hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary",
        };

        const sizeClasses = {
            sm: "h-8 px-2 text-xs",
            default: "h-9 px-3 text-sm",
            lg: "h-12 px-4 text-base",
        };

        const errorClasses = error
            ? "border-red-500 focus-visible:ring-red-500"
            : "";

        const inputElement = (
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    className={cn(
                        baseClasses,
                        variantClasses[variant],
                        sizeClasses[size],
                        errorClasses,
                        leftIcon && 'pl-10',
                        rightIcon && 'pr-10',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {rightIcon}
                    </div>
                )}
            </div>
        );

        if (label || helperText) {
            return (
                <div className="space-y-2">
                    {label && (
                        <label className="text-sm font-medium text-white block">
                            {label}
                        </label>
                    )}
                    {inputElement}
                    {helperText && (
                        <p className={cn(
                            "text-xs block",
                            error ? 'text-red-500' : 'text-gray-500'
                        )}>
                            {helperText}
                        </p>
                    )}
                </div>
            );
        }

        return inputElement;
    }
);

Input.displayName = "Input";

export { Input };