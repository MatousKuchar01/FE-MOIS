"use client";

import React, { createContext, useState, useContext } from "react";
import "../styles/flashMessage.css";


const FlashMessageContext = createContext();

export const useFlashMessage = () => {
    return useContext(FlashMessageContext);
};

export const FlashMessageProvider = ({ children }) => {
    const [flashMessage, setFlashMessage] = useState(null);


    const showFlashMessage = (message, type = "success") => {
        setFlashMessage({message, type});
        setTimeout(() => {
            setFlashMessage(null);
        }, 5000);
    };

    return (
        <FlashMessageContext.Provider value={{flashMessage, showFlashMessage}}>
            {children}
        </FlashMessageContext.Provider>
    );
};
