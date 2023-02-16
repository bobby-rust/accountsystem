import { Link } from "react-router-dom";
import React from "react";
import "../styles/signup.css";

const API_URL = "http://localhost:4000/api/users";

export default function SignUp(props: any) {
    const users = getUsers();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    async function getUsers() {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) =>
            res
                .json()
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
        );
    }

    async function postUser(user: any) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return response.json();
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(`Email: ${email}`);
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        setUsername("");
        setPassword("");
        setEmail("");
    }

    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }

    function handleUsernameChange(event: any) {
        // event.preventDefault();
        console.log(username);
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: any) {
        // event.preventDefault();
        console.log(password);
        setPassword(event.target.value);
    }

    return (
        <div className='signup'>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit} className='signup-form'>
                <div className='email-container'>
                    <label>
                        Email:
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleEmailChange}
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
                <button type='submit' value='Submit'>
                    Submit
                </button>
            </form>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </div>
    );
}
