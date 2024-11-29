"use client";

import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import '../styles/profile.css';
import { useFlashMessage } from "../components/flashMessageContext";
import { API_URL } from '../apiDevConfig';

export default function Profile({ isLoggedIn }) {

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [subscriptions, setSubscriptions] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);
    const { showFlashMessage } = useFlashMessage();
    const { flashMessage } = useFlashMessage();
    const router = useRouter();


    useEffect(() => {
        const fetchUserData = async () => {

            const res = await fetch(`${API_URL}/users/profile`);

            if (res.ok) {
                const data = await res.json();
                setUsername(data.username);
                setBio(data.bio);
                setSubscriptions(data.subscriptions);
                setProfilePicture(data.profilePicture);
            } else {
                console.error('Error fetching user data');
            }
        };


        if (isLoggedIn) {
            fetchUserData();
        } else {
            router.push("/login");
        }
    }, [isLoggedIn, router]);


        const handleChangeUsername = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/users/change_username`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ username }),
            });


            if (res.ok) {
                showFlashMessage("Uživatelské jméno bylo úspěšně změněno.", "success");
            } else {
                showFlashMessage("Změna uživatelského jména se nepovedla. Zkuste jiné jméno.", "warning");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/users/change_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ password, newPassword }),
            });


            if (res.ok) {
                showFlashMessage("Heslo bylo úspěšně změněno.", "success");
            } else {
                showFlashMessage("Změna hesla se nepovedla. Zkuste jiné heslo.", "warning");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleBioChange = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/users/change_bio`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ bio }),
            });


            if (res.ok) {
                showFlashMessage("Bio bylo úspěšně změněno.", "success");
            } else {
                showFlashMessage("Změna bia se nepovedla.", "warning");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profilePicture', file);


        try {
            const res = await fetch(`${API_URL}/users/change_profile_picture`, {
                method: "POST",
                body: formData,
            });


            if (res.ok) {
                showFlashMessage("Profilová fotka byla úspěšně změněna.", "success");
            } else {
                showFlashMessage("Změna profilové fotky se nepovedla.", "warning");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container">
            {flashMessage && (
                <div className={`flash-message ${flashMessage.type}`}>
                    {flashMessage.message}
                </div>
            )}
            <h2>Váš profil</h2>
            <div className="profile-picture">
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" />
                ) : (
                    <p>Žádná profilová fotka</p>
                )}
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
            <form onSubmit={handleChangeUsername}>
                <label>Nové uživatelské jméno:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Změnit uživatelské jméno</button>
            </form>
            <form onSubmit={handleChangePassword}>
                <label>Nové heslo:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Změnit heslo</button>
            </form>
            <form onSubmit={handleBioChange}>
                <label>O mně:</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
                <button type="submit">Uložit bio</button>
            </form>
            <h3>Přihlášené odběry:</h3>
            <ul>
                {subscriptions.map((subscription) => (
                    <li key={subscription.id}>{subscription.name}</li>
                ))}
            </ul>
        </div>
    );
}
