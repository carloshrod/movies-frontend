import { Link } from "react-router-dom";
import { useMoviesContext } from "../context/MoviesContext";

function Navbar() {
    const { setShow } = useMoviesContext();

    const showModal = () => {
        setShow(true);
        document.body.classList.add("hideScroll");
    };

    const toTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <header className="navbar">
            <Link to="/">
                <span className="navbar__logo" onClick={toTop}>
                    MOVIES <i className="fa-solid fa-film" />
                </span>
            </Link>
            <span className="navbar__link" onClick={showModal}>
                Add movie
            </span>
        </header>
    )
}

export default Navbar;