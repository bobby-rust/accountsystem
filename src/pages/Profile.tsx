import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

// type ProfileProps = {
//     user: User;
//     handleLogout: React.MouseEventHandler<HTMLButtonElement>;
// };

export default function Profile() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = React.useState<any | null>(null);

    React.useEffect(() => {
        setUser(state);
        if (!state.user) {
            navigate("/login");
        }
    }, [state, navigate]);

    const handleLogout = (event: React.BaseSyntheticEvent) => {
        setUser(null);
        navigate("/login");
    };

    console.log(user);
    return (
        <>
            <div>Profile</div>
            {user && <h1>Hello, {user.user.username}</h1>}
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </>
    );
}
