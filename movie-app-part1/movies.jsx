const movies = [
    {
        name: "Inception",
        director: "Christopher Nolan",
        year: 2010
    },
    {
        name: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        year: 1999
    },
    {
        name: "Interstellar",
        director: "Christopher Nolan",
        year: 2014
    }
];

function Movie(props) {
    return (
        <div>
            <h2>{props.name} </h2>
            <p><strong>Director:</strong> {props.director}</p>
            <p><strong>Year:</strong> {props.year}</p>
        </div>
    );
}

function MovieList(props) {
    return (
        <section>
            <h1>{props.title}</h1>
            <div className="movies">
                {props.movies.map((movie, index) => (
                    <Movie key={index} name={movie.name} director={movie.director} year={movie.year} />
                ))}
            </div>
        </section>
    );
}

ReactDOM.createRoot(document.getElementById("main")).render(
    <MovieList movies={movies} title="Famous Movies" />
);
