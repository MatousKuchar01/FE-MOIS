"use client";

import '/src/app/styles/login-register.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/authContext";
import { useFlashMessage } from "../components/flashMessageContext";
import { API_URL } from '../apiDevConfig';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn, setUsername: setContextUsername } = useAuth();
    const { showFlashMessage } = useFlashMessage();
    const router = useRouter();


    /*const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ username, password }),
            });

            if (res.ok) {
                setIsLoggedIn(true);
                setContextUsername(username); // Aktualizace kontextu
                showFlashMessage("Přihlášení bylo úspěšné.", "success");
                router.push("/");
            } else {
                showFlashMessage("Chyba při přihlášení.", "error");
            }
        } catch (error) {
            console.error("Chyba", error);
        }
    };*/

    // Pro rychlé testování na FE bez nutnosti volání API
    const handleLogin = async (e) => {
        e.preventDefault();

        showFlashMessage("Přihlášení bylo úspěšné.", "success");
        setIsLoggedIn(true);
        setContextUsername(username); // Aktualizace kontextu
        router.push("/");
    };

    const handleGoogleLogin = async () => {
        try {
            window.location.href = "/users/google_login";
        } catch (error) {
            console.error("Chyba při přihlášení přes Google", error);
        }
    };

    return (
        <div className="container">
            <h2>Přihlášení</h2>
            <form onSubmit={handleLogin}>
                <label>Uživatelské jméno:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Heslo:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Přihlásit se</button>
            </form>
        </div>
    );
}
