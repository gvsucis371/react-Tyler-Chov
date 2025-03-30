import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import AddMovieForm from "./addMovie.jsx";
import EditMovieForm from "./editMovie.jsx";


function Movie({ movie, isEditing, onEdit, onDelete, onSaveEdit, onCancelEdit }) {
  return (
    <div className="movie">
      <h2>{movie.name}</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <button onClick={onEdit}>{isEditing ? "Editing..." : "Edit"}</button>
      <button onClick={onDelete}>Delete</button>

      {isEditing && (
        <EditMovieForm
          movie={movie}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      )}
    </div>
  );
}

function MovieList({ title }) {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const snapshot = await getDocs(collection(db, "movies"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(data);
    }
    fetchMovies();
  }, []);

  async function addMovie(newMovie) {
    const docRef = await addDoc(collection(db, "movies"), newMovie);
    setMovies([...movies, { id: docRef.id, ...newMovie }]);
  }

  async function deleteMovie(id) {
    await deleteDoc(doc(db, "movies", id));
    setMovies(movies.filter(movie => movie.id !== id));
  }

  async function saveEdit(updatedMovie) {
    await updateDoc(doc(db, "movies", editingId), updatedMovie);
    setMovies(movies.map(movie =>
      movie.id === editingId ? { id: editingId, ...updatedMovie } : movie
    ));
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <section>
      <h1>{title}</h1>

      <h2>Add a New Movie</h2>
      <AddMovieForm onAdd={addMovie} />

      <h2>Movie List</h2>
      {movies.map(movie => (
        <Movie
          key={movie.id}
          movie={movie}
          isEditing={editingId === movie.id}
          onEdit={() => setEditingId(movie.id)}
          onDelete={() => deleteMovie(movie.id)}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
        />
      ))}
    </section>
  );
}

export default MovieList;

const root = document.getElementById("main");
if (root) {
  ReactDOM.createRoot(root).render(
    <MovieList title="Famous Movies" />
  );
}
