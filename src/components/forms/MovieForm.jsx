import { useEffect, useState } from 'react';
import { Input, InputFile } from '..';
import { useForm } from '../../hooks';
import { useGlobalContext, useMoviesContext } from '../../hooks';
import { inputProps, textAreaProps, validateForm } from '../../utils';

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
	const { show, closeModal } = useGlobalContext();
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

		if (!show) {
			handleReset();
		}
	}, [form, file, show]);

	const isFormOk = Object.keys(errors).length === 0;

	return (
		<section className='main' onClick={e => e.stopPropagation()}>
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
