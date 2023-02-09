import { MoviesGrid, Loader, NoData, Search } from '../components';
import { useMoviesContext } from '../context/MoviesContext';
import { PuffLoader, RingLoader } from 'react-spinners';

function Movies() {
    const { movies, isLoading, isSending, show } = useMoviesContext();

    return (
        <>
            <Search />
            {isLoading
                ?
                <Loader>
                    <PuffLoader color="#20cb84" size="120px" />
                </Loader>
                :
                <>
                    {!movies || movies.length < 1
                        ?
                        <NoData />
                        :
                        <MoviesGrid />
                    }
                </>
            }
            {isSending
                &&
                <Loader loaderClass={`${show ? "loader--modal" : ""}`}>
                    <RingLoader color="#20cb84" size="80px" />
                </Loader>
            }
        </>
    )
}

export default Movies;