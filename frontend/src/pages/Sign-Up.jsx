import React from "react";
import { useState } from "react";
import api from "../api";
import './Sign-Up.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [err, setErr] = useState("");
    const navigate = useNavigate();



    const handleSignup = async (role) => {
        if (!email || !password || !passwordConfirmed || !height || !weight) {
            setErr("all fields must be filled!")
            return;
        }

        if (height < 0 || weight < 0) {
            setErr("height and weight fields must be positive!")
            return;
        }

        if (password !== passwordConfirmed) {
            setErr("password fields must be matching!");
            return;
        }

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValid(emailRegex.test(email));
        }

        if (!isValid) {
            setErr("Please enter a valid email address.")
            return;
        }

        setErr("");
        if (role === "user") {
            try {
                const response = await api.post("/users/signup", {
                    email,
                    password,
                    height,
                    weight,
                });
                if (response.data.success) {
                    navigate("/login");
                }
            } catch (error) {
                setErr("Signup failed.");
            }
        }
    }

    return (
        <>
            <div id="login-box" style={{ 'height': '450px', 'maxHeight': '450px', 'marginTop': '70px' }}>
                <div className="left">
                    <h1>Sign up</h1>

                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        style={{ 'border': isValid ? '' : '1px solid red' }}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true} />

                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required={true} />

                    <input
                        type="password"
                        name="passwordConfrimed"
                        value={passwordConfirmed}
                        placeholder="Confirm password"
                        onChange={(e) => setPasswordConfirmed(e.target.value)}
                        required={true} />

                    <input
                        type="number"
                        name="height"
                        value={height}
                        placeholder="Height in cm"
                        onChange={(e) => setHeight(e.target.value)}
                        required={true} />

                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        placeholder="Weight in kg"
                        onChange={(e) => setWeight(e.target.value)}
                        required={true} />

                    {err &&
                        <div style={{ "color": "red", "fontSize": "14px" }}>
                            {err}
                        </div>
                    }

                    <input
                        type="submit"
                        name="signup_submit"
                        value="Sign me up"
                        onClick={() => handleSignup("user")} />
                </div>
            </div>
        </>
    );
};
export default SignUp;