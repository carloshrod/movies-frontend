import { useLocation } from 'react-router-dom';

function Container({ children }) {
    const { pathname } = useLocation();

    return (
        <main className="container">
            {children}
        </main>
    )
}

export default Container;