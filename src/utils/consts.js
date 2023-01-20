export const languages = ["English", "Spanish", "French", "German", "Italian", "Korean", "Chinese", "Japanese"];
export const ratings = ["G", "PG", "PG-13", "R", "NC-17", "NR"];

export const inputClasses = {
    title: "largeInput",
    language: "smallInput",
    rating: "xSmallInput",
    release_date: "smallInput",
    duration: "xSmallInput",
    trailer: "largeInput",
    director: "largeInput",
    sinopsis: "textArea",
    casting: "textArea"
};

export const inputProps = [
    {
        id: "idTitle",
        name: "title",
        label: "Movie title",
        type: "text",
        errormessage: "This field should not be more than 50 characters!",
        pattern: "^[\\s\\S]{0,50}$",
        required: true,
    },
    {
        id: "idLanguage",
        name: "language",
        label: "Language",
        type: "select",
        errormessage: "Field required!",
        required: true,
    },
    {
        id: "idRating",
        name: "rating",
        label: "Rating",
        type: "select",
        errormessage: "Field required!",
        required: true
    },
    {
        id: "idRelease_date",
        name: "release_date",
        label: "Release date",
        type: "date",
        errormessage: "Field required!",
        required: true
    },
    {
        id: "idDuration",
        name: "duration",
        label: "Duration(min)",
        type: "text",
        errormessage: "This field must be a number from 1 to 999!",
        pattern: "^([1-9][0-9]{0,2})$",
        required: true,
    },
    {
        id: "idTrailer",
        name: "trailer",
        label: "Trailer URL",
        type: "text",
        errormessage: "Please enter a valid URL! Ex: https://www.example.com/example",
        pattern: "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\s+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\s+.~#?&=]*)",
        required: true,
    },
    {
        id: "idDirector",
        name: "director",
        label: "Director",
        type: "text",
        errormessage: "This field should not be more than 100 characters!",
        pattern: "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü,\\s-]{0,100}$",
        required: true,
    }
];

export const textAreaProps = [
    {
        id: "idSinopsis",
        name: "sinopsis",
        label: "Sinopsis",
        type: "textArea",
        errormessage: "Field required!",
        required: true,
    },
    {
        id: "idCasting",
        name: "casting",
        label: "Casting",
        type: "textArea",
        errormessage: "Field required!",
        required: true,
    }
];
