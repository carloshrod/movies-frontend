import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { config } from '../config';
import { useMoviesContext } from '../context/MoviesContext';
import { useGlobalContext } from '../context/GlobalContext';

const { API_URI } = config;
const options = {
	headers: { 'Content-Type': 'multipart/form-data' },
};

export const MovieServices = () => {
	const { movies, setMovies, setMovie, fetchMovies } = useMoviesContext();
	const { closeModal, setIsLoading, setIsSending, setNoDataMsg } =
		useGlobalContext();

	const createMovie = async data => {
		try {
			setIsSending(true);
			const res = await axios.post(API_URI, data, options);
			const newMovie = res.data;
			setMovies(
				[newMovie, ...movies].sort(
					(a, b) => new Date(b.release_date) - new Date(a.release_date)
				)
			);
			toast.success('Movie created successfully!');
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.log(error);
		} finally {
			setIsSending(false);
			closeModal();
		}
	};

	const updateMovie = async (data, movieId) => {
		try {
			setIsSending(true);
			const res = await axios.put(API_URI + movieId, data, options);
			if (res.status === 204) {
				return toast.warn('No movie found to update!');
			}
			const updatedMovie = res.data;
			setMovies(
				movies
					.map(movie => (movie.id === movieId ? updatedMovie : movie))
					.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
			);
			toast.success('Movie updated successfully!');
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.log(error);
		} finally {
			setIsSending(false);
			closeModal();
		}
	};

	const deleteMovie = async movieId => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `Are you sure to delete this movie? <br> You won't be able to revert this!`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				cancelButtonColor: '#dc4035',
				confirmButtonText: 'Accept',
				width: '24em',
			});
			if (resConfirm.isConfirmed) {
				setIsSending(true);
				const res = await axios.delete(API_URI + movieId, options);
				if (res.status === 204) {
					return toast.warn('No movie found to delete!');
				}
				const newData = movies.filter(movie => movie.id !== movieId);
				setMovies(newData);
				toast.success('Movie deleted successfully!');
			}
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.log(error);
		} finally {
			setIsSending(false);
		}
	};

	const fetchMovie = async movieId => {
		try {
			setIsLoading(true);
			window.scroll({ top: 0, behavior: 'smooth' });
			const res = await axios.get(API_URI + movieId);
			if (res.status === 204) {
				setMovie(null);
				return setNoDataMsg(
					<span className='noData--error'>
						It seems that movie doesn't exist.
						<br />
						Please try it later!
					</span>
				);
			}
			const movie = res.data;
			setMovie(movie);
		} catch (error) {
			setNoDataMsg(
				<span className='noData--error'>
					Oops, there's an error.
					<br />
					Please try it later!
				</span>
			);
			console.error(error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	const searchMovies = async form => {
		try {
			const { query } = form;
			setIsLoading(true);
			if (query) {
				const res = await axios.get(API_URI + 'search/' + query);
				const foundMovies = res.data;
				if (res.status === 204) {
					setNoDataMsg(
						<span>
							No results for <em>{query}</em> !
						</span>
					);
					return setMovies([]);
				}
				setMovies(foundMovies);
				setNoDataMsg(null);
			} else fetchMovies();
		} catch (error) {
			setNoDataMsg(
				<span className='noData--error'>
					Oops, there's an error.
					<br />
					Please try it later!
				</span>
			);
			console.error(error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	return {
		createMovie,
		updateMovie,
		deleteMovie,
		fetchMovie,
		searchMovies,
	};
};
