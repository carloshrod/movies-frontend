import { MovieForm } from '..';
import { useGlobalContext } from '../../hooks';

function Modal() {
	const { show, closeModal } = useGlobalContext();

	return (
		<div className={`modal ${show ? 'modal--show' : ''}`} onClick={closeModal}>
			<div className='modal__container'>
				<MovieForm />
			</div>
		</div>
	);
}

export default Modal;
