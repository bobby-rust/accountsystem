import { Link } from "react-router-dom";

export default function SignUp(props: any) {
    return (
        <>
            <div>Sign Up</div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </>
    );
}
