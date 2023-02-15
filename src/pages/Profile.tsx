import { Link } from "react-router-dom";

export default function Profile(props: any) {
    return (
        <>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/signup'>Sign Up</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>Log out</div>
            <div>Profile</div>
        </>
    );
}
