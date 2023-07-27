import { useEffect, useState } from 'react';
import { inputClasses, languages, ratings } from '../../utils';
import { useGlobalContext } from '../../hooks';

function Input({
	id,
	value,
	name,
	label,
	type,
	onChange,
	errors,
	...inputProps
}) {
	const [focused, setFocused] = useState(false);
	const options = name === 'language' ? languages : ratings;
	const { show } = useGlobalContext();

	useEffect(() => {
		setFocused(false);
	}, [show]);

	const handleFocus = () => {
		setFocused(true);
	};

	const isInvalid = focused && errors[name] ? 'invalid' : '';
	const errorMsg = focused ? errors[name] : null;

	return (
		<div className={inputClasses[name]}>
			{type !== 'select' ? (
				<>
					{type !== 'textArea' ? (
						<input
							{...inputProps}
							id={id}
							name={name}
							value={value}
							type={type}
							onChange={onChange}
							onBlur={handleFocus}
							focused={focused.toString()}
							className={isInvalid}
							required
						/>
					) : (
						<textarea
							{...inputProps}
							id={id}
							name={name}
							value={value}
							rows='5'
							onChange={onChange}
							onBlur={handleFocus}
							focused={focused.toString()}
							className={isInvalid}
							required
						/>
					)}
					<label htmlFor={id}>{label}</label>
				</>
			) : (
				<>
					<select
						{...inputProps}
						id={id}
						name={name}
						value={value}
						onChange={onChange}
						onBlur={handleFocus}
						focused={focused.toString()}
						className={isInvalid}
						required
					>
						<option value='' disabled>
							Select
						</option>
						{options.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
					<label htmlFor={id}>{label}</label>
				</>
			)}
			<span className={`errorMsg errorMsg${isInvalid ? '--show' : ''}`}>
				{errorMsg}
			</span>
		</div>
	);
}

export default Input;
