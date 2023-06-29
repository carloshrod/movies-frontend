import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { config } from '../config';
import { useGlobalContext } from './GlobalContext';

const { API_URI } = config;

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState({});
	const [movieToEdit, setMovieToEdit] = useState(null);
	const { setIsLoading, setNoDataMsg } = useGlobalContext();

	const fetchMovies = async () => {
		try {
			const res = await axios.get(API_URI);
			if (res.status === 204) {
				return setNoDataMsg(<span>Start to add movies!</span>);
			}
			setMovies(res.data);
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

export const useMoviesContext = () => useContext(MoviesContext);
export { MoviesProvider };
