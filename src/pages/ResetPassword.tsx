import React from "react";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = React.useState("");
    const [verifyNewPassword, setVerifyNewPassword] = React.useState("");

    const handleSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        // Do stuff

        console.log("Password successfully changed.");
    };

    const handleNewPasswordChange = (event: React.BaseSyntheticEvent) => {
        setNewPassword(event.target.value);
    };
    const handleVerifyNewPasswordChange = (event: React.BaseSyntheticEvent) => {
        setVerifyNewPassword(event.target.value);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
        </>
    );
}
