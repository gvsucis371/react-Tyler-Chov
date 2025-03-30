import React from "react";

function EditMovieForm({ movie, onSave, onCancel }) {
    const [edited, setEdited] = React.useState({ ...movie });

    function handleChange(e) {
        const { name, value } = e.target;
        setEdited(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const year = parseInt(edited.year);
        if (!edited.name || !edited.director || isNaN(year) || year < 1888 || year > new Date().getFullYear()) {
            alert("Please enter a valid movie name, director, and year.");
            return;
        }

        onSave({ ...edited, year });
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
