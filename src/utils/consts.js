export const languages = [
	'English',
	'Spanish',
	'French',
	'German',
	'Italian',
	'Korean',
	'Chinese',
	'Japanese',
];
export const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'];

export const inputClasses = {
	title: 'largeInput',
	language: 'smallInput',
	rating: 'xSmallInput',
	release_date: 'smallInput',
	duration: 'xSmallInput',
	trailer: 'largeInput',
	director: 'largeInput',
	sinopsis: 'textArea',
	casting: 'textArea',
};

export const inputProps = [
	{
		id: 'idTitle',
		name: 'title',
		label: 'Movie title',
		type: 'text',
		required: true,
	},
	{
		id: 'idLanguage',
		name: 'language',
		label: 'Language',
		type: 'select',
		required: true,
	},
	{
		id: 'idRating',
		name: 'rating',
		label: 'Rating',
		type: 'select',
		required: true,
	},
	{
		id: 'idRelease_date',
		name: 'release_date',
		label: 'Release date',
		type: 'date',
		required: true,
	},
	{
		id: 'idDuration',
		name: 'duration',
		label: 'Duration(min)',
		type: 'text',
		required: true,
	},
	{
		id: 'idTrailer',
		name: 'trailer',
		label: 'Trailer URL',
		type: 'text',
		required: true,
	},
	{
		id: 'idDirector',
		name: 'director',
		label: 'Director',
		type: 'text',
		required: true,
	},
];

export const textAreaProps = [
	{
		id: 'idSinopsis',
		name: 'sinopsis',
		label: 'Sinopsis',
		type: 'textArea',
		required: true,
	},
	{
		id: 'idCasting',
		name: 'casting',
		label: 'Cast',
		type: 'textArea',
		required: true,
	},
];

export const variants = {
	scaleOut: {
		opacity: 0,
		scale: 0,
	},
	scaleIn: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 1,
			type: 'spring',
		},
	},
	slideOutTop: {
		y: '-100vh',
	},
	slideInTop: {
		y: '0',
		transition: {
			duration: 1,
			type: 'tween',
		},
	},
};
