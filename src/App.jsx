import './Styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Container, Modal } from './components';
import { Movies, Movie } from './pages';
import { MoviesProvider } from './context/MoviesContext';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MoviesProvider>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </Container>
        <Modal />
        <ToastContainer position="bottom-right" theme="dark" newestOnTop transition={Flip} />
      </Router>
    </MoviesProvider>
  )
}

export default App;
