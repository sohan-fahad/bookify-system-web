'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@src/utils/cn.utils";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    overlayClassName?: string;
    contentClassName?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    position?: "center" | "top" | "bottom";
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    preventScroll?: boolean;
}

const Dialog = ({
    open,
    onClose,
    children,
    className = "",
    overlayClassName = "",
    contentClassName = "",
    size = "md",
    position = "center",
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    preventScroll = true,
}: DialogProps) => {
    const dialogRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (open) {
            if (preventScroll) {
                document.body.style.overflow = "hidden";
            }
        }

        return () => {
            if (preventScroll) {
                document.body.style.overflow = "unset";
            }
        };
    }, [open, closeOnEscape, onClose, preventScroll]);

    const handleOverlayClick = (event: React.MouseEvent) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleDialogClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full mx-4",
    };

    const positionClasses = {
        center: "items-center justify-center",
        top: "items-start justify-center pt-16",
        bottom: "items-end justify-center pb-16",
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const dialogVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: position === "top" ? -50 : position === "bottom" ? 50 : 0
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: position === "top" ? -50 : position === "bottom" ? 50 : 0
        },
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className={cn(
                        "fixed inset-0 z-50 flex",
                        positionClasses[position],
                        overlayClassName
                    )}
                    onClick={handleOverlayClick}
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    <motion.div
                        ref={dialogRef}
                        className={cn(
                            "relative bg-background rounded-lg shadow-xl w-full",
                            sizeClasses[size],
                            contentClassName,
                            className
                        )}
                        onClick={handleDialogClick}
                        variants={dialogVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2, type: "spring", damping: 25 }}
                    >
                        {showCloseButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full hover:bg-gray-100 text-white hover:text-black"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}

                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const DialogHeader = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>
        {children}
    </div>
);

const DialogTitle = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
        {children}
    </h2>
);

const DialogDescription = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <p className={cn("text-sm text-muted-foreground", className)}>
        {children}
    </p>
);

const DialogContent = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn("space-y-4", className)}>
        {children}
    </div>
);

const DialogFooter = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4", className)}>
        {children}
    </div>
);

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter };