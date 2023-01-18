export const formDataCreateMovie = (formData, form, file) => {
    formData.append("title", form.title)
    formData.append("language", form.language)
    formData.append("rating", form.rating)
    formData.append("duration", form.duration)
    formData.append("release_date", form.release_date)
    formData.append("trailer", form.trailer)
    formData.append("director", form.director)
    formData.append("sinopsis", form.sinopsis)
    formData.append("casting", form.casting)
    formData.append("poster", file)
}

export const formDataUpdateMovie = (formData, form, movieToEdit, file) => {
    formData.append("title", form.title)
    formData.append("language", form.language)
    formData.append("rating", form.rating)
    formData.append("duration", form.duration)
    formData.append("release_date", form.release_date)
    formData.append("trailer", form.trailer)
    formData.append("director", form.director)
    formData.append("sinopsis", form.sinopsis)
    formData.append("casting", form.casting)
    formData.append("imgUrl", movieToEdit.poster_url)
    formData.append("imgId", movieToEdit.poster_id)
    formData.append("poster", file)
}