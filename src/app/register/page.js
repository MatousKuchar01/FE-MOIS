"use client";

import Link from 'next/link';
import '/src/app/styles/login-register.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlashMessage } from "../components/flashMessageContext";
import { API_URL } from '../apiDevConfig';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { showFlashMessage } = useFlashMessage();
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showFlashMessage("Zadaná hesla se neshodují.", "error");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ username, password }),
            });

            if (res.ok) {
                showFlashMessage("Účet vytvořen! Můžete se přihlásit.", "success");
                await router.push("/login");
            } else {
                const data = await res.json();
                showFlashMessage("Chyba při registraci.", "error");
            }
        } catch (error) {
            console.error("Chyba při registraci", error);
        }
    };

    // Pro rychlé testování na FE bez nutnosti volání API
    const handleRegisterTest = async (e) => {
        e.preventDefault();

        showFlashMessage("Účet vytvořen! Můžete se přihlásit.", "success");

        router.push("/login");
    };

    return (
        <div className="container">
            <h2>Registrace</h2>
            <form onSubmit={handleRegister} className="register-form">
                <p>Již máte účet? <Link href="/login">Přihlásit se</Link></p>
                <label>Uživatelské jméno:</label>
                <input
                    type="text"
                    className="register-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Heslo:</label>
                <input
                    type="password"
                    className="register-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Potvrdit heslo:</label>
                <input
                    type="password"
                    className="register-field "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type='submit' className="register-button">Registrovat se</button>
            </form>
        </div>
    );
}
