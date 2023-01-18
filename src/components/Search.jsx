import { useMoviesContext } from '../context/MoviesContext';
import { useForm } from '../hooks/useForm';
import { MovieServices } from '../services/MovieServices';

const initialForm = { title: "" };

function Search() {
    const { movies } = useMoviesContext();
    const range = movies?.length;
    const { form, handleInputChange } = useForm(initialForm);
    const { searchMovies } = MovieServices();

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies(form);
    }

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    name="title"
                    placeholder="Search..." type="text" value={form.title}
                    onChange={handleInputChange}
                />
                <button>&#128270;</button>
            </form>
            <label className="search__label">
                {range} {range === 1 ? "result" : "results"}
            </label>
        </div>
    )
}

export default Search;