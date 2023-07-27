import { Link } from 'react-router-dom';

function BackButton({ onClick }) {
	return (
		<Link to={-1} onClick={onClick}>
			<i className='fa-solid fa-chevron-left backButton' />
		</Link>
	);
}

export default BackButton;
