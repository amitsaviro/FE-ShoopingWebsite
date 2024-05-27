import React, { useRef, useState, useEffect, Fragment } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/Register.css";
import { createNewCustomer } from "../components/services/customerApi";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Login";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = firstName.trim() !== '';
        const v4 = lastName.trim() !== '';
        const v5 = email.trim() !== '';
        const v6 = phoneNumber.trim() !== '';
        const v7 = address.trim() !== '';
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
            setErrMsg("Please fill in all fields correctly");
            return;
        }
        try {
            const newCustomerBody = {
                userName: user,
                password: pwd,
                firstName,
                lastName,
                email,
                phoneNumber,
                address
            };
            const response = await createNewCustomer(newCustomerBody);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 500) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <Fragment>
            {success ? (
                <section className="success-section">
                    <div className="success-content">
                    <h1>Success!</h1>
                    <p>
                        <Link className="log-link" to={"/login"}>Sign In</Link>
                    </p>
                    </div>
                </section>
            ) : (
                <section className="register-section">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                        {errMsg}
                    </p>
                    <h1>Register</h1>
                    <form className="reg-form" onSubmit={handleSubmit}>
                        <label htmlFor="username" className={validName ? "valid" : ""}>
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName && userFocus ? "valid" : "hide"} />
                            {(userFocus && !validName && user) && <FontAwesomeIcon icon={faTimes} className="invalid" />}  
                        </label>
                        <input
                            className="reg-input"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="password" className={validPwd ? "valid" : ""}>
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd && pwdFocus ? "valid" : "hide"} />
                            {(pwdFocus && !validPwd && pwd) && <FontAwesomeIcon icon={faTimes} className="invalid" />}
                        </label>
                        <input
                            className="reg-input"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters,<br /> a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
                        </p>

                        <label htmlFor="confirm_pwd" className={validMatch && matchPwd ? "valid" : ""}>
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchFocus ? "valid" : "hide"} />
                            {(matchFocus && !validMatch && matchPwd) && <FontAwesomeIcon icon={faTimes} className="invalid" />}
                        </label>
                        <input
                            className="reg-input"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="firstName">First Name:</label>
                        <input
                            className="reg-input"
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />

                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            className="reg-input"
                            type="text"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            className="reg-input"
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            className="reg-input"
                            type="tel"
                            id="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />

                        <label htmlFor="address">Address:</label>
                        <input
                            className="reg-input"
                            type="text"
                            id="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />

                        <button className="signUp-btn" disabled={!validName || !validPwd || !validMatch || !firstName || !lastName || !email || !phoneNumber ||!address}>
                            Sign Up
                        </button>
                    </form>
                    <p className="already-registered">
                        Already registered? <br />
                         <span className="line">
                        <Link  className="loginLink" to="/login">Login</Link>
                        </span>
                    </p>
                </section>
            )}
        </Fragment>
    );
};

export default Register;
