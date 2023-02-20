import { Link } from "react-router-dom";
import React from "react";
import "../styles/signup.css";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/User";

const API_URL = "http://localhost:4000/api/users";

export default function SignUp() {
    const users: any = getUsers().finally(() => console.log(users));

    // console.log(users);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    async function getUsers() {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    }

    async function createUser(user: User) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.status === 200) {
            return response.json();
        } else if (response.status === 422) {
            // Handle duplicate key error
            const res = await response.json();
            const message = res.message;

            if (message.search("email") !== -1) {
                console.log("An account with this email already exists");
                alert("An account with this email already exists");
            } else if (message.search("username") !== -1) {
                console.log("Username unavailable");
                alert("Username unavailable");
            } else if (message.search("password") !== -1) {
                console.log("Password unavailable");
                alert("Password unavailable");
            }
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        const currUser: User = {
            id: uuidv4(),
            email: email,
            username: username,
            password: password,
        };

        createUser(currUser);

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
                            required
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
                            required
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
