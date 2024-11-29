"use client";

import Link from 'next/link';
import { useAuth } from "./authContext";

export default function Header() {
    const { isLoggedIn, setIsLoggedIn, username, setUsername } = useAuth();

    const handleLogout = async () => {
        try {
            const res = await fetch("/users/logout", {
                method: "GET",
            });

            if (res.ok) {
                setUsername('');
                setIsLoggedIn(false);
                alert("Úspěšně odhlášeno");
            } else {
                alert("Chyba při odhlašování");
            }
        } catch (error) {
            console.error("Chyba při odhlašování", error);
        }
    };

    return (
        <header>
            <div className="logo-container">
                <div className="logo-box">
                    <img src="/images/logo.png" alt="Logo" className="logo" />
                </div>
                <Link href="/" className="header-title">
                    <h1>Blogování s JS</h1>
                </Link>
            </div>
            <nav>
                {isLoggedIn ? (
                    <>
                        <div className="user-info">
                            <span>Přihlášený uživatel: {username}</span>
                        </div>
                        <Link href="/profile">Můj profil</Link>
                        <button onClick={handleLogout}>Odhlásit se</button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Přihlásit se</Link>
                        <Link href="/register">Registrovat se</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
