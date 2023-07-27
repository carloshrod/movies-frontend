import { useEffect } from 'react';
import { useGlobalContext, useMoviesContext } from '../../hooks';

function InputFile({ focused, setFocused, errors, pathImage, file, onChange }) {
	const { show } = useGlobalContext();
	const { movieToEdit } = useMoviesContext();

	useEffect(() => {
		setFocused(false);
	}, [show]);

	const isInvalid = focused && !file && !movieToEdit ? 'invalid' : '';

	return (
		<>
			<img
				src={pathImage}
				alt='poster'
				className={isInvalid ? 'invalid' : ''}
			/>
			<label>
				<input name='file' type='file' onChange={onChange} />
				<i className='fa-solid fa-upload' />
			</label>
			<span className={`errorMsg errorMsg${isInvalid ? '--show' : ''}`}>
				{errors.file}
			</span>
		</>
	);
}

export default InputFile;
