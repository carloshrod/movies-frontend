import { useForm } from '../hooks/useForm';
import { Input } from './';
import { inputProps, textAreaProps } from '../utils';
import { validateForm } from '../utils/validateMovie';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import InputFile from './InputFile';
import { useMoviesContext } from '../context/MoviesContext';

const initialForm = {
	title: '',
	language: '',
	rating: '',
	duration: '',
	release_date: '',
	trailer: '',
	director: '',
	casting: '',
	sinopsis: '',
};

function MovieForm() {
	const [focused, setFocused] = useState(false);
	const { setShow } = useGlobalContext();
	const { movieToEdit } = useMoviesContext();
	const {
		form,
		file,
		errors,
		setErrors,
		pathImage,
		handleFileChange,
		handleInputChange,
		handleReset,
		handleSubmit,
	} = useForm(initialForm);
	const formTitle = form?.id ? 'Edit' : 'Create';

	useEffect(() => {
		const errors = validateForm(form, file, movieToEdit);
		setErrors(errors);
	}, [form, file]);

	const closeModal = () => {
		setShow(false);
		handleReset();
		document.body.classList.remove('hideScroll');
	};

	const isFormOk = Object.keys(errors).length === 0;

	return (
		<section className='main'>
			<h3 className='main__title'>{formTitle} Movie</h3>
			<form
				className='main__movieForm'
				encType='multipart/form-data'
				onSubmit={handleSubmit}
				noValidate
			>
				<div className='main__movieForm__topContainer'>
					<div className='main__movieForm__topContainer__inputFileContainer'>
						<InputFile
							focused={focused}
							setFocused={setFocused}
							errors={errors}
							pathImage={pathImage}
							file={file}
							onChange={handleFileChange}
						/>
					</div>
					<div className='main__movieForm__topContainer__inputsContainer'>
						{inputProps.map(input => (
							<Input
								key={input.id}
								{...input}
								value={form[input.name]}
								onChange={handleInputChange}
								errors={errors}
							/>
						))}
					</div>
				</div>
				<div className='main__movieForm__bottomContainer'>
					{textAreaProps.map(input => (
						<Input
							key={input.id}
							{...input}
							value={form[input.name]}
							onChange={handleInputChange}
							errors={errors}
						/>
					))}
				</div>
				<div className='main__movieForm__actionsContainer'>
					<button
						className='main__movieForm__actionsContainer--close'
						type='button'
						onClick={closeModal}
					>
						Close
					</button>
					<button
						className={`${isFormOk ? '' : 'disabled'}`}
						onClick={() => setFocused(true)}
					>
						Send
					</button>
				</div>
			</form>
		</section>
	);
}

export default MovieForm;
