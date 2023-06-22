import React from 'react';
import { MovieForm } from './';
import { useGlobalContext } from '../context/GlobalContext';

function Modal() {
	const { show } = useGlobalContext();

	return (
		<div className={`modal ${show ? 'modal--show' : ''}`}>
			<div
				className={`modal__container ${show ? 'modal__container--show' : ''}`}
			>
				<MovieForm />
			</div>
		</div>
	);
}

export default Modal;
