import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div>Homepage</div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    );
}
