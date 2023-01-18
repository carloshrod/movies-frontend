import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { config } from "../config";
import { useMoviesContext } from "../context/MoviesContext";

const { API_URI } = config;
const options = {
    headers: { 'Content-Type': 'multipart/form-data' }
}

export const MovieServices = () => {
    const { movies, setMovies, setMovie, fetchMovies,
        setIsLoading, setIsSending, setShow, setNoDataMsg } = useMoviesContext();

    const createMovie = async (data) => {
        try {
            setIsSending(true);
            const res = await axios.post(API_URI, data, options);
            const { savedMovie, msg } = res.data;
            if (movies.length > 0) {
                setMovies([...movies, savedMovie]);
            } else {
                setMovies([savedMovie])
            }
            toast.success(msg);
            fetchMovies();
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setIsSending(false);
            setShow(false);
        }
    };

    const updateMovie = async (data, movieId) => {
        try {
            setIsSending(true);
            const res = await axios.put((API_URI + movieId), data, options);
            const { updatedMovie, msg } = res.data;
            const newData = movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
            setMovies(newData);
            toast.success(msg);
            fetchMovies();
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setIsSending(false);
            setShow(false);
        }
    }

    const deleteMovie = async (movieId) => {
        try {
            const resConfirm = await Swal.fire({
                icon: "warning",
                html: `Are you sure to delete this movie? <br> You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonColor: '#20cb84',
                cancelButtonColor: '#dc4035',
                confirmButtonText: 'Accept',
                width: "24em",
            });
            if (resConfirm.isConfirmed) {
                setIsSending(true);
                const res = await axios.delete((API_URI + movieId), options);
                const newData = movies.filter((movie) => movie.id !== movieId);
                setMovies(newData);
                toast.success(res.data.msg);
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setIsSending(false);
        }
    }

    const fetchMovie = async (movieId) => {
        try {
            setIsLoading(true);
            window.scroll({ top: 0, behavior: 'smooth' });
            const res = await axios.get(API_URI + movieId);
            setMovie(res.data);
            if (res.data.length === 0) {
                setNoDataMsg(
                    <span className="noData--error">Oops, there's an error.<br />
                        Please try it later!</span>
                )    
            }
        } catch (error) {
            toast.error(error.message, { toastId: "error" });
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }

    const searchMovies = async (form) => {
        try {
            const { title } = form;
            setIsLoading(true);
            if (title) {
                const res = await axios.get(API_URI + "search/" + title);
                setMovies(res.data);
                if (res.data.length === 0) {
                    setNoDataMsg(<span>No results for <em>{title}</em> !</span>)
                }
            } else fetchMovies();
        } catch (error) {
            toast.error(error.response?.data?.msg || error.message);
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }

    return {
        createMovie,
        updateMovie,
        deleteMovie,
        fetchMovie,
        searchMovies
    }
}