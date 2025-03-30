import React from "react";

function AddMovieForm({ onAdd, existingMovies }) {
    const [newMovie, setNewMovie] = React.useState({
        name: "",
        director: "",
        year: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setNewMovie(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newMovie.name || !newMovie.director || !newMovie.year) {
            alert("Please enter a valid movie name, director, and year.");
            return;
        }

        const isDuplicate = existingMovies.some(movie =>
            movie.name.trim().toLowerCase() === newMovie.name.trim().toLowerCase()
        );
        if (isDuplicate) {
            alert("A movie with this name already exists.");
            return;
        }
        
            
        const year = parseInt(newMovie.year);
        if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
            alert("Please enter a valid year.");
            return;
        }

        onAdd({ ...newMovie, year });
        setNewMovie({ name: "", director: "", year: "" });
    }

    return (
        <form onSubmit={handleSubmit} className="addMovieForm">
            <input name="name" placeholder="Name" value={newMovie.name} onChange={handleChange} />
            <input name="director" placeholder="Director" value={newMovie.director} onChange={handleChange} />
            <input name="year" placeholder="Year" value={newMovie.year} onChange={handleChange} />
            <button type="submit">Add Movie</button>
        </form>
    );
}

export default AddMovieForm;
