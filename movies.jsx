function Movie(props) {
    return (
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h2>{props.movie.name}</h2>
            <p><strong>Director:</strong> {props.movie.director}</p>
            <p><strong>Year:</strong> {props.movie.year}</p>
            <button onClick={props.onEdit}>{props.isEditing ? "Editing..." : "Edit"}</button>
            <button onClick={props.onDelete}>Delete</button>
            {props.isEditing ? (
                <EditMovieForm
                    movie={props.movie}
                    onSave={props.onSaveEdit}
                    onCancel={props.onCancelEdit}
                />
            ) : null}
        </div>
    );
}

function MovieList(props) {
    const [movies, setMovies] = React.useState([]);
    const [editingIndex, setEditingIndex] = React.useState(null);

    React.useEffect(function () {
        fetch("movies.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setMovies(data);
            })
            .catch(function (error) {
                console.log("Error loading movies:", error);
            });
    }, []);

    function addMovie(newMovie) {
        setMovies(movies.concat(newMovie));
    }

    function deleteMovie(index) {
        var newMovies = movies.slice();
        newMovies.splice(index, 1);
        setMovies(newMovies);
    }

    function editMovie(index) {
        setEditingIndex(index);
    }

    function saveEdit(updatedMovie) {
        var newMovies = movies.slice();
        newMovies[editingIndex] = updatedMovie;
        setMovies(newMovies);
        setEditingIndex(null);
    }

    function cancelEdit() {
        setEditingIndex(null);
    }

    return (
        <section>
            <h1>{props.title}</h1>
            <AddMovieForm onAdd={addMovie} />
            <div className="movies">
                {movies.map(function (movie, index) {
                    return (
                        <Movie
                            key={index}
                            movie={movie}
                            isEditing={editingIndex === index}
                            onEdit={function () { editMovie(index); }}
                            onDelete={function () { deleteMovie(index); }}
                            onSaveEdit={saveEdit}
                            onCancelEdit={cancelEdit}
                        />
                    );
                })}
            </div>
        </section>
    );
}

ReactDOM.createRoot(document.getElementById("main")).render(
    React.createElement(MovieList, { title: "Famous Movies" })
);
