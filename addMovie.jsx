function AddMovieForm({ onAdd }) {
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
        if (!newMovie.name || !newMovie.director || !newMovie.year) return;
        onAdd(newMovie);
        setNewMovie({ name: "", director: "", year: "" });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={newMovie.name} onChange={handleChange} />
            <input name="director" placeholder="Director" value={newMovie.director} onChange={handleChange} />
            <input name="year" placeholder="Year" value={newMovie.year} onChange={handleChange} />
            <button type="submit">Add Movie</button>
        </form>
    );
}
