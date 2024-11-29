"use client";

import { useState, useEffect } from 'react';
import '/src/app/styles/article.css';
import { API_URL } from '../apiDevConfig';
import { useFlashMessage } from "../components/flashMessageContext";

export default function ArticleWall() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { showFlashMessage } = useFlashMessage();
    const [editingArticle, setEditingArticle] = useState(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch(`${API_URL}/stories/article_get_list`);
                const data = await res.json();

                if (res.ok) {
                    // Předpokládáme, že data mají strukturu [{articleRating:int, articleTitle:str, authorId:int}, ...]
                    setArticles(data);
                } else {
                    console.error("Chyba při načítání článků");
                }
            } catch (error) {
                console.error("Chyba při připojování k serveru", error);
            }
        }
        fetchArticles();
    }, []);


    const fetchArticleDetails = async (articleId) => {
        try {
            const res = await fetch(`${API_URL}/stories/article?id=${articleId}`);
            const data = await res.json();

            if (res.ok) {
                setSelectedArticle(data);
            } else {
                console.error("Chyba při načítání detailů článku");
            }
        } catch (error) {
            console.error("Chyba při připojování k serveru", error);
        }
    };



    const handleDeleteArticle = async (articleId) => {
        try {
            const res = await fetch(`${API_URL}/stories/article/delete`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify({articleId}),
            });

            if (res.ok) {
                setArticles(articles.filter(article => article.id !== articleId));
                showFlashMessage("Článek smazán.", "warning");
            } else {
                showFlashMessage("Chyba při mazání článku.", "error");
            }
        } catch (error) {
            console.error("Chyba při mazání článku", error);
        }
    };

    const handleRateArticle = async (articleId, vote) => {
        try {
            const res = await fetch(`${API_URL}/stories/article/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articleId, vote }),
            });

            if (res.ok) {
                const updatedArticle = await res.json();
                setArticles(articles.map(article =>
                    article.id === articleId ? { ...article, articleRating: updatedArticle.articleRating } : article
                ));
                showFlashMessage("Článek byl ohodnocen.", "info");
            } else {
                showFlashMessage("Chyba při hodnocení článku.", "error");
            }
        } catch (error) {
            console.error("Chyba při hodnocení článku", error);
        }
    };

    const handleEditArticle = async (articleId, articleTitle, articleText) => {
        try {
            const res = await fetch(`${API_URL}/stories/article/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articleId, articleTitle, articleText }),
            });

            if (res.ok) {
                await res.json();
                setArticles(articles.map(article =>
                    article.id === articleId ? { ...article, articleTitle, articleText } : article
                ));
                showFlashMessage("Článek byl úspěšně upraven.", "success");
                setEditingArticle(null);
            } else {
                showFlashMessage("Chyba při úpravě článku.", "error");
            }
        } catch (error) {
            console.error("Chyba při úpravě článku", error);
        }
    };

    const handleStartEditing = (article) => {
        setEditingArticle(article);
    };

    const handleCancelEditing = () => {
        setEditingArticle(null);
    };

    return (
        <div className="blog-wall">
            <h2 className="wall-h2">Nejnovější příspěvky</h2>
            <div className="wall">
                {articles.map((article) => (
                    <div key={article.id} className="post">
                        {editingArticle && editingArticle.id === article.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingArticle.articleTitle}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, articleTitle: e.target.value })}
                                />
                                <textarea
                                    value={editingArticle.articleText}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, articleText: e.target.value })}
                                />
                                <button onClick={() => handleEditArticle(article.id, editingArticle.articleTitle, editingArticle.articleText)}>Uložit změny</button>
                                <button onClick={handleCancelEditing}>Zrušit</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{article.articleTitle}</h3>
                                <p>{article.articleText.substring(0, 150)}...</p>
                                <p>Hodnocení: {article.articleRating}</p>
                                <button onClick={() => handleRateArticle(article.id, 1)}>Hodnotit +1</button>
                                <button onClick={() => handleRateArticle(article.id, -1)}>Hodnotit -1</button>
                                <button onClick={() => handleDeleteArticle(article.id)}>Smazat</button>
                                <button onClick={() => handleStartEditing(article)}>Upravit</button>
                                <button onClick={() => fetchArticleDetails(article.id)}>Přečíst více</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedArticle && (
                <div className="article-details">
                    <h2>{selectedArticle.articleTitle}</h2>
                    <p>{selectedArticle.articleText}</p>
                    <p>Hodnocení: {selectedArticle.articleRating}</p>
                    <p>Autor ID: {selectedArticle.authorId}</p>
                    <button onClick={() => setSelectedArticle(null)}>Zavřít</button>
                </div>
            )}
        </div>
    );
}
