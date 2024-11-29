"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallback() {
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/users/google_login_callback", {
                    method: "GET",
                });

                if (res.ok) {
                    alert("Přihlášení přes Google úspěšné");
                    router.push("/"); 
                } else {
                    alert("Chyba při přihlášení přes Google");
                }
            } catch (error) {
                console.error("Chyba při zpracování callbacku", error);
            }
        };

        fetchData();
    }, [router]);

    return (
        <div>
            <h2>Zpracováváme přihlášení přes Google...</h2>
        </div>
    );
}
