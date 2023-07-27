import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../../config';
import { useGlobalContext } from '../../hooks';
import MoviesContext from './MoviesContext';

const { API_URI } = config;

const MoviesProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState({});
	const [movieToEdit, setMovieToEdit] = useState(null);
	const { setIsLoading, setNoDataMsg } = useGlobalContext();

	const fetchMovies = async () => {
		try {
			const controller = new AbortController();
			setTimeout(() => controller.abort(), 5000);
			const res = await axios.get(API_URI, { signal: controller.signal });
			if (res.status === 204) {
				return setNoDataMsg(<span>Start to add movies!</span>);
			}
			setMovies(res.data);
			setNoDataMsg(null);
		} catch (error) {
			setNoDataMsg(
				<span className='noData--error'>
					Oops, there's an error.
					<br />
					Please try it later!
				</span>
			);
			if (error.code === 'ERR_CANCELED') {
				setNoDataMsg(
					<span className='noData--info'>
						<i className='fa-solid fa-circle-exclamation' />
						Backend of this app is running on a render.com free instance, so it
						might be inactive. This will cause a delay in the response of the
						first request after a period of inactivity while the instance is up
						again.
						<i className='fa-solid fa-circle-exclamation' />
						<br />
						<div>Please try again in 30 seconds!</div>
					</span>
				);
			}
			console.error(error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchMovies();
	}, []);

	const data = {
		fetchMovies,
		movies,
		setMovies,
		movie,
		setMovie,
		movieToEdit,
		setMovieToEdit,
	};

	return (
		<MoviesContext.Provider value={data}>{children}</MoviesContext.Provider>
	);
};

export default MoviesProvider;
