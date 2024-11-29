"use client";

import Link from 'next/link';
import ArticleWall from "@/app/article/page";
import Footer from './components/footer';
import { useState } from "react";
import { useFlashMessage } from "./components/flashMessageContext";

export default function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const { flashMessage } = useFlashMessage();

    return (
        <div className="container">
            {flashMessage && (
                <div className={`flash-message ${flashMessage.type}`}>
                    {flashMessage.message}
                </div>
            )}
            <section className="add-article-section">
                <Link href="/create-article">
                    <button>Přidat článek</button>
                </Link>
            </section>
            <ArticleWall />
            <Footer />
        </div>
    );
}
