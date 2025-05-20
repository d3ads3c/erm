"use client"
import { useState, useEffect } from "react"

type InfoProp = {
    Permissions: string
    ID: string
    Departman: string
}

export function useUserInfo() {
    const [info, setInfo] = useState<InfoProp | null>(null);

    useEffect(() => {
        getUserInfo().then(setInfo);
    }, []);

    return info;
}

export async function getUserInfo() {
    const res = await fetch("/api/user/info");
    const data = await res.json();
    return data;
}