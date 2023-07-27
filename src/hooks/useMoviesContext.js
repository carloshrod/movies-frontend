import { useContext } from 'react';
import { MoviesContext } from '../context';

const useMoviesContext = () => useContext(MoviesContext);

export default useMoviesContext;
