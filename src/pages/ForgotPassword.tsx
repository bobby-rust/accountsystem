import React from "react";
import "../styles/forgotpassword.css";
import { User } from "../types/User";
import ResetPassword from "./ResetPassword";
const API_URL = "http://localhost:4000/api/users";

export default function ForgotPassword() {
    const [email, setEmail] = React.useState("");

    const [user, setUser] = React.useState<User | null>(null);

    const fetchUserByEmail = async (userEmail: String) => {
        console.log(userEmail);

        const user = {
            email: userEmail,
        };

        const response = await fetch(API_URL + "/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        return response.json();
    };

    const handleSubmit = async (event: React.BaseSyntheticEvent) => {
        event.preventDefault();

        const currUser = await fetchUserByEmail(email);
        setUser(currUser);

        console.log(user);
    };

    const handleEmailChange = (event: React.BaseSyntheticEvent) => {
        setEmail(event.target.value);
    };

    return (
        <>
            {user && <ResetPassword user={user} />}
            {!user && (
                <div className='forgot-password-container'>
                    <form
                        onSubmit={handleSubmit}
                        className='forgot-password-form'>
                        <label>
                            Enter your email:
                            <input
                                type='email'
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </label>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}
