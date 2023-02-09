import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DEFAULT_IMAGE from '../assets/default-img.png';
import { useMoviesContext } from "../context/MoviesContext";
import { MovieServices } from "../services/MovieServices";
import { formDataCreateMovie, formDataUpdateMovie } from "../utils";
import { validateCreateMovie, validateEditMovie, validateForm } from "../utils/validateMovie";

export const useForm = (initialForm) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState("");
    const [pathImage, setPathImage] = useState(DEFAULT_IMAGE);
    const { createMovie, updateMovie } = MovieServices();
    const { movies, movieToEdit, setMovieToEdit, setIsFormOk } = useMoviesContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (movieToEdit?.id) {
            setPathImage(movieToEdit.poster_url || DEFAULT_IMAGE);
            setForm(movieToEdit);
        } else {
            setPathImage(DEFAULT_IMAGE);
            setForm(initialForm);
        }
    }, [movieToEdit, initialForm]);

    useEffect(() => {
        const isOk = validateForm(form);
        setIsFormOk(isOk);
    }, [form])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            if (image.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(image);
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(image)
            }
        }
    }

    const handleReset = () => {
        setTimeout(() => {
            setForm(initialForm);
            setFile("");
            setPathImage(DEFAULT_IMAGE);
            setMovieToEdit(null);
        }, 500);
        document.body.classList.remove("hideScroll");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!movieToEdit) {
            if (validateCreateMovie(form, file, movies)) {
                formDataCreateMovie(formData, form, file);
                await createMovie(formData);
                handleReset();
                navigate("/");
            }
        } else {
            if (validateEditMovie(form, movieToEdit, movies)) {
                formDataUpdateMovie(formData, form, movieToEdit, file);
                await updateMovie(formData, movieToEdit.id);
                handleReset();
            }
        }
    };

    return {
        form,
        pathImage,
        handleFileChange,
        handleInputChange,
        handleReset,
        handleSubmit
    }
}