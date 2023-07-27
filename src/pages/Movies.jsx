import { useEffect } from 'react';
import { MoviesGrid, Loader, NoData, Search } from '../components';
import { useGlobalContext, useMoviesContext } from '../hooks';
import { PuffLoader, RingLoader } from 'react-spinners';

function Movies() {
	const { movies } = useMoviesContext();
	const { show, isLoading, isSending, noData, setNoData } = useGlobalContext();

	useEffect(() => {
		if (movies.length === 0 && noData?.state !== 'no result') {
			setNoData({ msg: 'Start to add movies!' });
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
