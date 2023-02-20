import React from "react";
import "../styles/resetpassword.css";
import { User } from "../types/User";
const API_URL = "http://localhost:4000/api/users";

export default function ResetPassword(props: any) {
    const [newPassword, setNewPassword] = React.useState("");
    const [verifyNewPassword, setVerifyNewPassword] = React.useState("");

    console.log(props.user);
    const handleSubmit = async (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        // Do stuff

        if (!(newPassword === verifyNewPassword)) {
            alert("Usernames must match");
            return;
        }

        const newUser: User = {
            ...props.user[0],
            password: newPassword,
        };

        const newUserInfo = await updateUserPassword(newUser);

        console.log(newUserInfo);
        console.log("Password successfully changed.");
    };

    const updateUserPassword = async (currUser: User) => {
        console.log(currUser);
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currUser),
        });

        return response.json();
    };

    const handleNewPasswordChange = (event: React.BaseSyntheticEvent) => {
        setNewPassword(event.target.value);
    };
    const handleVerifyNewPasswordChange = (event: React.BaseSyntheticEvent) => {
        setVerifyNewPassword(event.target.value);
    };

    return (
        <>
            <div className='reset-password-container'>
                <div>Password reset for: {props.user[0].username}</div>
                <form onSubmit={handleSubmit} className='reset-password-form'>
                    <label>
                        Enter new password:
                        <input
                            type='password'
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                    </label>
                    <label>
                        Verify new password:
                        <input
                            type='password'
                            value={verifyNewPassword}
                            onChange={handleVerifyNewPasswordChange}
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
}
