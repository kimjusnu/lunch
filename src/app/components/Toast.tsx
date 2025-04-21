// components/Toast.tsx
"use client";

import { Snackbar } from "@mui/material";

const Toast = ({
    open,
    onClose,
    message,
}: {
    open: boolean;
    onClose: () => void;
    message: string;
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            message={message}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
    );
};

export default Toast;
