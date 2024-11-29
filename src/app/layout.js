import "./styles/globals.css";
import Header from './components/headerServer';
import { FlashMessageProvider } from "./components/flashMessageContext";
import { AuthProvider } from "./components/authContext";

export const metadata = {
    title: "Blogování s JS",
    description: "Projekt na MOIS",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <FlashMessageProvider>
                <Header />
                <main>{children}</main>
            </FlashMessageProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
