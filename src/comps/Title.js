import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const Title = () => {
    const { user, signOut } = useAuth();
    const history = useHistory();
    const handleLogout = () => {
        signOut();
        setTimeout(() => {
            history.push("/");
        }, 1500);
    };
    return (
        <header>
            <div className="title">
                <nav>
                    <h1>
                        <Link to="/">Galleryish</Link>
                    </h1>
                    <div className="nav-links">
                        {user && user.email ? (
                            <>
                                <Link to="/myspace" className="button">
                                    My Space
                                </Link>
                                <div onClick={handleLogout} className="button">
                                    Logout
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="button">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
                {/* <p>Welcome to Galleryish!</p> */}
            </div>
        </header>
    );
};

export default Title;
