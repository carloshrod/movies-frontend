import React from 'react'

function Loader({ loaderClass, children }) {
    return (
        <div className={`loader ${loaderClass}`}>
            <div className="loader__container">
                {children}
            </div>
        </div>
    )
}

export default Loader;