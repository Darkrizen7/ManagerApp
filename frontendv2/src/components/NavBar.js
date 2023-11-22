import { Link } from "react-router-dom";
import { useAuth } from "hooks/AuthContext";

const NavBar = () => {
    const { user, logout } = useAuth();
    if (!user) {
        return (
            <nav className="navbar">
                <h1>CRA 2024</h1>
                <div className="links">
                    <Link className="link" to="/login">Login</Link>
                </div>
            </nav>
        )
    }
    return (
        <nav className="navbar">
            <h1>CRA 2024</h1>
            <div className="links">
                <Link className="link" to="/">Accueil</Link>
                <Link className="link" to="/test">Test</Link>
                <Link className="link" to="/lists/get">Ma Liste</Link>
                <Link className="link" to="/lists">Listes</Link>
                <Link className="link" to="/transactions">Transactions</Link>
                <Link className="link" to="/members">Membres</Link>
                <Link className="link" to="/login" onClick={logout}>Se déconnecter</Link>
            </div>
        </nav>
    )
}

export { NavBar };