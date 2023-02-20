import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { User } from "../types/User";

export default function Profile(props: any) {
    const [user, setUser] = React.useState<User | null>(null);
    const { state } = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (state) setUser(state[0]);
    }, []);

    console.log(user);

    const handleLogout = (event: React.BaseSyntheticEvent) => {
        setUser(null);
        navigate("/");
    };
    return (
        <>
            {user && <h1>Hello, {user.username}</h1>}
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/signup'>Sign Up</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div>Profile</div>
        </>
    );
}
