import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { User } from "../types/User";

const API_URL = "http://localhost:4000/api/users";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    /**
     * Sends a post request with a User object to the user api and returns the response
     * @param user The user whose data is to be retrieved
     */
    async function LoginUser(user: User) {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response) {
            console.log(response);
            return response.json();
        }
    }

    /**
     * Logs in user using form  values
     * @return undefined
     */
    async function handleSubmit(event: React.BaseSyntheticEvent) {
        event.preventDefault();

        const userObj: User = {
            email: email,
            username: username,
            password: password,
        };

        const user = await LoginUser(userObj);

        console.log(user);

        if (user.message === "Invalid credentials") {
            console.log("Invalid credentials");
            alert("Invalid credentials");
            return;
        } else if (user.message === "Unknown error") {
            console.log("An unknown error has occurred");
            alert("An unknown error has occurred");
        }

        console.log(user);
        navigate("/profile", { state: user });
    }

    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }

    function handleUsernameChange(event: React.BaseSyntheticEvent) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.BaseSyntheticEvent) {
        setPassword(event.target.value);
    }

    return (
        <>
            <div className='login'>
                <div>Login</div>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className='email-container'>
                        <label>
                            Email:
                            <input
                                type='email'
                                name='email'
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </label>
                    </div>
                    <div className='username-container'>
                        <label>
                            Username:
                            <input
                                type='text'
                                name='username'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </label>
                    </div>
                    <div className='password-container'>
                        <label>
                            Password:
                            <input
                                type='password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </label>
                    </div>
                    <div className='forgot-password'>
                        <Link to='/forgotpassword'>Forgot Password?</Link>
                    </div>
                    <button type='submit' value='Submit'>
                        Submit
                    </button>
                </form>
                <div>
                    <Link to='/signup'>Sign Up</Link>
                </div>
                <div>
                    <Link to='/'>Home</Link>
                </div>
            </div>
        </>
    );
}
