import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [noDataMsg, setNoDataMsg] = useState(null);

	const data = {
		show,
		setShow,
		isLoading,
		setIsLoading,
		isSending,
		setIsSending,
		noDataMsg,
		setNoDataMsg,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
export { GlobalProvider };
