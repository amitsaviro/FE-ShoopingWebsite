import React, { useRef, useState, useEffect, Fragment, useContext } from "react";
import "./CSS/Login.css";
import { authenticate } from "../components/services/authentication";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userBody = {
                username: user,
                password: pwd,
            };
            const response = await authenticate(userBody);
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('username', user);
            setSuccess(true);
            setAuth(response.data.jwt)
            setUser("");
            setPwd("");
        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response.status === 403) {
                setErrMsg("Incorrect Username Or Password");
            } else {
                setErrMsg("Authentication Failed");
            }
            errRef.current.focus();
        }
    };
    

    return (
        <Fragment>
            {success ? (
                <section className="login-secced-msg" >
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link className="login-link" to={"/"}>Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section className="login-section">
                    <p ref={errRef} className={errMsg ? "error_mes" : "offscreen"}>
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="userName">User Name:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            className="login-input"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className="login-btn" type="submit" disabled={!user || !pwd}>
                            Sign In
                        </button>
                    </form>
                    <p className="needAnAccount">
                        Need an Account?
                        <br />
                        <span className="line">
                            <Link className="register" to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </Fragment>
    );
}

export default Login;
///