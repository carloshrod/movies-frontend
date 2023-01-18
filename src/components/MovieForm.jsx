import { useMoviesContext } from '../context/MoviesContext';
import { useForm } from '../hooks/useForm';
import { Input, Loader } from './';
import { RingLoader } from 'react-spinners';
import { inputProps, textAreaProps } from '../utils';
import { validateForm } from '../utils/validateForm';
import { useEffect } from 'react';

const initialForm = {
    title: "",
    language: "",
    rating: "",
    duration: "",
    release_date: "",
    trailer: "",
    director: "",
    casting: "",
    sinopsis: ""
}

function MovieForm() {
    const { movieToEdit, isSending, setShow, isFormOk, setIsFormOk } = useMoviesContext();
    const { form, pathImage, handleFileChange, handleInputChange,
        handleReset, handleSubmit } = useForm(initialForm);
    const formTitle = form?.id ? "Edit" : "Create";

    useEffect(() => {
        if (movieToEdit) {
            return setIsFormOk(true);
        }
        return setIsFormOk(false);
    }, [movieToEdit]);

    const closeModal = () => {
        setShow(false);
        handleReset();
        document.body.classList.remove("hideScroll");
    };

    const handleValidateForm = () => {
        setIsFormOk(validateForm(form));
    }

    return (
        <section className="main">
            <h3 className='main__title'>{formTitle} Movie</h3>
            <form className="main__movieForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="main__movieForm__topContainer">
                    <div className="main__movieForm__topContainer__inputFileContainer">
                        <img src={pathImage} alt="poster" />
                        <label>
                            <input
                                className="main__input main__input--file"
                                name="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <i className="fa-solid fa-upload" />
                        </label>
                    </div>
                    <div className="main__movieForm__topContainer__inputsContainer">
                        {inputProps.map((input) => (
                            <Input
                                key={input.id}
                                {...input}
                                value={form[input.name]}
                                onChange={handleInputChange}
                                validateform={handleValidateForm}
                            />
                        ))}
                    </div>
                </div>
                <div className="main__movieForm__bottomContainer">
                    {textAreaProps.map((input) => (
                        <Input
                            key={input.id}
                            {...input}
                            value={form[input.name]}
                            onChange={handleInputChange}
                            validateform={handleValidateForm}
                        />
                    ))}
                </div>
                <div className="main__movieForm__actionsContainer">
                    <button className="main__movieForm__actionsContainer--close" type="button" onClick={closeModal}>
                        Close
                    </button>
                    <button disabled={!isFormOk}>
                        Send
                    </button>
                </div>
            </form>
            {isSending
                &&
                <Loader loaderClass="loader--form">
                    <RingLoader color="#20cb84" size="80px" />
                </Loader>}
        </section>
    )
}

export default MovieForm;