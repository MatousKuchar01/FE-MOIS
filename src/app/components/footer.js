export default function Footer() {
    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} - Školní projekt studentů UHK pro předmět MOIS</p>
        </footer>
    );
}

const footerStyle = {
    backgroundColor: '#171717',
    color: '#ffffff',
    textAlign: 'center',
    padding: '1rem 0',
    position: 'relative',
    bottom: '0',
    width: '100%',
};

