import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Paper, IconButton, Typography } from "@mui/material";
import {
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Close as CloseIcon,
} from "@mui/icons-material";

import { ToastContext, ToastType } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    const showToast = useCallback(
        (message: string, type: ToastType = "success") => {
            setToast({ message, type });
            setTimeout(() => setToast(null), 3000);
        },
        []
    );

    const getIcon = (type: ToastType) => {
        switch (type) {
            case "success":
                return <SuccessIcon sx={{ color: "#10b981" }} />;
            case "error":
                return <ErrorIcon sx={{ color: "#ef4444" }} />;
            case "info":
                return <InfoIcon sx={{ color: "#6366f1" }} />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <AnimatePresence>
                {toast && (
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        sx={{
                            position: "fixed",
                            top: 40,
                            right: "10%",
                            transform: "translateX(-50%)",
                            zIndex: 9999,
                            pointerEvents: "none",
                        }}
                    >
                        <Paper
                            elevation={10}
                            sx={{
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                minWidth: 400,
                                borderRadius: 3,
                                pointerEvents: "auto",
                            }}
                        >
                            {getIcon(toast.type)}
                            <Typography variant="body2" sx={{ fontWeight: 600, flexGrow: 1 }}>
                                {toast.message}
                            </Typography>
                            <IconButton size="small" onClick={() => setToast(null)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Paper>
                    </Box>
                )}
            </AnimatePresence>
        </ToastContext.Provider>
    );
}
