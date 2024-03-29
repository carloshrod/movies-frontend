import { useState } from 'react';
import GlobalContext from './GlobalContext';

const GlobalProvider = ({ children }) => {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [noData, setNoData] = useState({ msg: '', state: '' });

	const openModal = () => {
		setShow(true);
		document.body.classList.add('hideScroll');
	};

	const closeModal = () => {
		setShow(false);
		document.body.classList.remove('hideScroll');
	};

	const data = {
		show,
		openModal,
		closeModal,
		isLoading,
		setIsLoading,
		isSending,
		setIsSending,
		noData,
		setNoData,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
