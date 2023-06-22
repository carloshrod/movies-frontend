import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { variants } from '../utils';
import { useGlobalContext } from '../context/GlobalContext';

function Navbar() {
	const { setShow } = useGlobalContext();

	const showModal = () => {
		setShow(true);
		document.body.classList.add('hideScroll');
	};

	const toTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.header
			className='navbar'
			initial='slideOutTop'
			animate='slideInTop'
			variants={variants}
		>
			<Link to='/' className='navbar__logo' onClick={toTop}>
				<img src='/movies-logo.png' alt='logo' />
				<div>
					<span>CHRod</span>
					<span>MOVIES</span>
				</div>
			</Link>
			<span className='navbar__link' onClick={showModal}>
				Add movie
			</span>
		</motion.header>
	);
}

export default Navbar;
