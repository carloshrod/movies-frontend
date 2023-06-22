import { toast } from 'react-toastify';

const toastValidate = msg => toast.error(msg, { toastId: 'validate' });

const regexTitle = /^[\s\S]{0,50}$/;
const regexDuration = /^([1-9][0-9]{0,2})$/;
const regexUrl =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const regexDirector = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü,\s-]{0,100}$/;

export const validateForm = (form, file, movieToEdit) => {
	const errors = {};

	if (!form.title) {
		errors.title = 'Field required!';
	} else if (!regexTitle.test(form.title)) {
		errors.title = 'This field should not be more than 50 characters!';
	}

	if (!form.language) errors.language = 'Field required!';

	if (!form.rating) errors.rating = 'Field required!';

	if (!form.duration) {
		errors.duration = 'Field required!';
	} else if (!regexDuration.test(form.duration)) {
		errors.duration =
			'This field must be a number from 1 to 999. No leading zeros!';
	}

	if (!form.release_date) errors.release_date = 'Field required!';

	if (!form.trailer) {
		errors.trailer = 'Field required!';
	} else if (!regexUrl.test(form.trailer)) {
		errors.trailer =
			'Please enter a valid URL! Ex: https://www.example.com/example';
	}

	if (!form.director) {
		errors.director = 'Field required!';
	} else if (!regexDirector.test(form.director)) {
		errors.director =
			'This field should not be more than 100 alphabetic characters, including dashes optionally!';
	}

	if (!form.casting) errors.casting = 'Field required!';

	if (!form.sinopsis) errors.sinopsis = 'Field required!';

	if (!file && !movieToEdit) errors.file = 'Poster required!';

	return errors;
};

export const validateCreateMovie = (form, movies) => {
	const existingTitle = movies?.filter(movie => movie.title === form.title);
	const existingTrailer = movies?.filter(
		movie => movie.trailer === form.trailer
	);

	if (existingTitle?.length > 0) {
		toastValidate("There's already a movie with this title!");
		return false;
	}

	if (existingTrailer?.length > 0) {
		toastValidate("There's already a movie with this trailer!");
		return false;
	}

	return true;
};

export const validateEditMovie = (form, movieToEdit, movies) => {
	if (
		movieToEdit.title !== form.title ||
		movieToEdit.trailer !== form.trailer
	) {
		const existingTitle = movies?.filter(movie => movie.title === form.title);
		const existingTrailer = movies?.filter(
			movie => movie.trailer === form.trailer
		);

		if (existingTitle?.length > 0) {
			if (existingTitle[0].title !== movieToEdit.title) {
				toastValidate("There's already a movie with this title!");
				return false;
			}
		}

		if (existingTrailer?.length > 0) {
			if (existingTrailer[0].trailer !== movieToEdit.trailer) {
				toastValidate("There's already a movie with this trailer!");
				return false;
			}
		}
	}

	return true;
};
