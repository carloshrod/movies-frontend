import { useMoviesContext } from '../context/MoviesContext';

function MovieDetails() {
    const { movie } = useMoviesContext();
    const { poster_url, title, release_date, duration,
        language, rating, director, casting, trailer, sinopsis } = movie || {};

    return (
        <section className="movieDetails">
            <img
                className="movieDetails__image"
                src={poster_url}
                alt={title}
            />
            <div className="movieDetails__info">
                <h2>{title}</h2>
                <div className="movieDetails__info__firstRow">
                    <span>{release_date}</span>
                    <span>{duration} min</span>
                    <span>{language}</span>
                    <span>{rating}</span>
                </div>
                <div className="movieDetails__info__director">
                    <span>Director</span>{director}
                </div>
                <div className="movieDetails__info__cast">
                    <span>Cast</span>{casting}
                </div>
                <div className="movieDetails__info__trailer">
                    <span>Trailer</span>
                    <a href={trailer} target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-clapperboard" />
                    </a>
                </div>
                <div className="movieDetails__info__sinopsis">
                    <span>Sinopsis</span>{sinopsis}
                </div>
            </div>
        </section>
    )
}

export default MovieDetails;