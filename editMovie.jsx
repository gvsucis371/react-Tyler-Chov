function EditMovieForm({ movie, onSave, onCancel }) {
    const [edited, setEdited] = React.useState({ ...movie });

    function handleChange(e) {
        const { name, value } = e.target;
        setEdited(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(edited);
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
