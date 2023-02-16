import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function Login(props: any) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        setUsername("");
        setPassword("");
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
        <div className='login'>
            <div>Login</div>
            <form onSubmit={handleSubmit} className='login-form'>
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
                <Link to='/signup'>Sign Up</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </div>
    );
}
