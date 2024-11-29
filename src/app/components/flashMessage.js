import React, { useState, useEffect } from "react";


const FlashMessage = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`flash-message ${type}`}>
            {message}
        </div>
    );
};

export default FlashMessage;

