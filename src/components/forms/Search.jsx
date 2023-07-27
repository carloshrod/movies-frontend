import { useMoviesContext } from '../../hooks';
import { MovieServices } from '../../services/MovieServices';
import { motion } from 'framer-motion';
import { variants } from '../../utils';
import { useState } from 'react';

function Search() {
	const [query, setQuery] = useState('');
	const { movies } = useMoviesContext();
	const range = movies?.length;
	const { searchMovies } = MovieServices();

	const handleSubmit = e => {
		e.preventDefault();
		searchMovies(query);
	};

	const handleChange = e => setQuery(e.target.value);

	return (
		<motion.div
			className='search'
			initial='slideOutTop'
			animate='slideInTop'
			variants={variants}
		>
			<form onSubmit={handleSubmit}>
				<input
					className='form-control'
					name='query'
					placeholder='Search...'
					type='text'
					value={query}
					onChange={handleChange}
				/>
				<button>&#128270;</button>
			</form>
			<label className='search__label'>
				{range} {range === 1 ? 'result' : 'results'}
			</label>
		</motion.div>
	);
}

export default Search;
