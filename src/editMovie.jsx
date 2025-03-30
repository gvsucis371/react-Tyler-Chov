import React from "react";

function EditMovieForm({ movie, onSave, onCancel, existingMovies }) {
    const [edited, setEdited] = React.useState({ ...movie });

    function handleChange(e) {
        const { name, value } = e.target;
        setEdited(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const trimmedName = edited.name.trim();
        const trimmedDirector = edited.director.trim();
        const year = parseInt(edited.year);

        if (!trimmedName || !trimmedDirector || isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
            alert("Please enter a valid movie name, director, and year.");
            return;
        }

        const isDuplicate = existingMovies.some(
            (m) =>
                m.id !== movie.id &&
                m.name.trim().toLowerCase() === trimmedName.toLowerCase()
        );

        if (isDuplicate) {
            alert("A movie with this name already exists.");
            return;
        }

        onSave({ name: trimmedName, director: trimmedDirector, year });
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "inline-block", marginLeft: "20px" }}>
            <input name="name" value={edited.name} onChange={handleChange} />
            <input name="director" value={edited.director} onChange={handleChange} />
            <input name="year" value={edited.year} onChange={handleChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default EditMovieForm;
