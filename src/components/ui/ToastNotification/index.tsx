import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastNotification = () => {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 6000,
                style: {
                    borderRadius: '20px',
                }
            }}
        />
    )
}
