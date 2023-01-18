import { Link } from 'react-router-dom';

function BackButton() {
    return (
        <Link to={-1}>
            <i className="fa-solid fa-chevron-left backButton" />
        </Link>
    )
}

export default BackButton;