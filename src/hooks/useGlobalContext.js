import { useContext } from 'react';
import { GlobalContext } from '../context';

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
