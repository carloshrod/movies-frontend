import { useMoviesContext } from '../../hooks';
import { motion } from 'framer-motion';
import { variants } from '../../utils';

function MovieDetails() {
	const { movie } = useMoviesContext();
	const {
		poster,
		title,
		release_date,
		duration,
		language,
		rating,
		director,
		casting,
		trailer,
		sinopsis,
	} = movie || {};

	return (
		<section className='movieDetails'>
			<motion.img
				className='movieDetails__image'
				src={poster?.url}
				alt={title}
				initial='scaleOut'
				animate='scaleIn'
				variants={variants}
			/>
			<motion.div
				className='movieDetails__info'
				initial='scaleOut'
				animate='scaleIn'
				variants={variants}
			>
				<h2>{title}</h2>
				<div className='movieDetails__info__firstRow'>
					<span>{release_date}</span>
					<span>{duration} min</span>
					<span>{language}</span>
					<span>{rating}</span>
				</div>
				<div className='movieDetails__info__director'>
					<span>Director</span>
					{director}
				</div>
				<div className='movieDetails__info__cast'>
					<span>Cast</span>
					{casting}
				</div>
				<div className='movieDetails__info__trailer'>
					<span>Trailer</span>
					<a href={trailer} target='_blank' rel='noopener noreferrer'>
						<i className='fa-solid fa-clapperboard' />
					</a>
				</div>
				<div className='movieDetails__info__sinopsis'>
					<span>Sinopsis</span>
					{sinopsis}
				</div>
			</motion.div>
		</section>
	);
}

export default MovieDetails;
