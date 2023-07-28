import { useState, useEffect } from 'react';

function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const [isScrollBottom, setIsScrollBottom] = useState(false);

	const buttonVisibility = () => {
		if (window.scrollY > 100) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', buttonVisibility);
		return () => {
			window.removeEventListener('scroll', buttonVisibility);
		};
	}, []);

	useEffect(() => {
		window.onscroll = () =>
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
				? setIsScrollBottom(true)
				: setIsScrollBottom(false);

		return () => (window.onscroll = null);
	}, []);

	return (
		<div
			onClick={scrollToTop}
			className={`backToTop ${isVisible ? 'active' : ''} ${
				isScrollBottom ? 'bottom' : ''
			}`}
		>
			<i className='fa-solid fa-chevron-up fa-bounce' />
		</div>
	);
}

export default BackToTop;
