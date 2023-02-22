import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import { User } from "../types/User";
import { UserContext } from "./Login";
import { useContext } from "react";

export default function Profile() {
    const currUser = useContext(UserContext);
    console.log(currUser);

    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        if (currUser) {
            setUser(currUser);
        }
    }, [currUser]);

    console.log(user);

    const navigate = useNavigate();

    const handleLogout = (event: React.BaseSyntheticEvent) => {
        setUser(null);
        navigate("/");
    };

    return (
        <>
            <div>Profile</div>
            {user && <h1>Hello, {user.username}</h1>}
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </>
    );
}
