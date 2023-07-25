import { useEffect } from 'react';
import { MoviesGrid, Loader, NoData, Search } from '../components';
import { useGlobalContext } from '../context/GlobalContext';
import { useMoviesContext } from '../context/MoviesContext';
import { PuffLoader, RingLoader } from 'react-spinners';

function Movies() {
	const { movies } = useMoviesContext();
	const { show, isLoading, isSending, setNoDataMsg } = useGlobalContext();

	useEffect(() => {
		if (movies.length === 0) {
			setNoDataMsg(<span>Start to add movies!</span>);
		}
	}, [movies]);

	return (
		<>
			<Search />
			{isLoading ? (
				<Loader>
					<PuffLoader color='#20cb84' size='120px' />
				</Loader>
			) : (
				<>{!movies || movies.length === 0 ? <NoData /> : <MoviesGrid />}</>
			)}
			{isSending && (
				<Loader loaderClass={`${show ? 'loader--modal' : ''}`}>
					<RingLoader color='#20cb84' size='80px' />
				</Loader>
			)}
		</>
	);
}

export default Movies;
