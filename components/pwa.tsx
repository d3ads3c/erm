"use client";
import React, { useEffect } from "react";

export default function Pwa() {
    const handleEnableNotifications = async () => {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register("/sw.js")
        }
    };
    useEffect(() => {
        handleEnableNotifications()
    }, []);

    return <></>;
}