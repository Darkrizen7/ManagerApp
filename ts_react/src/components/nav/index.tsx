import { useAuth, usePerm } from "hooks"
import { NavLink } from "react-router-dom"
export const Nav = (): JSX.Element => {
    const { logout, isConnected, user } = useAuth();
    const { hasAccess } = usePerm();
    return (<>
        <nav className="navbar">
            <h1>CRA 2024</h1>
            {!isConnected() &&
                <div className="links">
                    <NavLink to={"/login"}>
                        Login
                    </NavLink>
                </div>
            }
            {isConnected() &&
                <>
                    <div className="links">
                        <NavLink to={"/list"}>Ma Liste</NavLink>
                    </div>
                    {hasAccess("navbar.admin") &&
                        <>
                            <div className="links">
                                <NavLink to={"/members"}>Membres</NavLink>
                            </div>
                            <div className="links">
                                <NavLink to={"/lists"}>Listes</NavLink>
                            </div>
                            <div className="links">
                                <NavLink to={"/transactions"}>Transactions</NavLink>
                            </div>
                        </>
                    }
                    <div className="links">
                        <p>Connected as {user?.username}</p>
                    </div>
                    <div className="links">
                        <a href="#" onClick={logout}>Logout</a>
                    </div>
                </>
            }
        </nav >

    </>)
}