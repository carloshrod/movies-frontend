import { toast } from "react-toastify";

const toastValidate = (msg) => toast.error(msg, { toastId: "validate" });

const regexTitle = /^[\s\S]{0,50}$/;
const regexDuration = /^([1-9][0-9]{0,2})$/;
const regexUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const regexDirector = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü,\s-]{0,100}$/;

export const validateForm = (form) => {
    if ((!form.title || !regexTitle.test(form.title)) || !form.language ||
        !form.rating || (!form.duration || !regexDuration.test(form.duration)) ||
        !form.release_date || (!form.trailer || !regexUrl.test(form.trailer)) ||
        (!form.director || !regexDirector.test(form.director)) ||
        !form.sinopsis || !form.casting) {
        return false;
    }

    return true;
}

export const validateCreateMovie = (form, file, movies) => {
    if (!file) {
        toastValidate("Hey, don't forget to include the movie poster!")
        return false;
    }

    const existingTitle = movies?.filter((movie) => movie.title === form.title)
    const existingTrailer = movies?.filter((movie) => movie.trailer === form.trailer)

    if (existingTitle?.length > 0) {
        toastValidate("There's already a movie with this title!")
        return false
    }

    if (existingTrailer?.length > 0) {
        toastValidate("There's already a movie with this trailer!")
        return false
    }

    return true;
}

export const validateEditMovie = (form, movieToEdit, movies) => {
    if ((movieToEdit.title !== form.title) || (movieToEdit.trailer !== form.trailer)) {
        const existingTitle = movies?.filter((movie) => movie.title === form.title)
        const existingTrailer = movies?.filter((movie) => movie.trailer === form.trailer)

        if (existingTitle?.length > 0) {
            if (existingTitle[0].title !== movieToEdit.title) {
                toastValidate("There's already a movie with this title!")
                return false
            }
        }

        if (existingTrailer?.length > 0) {
            if (existingTrailer[0].trailer !== movieToEdit.trailer) {
                toastValidate("There's already a movie with this trailer!")
                return false
            }
        }
    }

    return true;
}
