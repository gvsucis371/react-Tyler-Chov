function Movie(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p><strong>Director:</strong> {props.director}</p>
            <p><strong>Year:</strong> {props.year}</p>
        </div>
    );
}

function MovieList(props) {
    const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
        fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error("Error loading movies:", error));
    }, []);

    function addMovie(newMovie) {
        setMovies(prev => [...prev, newMovie]);
    }

    return (
        <section>
            <h1>{props.title}</h1>
            <AddMovieForm onAdd={addMovie} />
            <div className="movies">
                {movies.map((movie, index) => (
                    <Movie key={index} name={movie.name} director={movie.director} year={movie.year} />
                ))}
            </div>
        </section>
    );
}

ReactDOM.createRoot(document.getElementById("main")).render(
    <MovieList title="Famous Movies" />
);
