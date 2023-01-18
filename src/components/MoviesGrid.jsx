import { MovieCard } from './';
import { useMoviesContext } from '../context/MoviesContext';

function MoviesGrid() {
    const { movies } = useMoviesContext();

    return (
        <ul className="moviesGrid">
            {movies?.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </ul>
    )
}

export default MoviesGrid;