import { Link } from "react-router-dom";

export default function Login(props: any) {
    return (
        <div>
            <div>Login</div>
            <div>
                <Link to='/signup'>Sign Up</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </div>
    );
}
