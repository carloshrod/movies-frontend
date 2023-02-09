import React from 'react'
import { useMoviesContext } from '../context/MoviesContext';
import { MovieForm } from './';

function Modal() {
    const { show } = useMoviesContext();

    return (
        <div className={`modal ${show ? "modal--show" : ""}`}>
            <div className={`modal__container ${show ? "modal__container--show" : ""}`}>
                <MovieForm />
            </div>
        </div>
    )
}

export default Modal;