import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../../config';
import { useGlobalContext } from '../../hooks';
import MoviesContext from './MoviesContext';
import InfoMsg from '../../components/ui/InfoMsg';

const { API_URI } = config;

const MoviesProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState({});
	const [movieToEdit, setMovieToEdit] = useState(null);
	const { setIsLoading, setNoData } = useGlobalContext();

	const fetchMovies = async () => {
		try {
			const controller = new AbortController();
			setTimeout(() => controller.abort(), 5000);
			const res = await axios.get(API_URI, { signal: controller.signal });
			if (res.status === 204) {
				return setNoData({ msg: 'Start to add movies!' });
			}
			setMovies(res.data);
			setNoData({ msg: '', state: '' });
		} catch (error) {
			setNoData({
				msg: `Oops, there's an error.`,
				state: 'error',
			});
			if (error.code === 'ERR_CANCELED') {
				setNoData({ msg: <InfoMsg />, state: error.code });
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
