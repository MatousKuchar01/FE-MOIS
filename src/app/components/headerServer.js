import { cookies } from 'next/headers';
import Header from './header';

export default async function HeaderServer({ setIsLoggedIn, setUsername }) {
    const cookieStore = cookies();
    const hash = cookieStore.get("user_cookie");

    let isLoggedIn = false;
    let username = '';
    let id = -1;

    if (hash) {
        const user_info = parseJwt(hash.value);
        isLoggedIn = true;
        id = user_info.id;
        username = user_info.username;
    }

    return <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} username={username} id={id} />;
}

function parseJwt(token) {
    var base64Url = token.split('.')[0];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = Buffer.from(base64, 'base64').toString('ascii');
    return JSON.parse(jsonPayload);
}
