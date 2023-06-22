export const formDataMovie = (form, file) => {
	const formData = new FormData();
	Object.entries(form).forEach(([key, value]) => {
		formData.append(key, value);
	});
	formData.append('poster', file);
	return formData;
};
