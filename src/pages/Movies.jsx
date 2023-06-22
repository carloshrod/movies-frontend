import { MoviesGrid, Loader, NoData, Search } from '../components';
import { useGlobalContext } from '../context/GlobalContext';
import { useMoviesContext } from '../context/MoviesContext';
import { PuffLoader, RingLoader } from 'react-spinners';

function Movies() {
	const { movies } = useMoviesContext();
	const { isLoading, isSending, show } = useGlobalContext();

	return (
		<>
			<Search />
			{isLoading ? (
				<Loader>
					<PuffLoader color='#20cb84' size='120px' />
				</Loader>
			) : (
				<>{!movies || movies.length < 1 ? <NoData /> : <MoviesGrid />}</>
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
