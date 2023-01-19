import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../config";

const { API_URI } = config;

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([]);
    const [movieToEdit, setMovieToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [show, setShow] = useState(false);
    const [noDataMsg, setNoDataMsg] = useState(null);
    const [isFormOk, setIsFormOk] = useState(false);

    const fetchMovies = async () => {
        try {
            const res = await axios.get(API_URI);
            const { movies } = res.data;
            setMovies(movies);
            if (movies.length === 0) {
                setNoDataMsg(<span>Start to add movies!</span>);
            }
        } catch (error) {
            setNoDataMsg(
                <span className="noData--error">Oops, there's an error.<br />
                    Please try it later!</span>
            )
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        fetchMovies();
    }, []);

    const data = {
        fetchMovies,
        movies, setMovies,
        movie, setMovie,
        movieToEdit, setMovieToEdit,
        isLoading, setIsLoading,
        isSending, setIsSending,
        show, setShow,
        noDataMsg, setNoDataMsg,
        isFormOk, setIsFormOk
    };

    return (
        <MoviesContext.Provider value={data}>
            {children}
        </MoviesContext.Provider>
    )
}

export const useMoviesContext = () => useContext(MoviesContext);
export { MoviesProvider };
