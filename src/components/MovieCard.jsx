import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useMoviesContext } from '../context/MoviesContext';
import { MovieServices } from '../services/MovieServices';
import { motion } from 'framer-motion';
import { variants } from '../utils';

function MovieCard({ movie }) {
	let { id, title, rating, release_date, poster } = movie || {};
	const navigate = useNavigate();
	const { setMovieToEdit } = useMoviesContext();
	const { openModal, setIsLoading } = useGlobalContext();
	const { deleteMovie } = MovieServices();

	const goToMovieDetails = () => {
		setIsLoading(true);
		navigate(`/movie/${id}`);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const handleEdit = () => {
		setMovieToEdit(movie);
		openModal();
	};

	const handleDelete = () => {
		deleteMovie(movie.id);
	};

	return (
		<motion.li
			className='movieCard'
			initial='scaleOut'
			animate='scaleIn'
			exit='scaleOut'
			variants={variants}
			transition={{ duration: 0.5 }}
			layoutId={id}
		>
			<div className='movieCard__options'>
				<img className='movieCard__image' src={poster?.url} alt={title} />
				<div className='movieCard__btnContainer'>
					<div className='movieCard__showDetails'>
						<i className='fa-solid fa-eye' onClick={goToMovieDetails} />
					</div>
					<button
						data-tip
						data-for='toolTipEdit'
						className='movieCard__btn movieCard__btn--edit'
						onClick={handleEdit}
					>
						<i className='fa-solid fa-pen' />
					</button>
					<button
						data-tip
						data-for='toolTipDelete'
						className='movieCard__btn movieCard__btn--delete'
						onClick={handleDelete}
					>
						<i className='fa-solid fa-trash-can' />
					</button>
				</div>
			</div>
			<div className='movieCard__name'>{title}</div>
			<div className='movieCard__details'>
				<span className='movieCard__details__rating'>{rating}</span>
				<span>{release_date}</span>
			</div>
		</motion.li>
	);
}

export default MovieCard;
