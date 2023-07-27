import { MovieCard } from '../';
import { useMoviesContext } from '../../hooks';
import { AnimatePresence } from 'framer-motion';

function MoviesGrid() {
	const { movies } = useMoviesContext();

	return (
		<ul className='moviesGrid'>
			<AnimatePresence>
				{movies?.map((movie, index) => (
					<MovieCard key={movie.id} movie={movie} index={index} />
				))}
			</AnimatePresence>
		</ul>
	);
}

export default MoviesGrid;
