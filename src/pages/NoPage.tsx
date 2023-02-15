import { Link } from "react-router-dom";

export default function NoPage() {
    return (
        <>
            <div>404 page does not exist...</div>
            <Link to='/'>Come back to the light</Link>
        </>
    );
}
