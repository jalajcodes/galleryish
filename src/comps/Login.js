import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const { user, googleLogin, anonLogin } = useAuth();
    const handleGuestLogin = () => {
        anonLogin();
    };
    return (
        <>
            {user && <Redirect to="/" />}
            <div className="login-container">
                <div className="login-box">
                    <button className="google" onClick={() => googleLogin()}>
                        Login with Google
                    </button>
                    <button className="guest" onClick={handleGuestLogin}>
                        Login as Guest
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
