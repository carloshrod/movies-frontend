import { useEffect, useState } from "react";
import { useMoviesContext } from "../context/MoviesContext";
import { inputClasses, languages, ratings } from "../utils";

function Input({ id, value, name, label, type, errormessage, onChange, validateform, ...inputProps }) {
    const [focused, setFocused] = useState(false);
    const options = name === "language" ? languages : ratings;
    const { show } = useMoviesContext();

    const handleFocus = () => {
        setFocused(true);
        validateform();
    };

    const handleKeyUp = () => {
        validateform();
    }

    useEffect(() => {
        setFocused(false);
    }, [show])

    const errorMsg = !value ? "Field required!" : errormessage;

    return (
        <div className={inputClasses[name]}>
            {type !== "select"
                ?
                <>
                    {type !== "textArea"
                        ?
                        <input
                            {...inputProps}
                            id={id}
                            name={name}
                            value={value}
                            type={type}
                            onChange={onChange}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            onKeyUp={handleKeyUp}
                            required
                        />
                        :
                        <textarea
                            {...inputProps}
                            id={id}
                            name={name}
                            value={value}
                            rows="5"
                            onChange={onChange}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            onKeyUp={handleKeyUp}
                            required
                        />
                    }
                    <label htmlFor={id}>{label}</label>
                </>
                :
                <>
                    <select
                        {...inputProps}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={handleFocus}
                        onKeyUp={handleKeyUp}
                        focused={focused.toString()}
                        required
                    >
                        <option value="" disabled>Select</option>
                        {options.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </select>
                    <label htmlFor={id}>{label}</label>
                </>
            }
            <span className="errorMsg">{errorMsg}</span>
        </div>
    )
}

export default Input;