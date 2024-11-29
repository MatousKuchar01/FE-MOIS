"use client";

import '/src/app/styles/create-article.css';
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { API_URL } from '../apiDevConfig'; 
import { useFlashMessage } from "../components/flashMessageContext";

const TinyMCE = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), { ssr: false });

export default function CreateArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const { showFlashMessage } = useFlashMessage();

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            showFlashMessage("Pro přidávání článků se musíte přihlásit.", "info");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/stories/article/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ articleTitle: title, articleText: content }),
            });

            const data = await res.json();

            if (res.ok) {
                showFlashMessage("Článek byl úspěšně přidán!", "success");
                router.push("/articles");
            } else {
                showFlashMessage("Chyba při přidávání článku: " + data.message, "error");
            }
        } catch (error) {
            console.error("Chyba při přidávání článku", error);
            showFlashMessage("Chyba při přidávání článku.", "error");
        }
    };

    return (
        <div className="container">
            <h2>Vytvořte nový příspěvek</h2>
            <form onSubmit={handleCreateArticle}>
                <div className="title-container">
                    <label htmlFor="title"><strong>Nadpis článku:</strong></label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="title-input"
                        placeholder="Zadejte nadpis článku"
                        required
                    />
                </div>
                <TinyMCE
                    apiKey="la3t9efwuru75dofogkay6xgk2swq1ixsv9h28mf9vg8bbno"
                    value={content}
                    onEditorChange={(newContent) => setContent(newContent)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: ['advlist', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'wordcount'],
                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
                    }}
                />
                <button type="submit" className="create-article-button">Přidat článek</button>
            </form>
        </div>
    );
}
