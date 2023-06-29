import React, { useEffect } from 'react';
import { MovieDetails, Loader, NoData } from '../components';
import { useMoviesContext } from '../context/MoviesContext';
import { PuffLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { MovieServices } from '../services/MovieServices';
import BackButton from '../components/BackButton';
import { useGlobalContext } from '../context/GlobalContext';

function Movie() {
	const { movie, fetchMovies } = useMoviesContext();
	const { isLoading } = useGlobalContext();
	const { fetchMovie } = MovieServices();
	const { id } = useParams();

	useEffect(() => {
		fetchMovie(id);
	}, []);

	const handleBackButtonClick = () => {
		if (movie) return null;
		fetchMovies();
	};

	if (isLoading)
		return (
			<Loader>
				<PuffLoader color='#20cb84' size='120px' />
			</Loader>
		);

	return (
		<>
			<BackButton onClick={handleBackButtonClick} />
			{!movie ? <NoData noDataClass='noData--movie' /> : <MovieDetails />}
		</>
	);
}

export default Movie;
