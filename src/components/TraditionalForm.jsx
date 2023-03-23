import React from 'react';

const TraditionalForm = ({ idMovieToUpdate, formRef, handleUpdateCreate }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const dataForm = {
      name: form.name.value,
      genre: form.genre.value,
      duration: form.duration.value,
      release_date: form.release_date.value,
    };

    await handleUpdateCreate(dataForm);
    form.reset();
  };

  return (
    <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit} ref={formRef}>
      <h2>{idMovieToUpdate ? 'Edit' : 'Create'} Movie</h2>
      <div>
        <label htmlFor="nameId">Nombre: </label>
        <input type="text" name="name" id="nameId" className="text-black" />
      </div>
      <div>
        <label htmlFor="genreId">Apellido: </label>
        <input type="text" name="genre" id="genreId" className="text-black" />
      </div>
      <div>
        <label htmlFor="genreId">Email: </label>
        <input type="text" name="genre" id="genreId" className="text-black" />
      </div>
      <div>
        <label htmlFor="releaseDateId">Fecha Nacimiento: </label>
        <input
          type="date"
          name="release_date"
          id="releaseDateId"
          className="text-black"
        />
      </div>

      <button type="submit" className="border border-transparent hover:border-cyan-400">
        {idMovieToUpdate ? 'Edit' : 'Create'} Movie
      </button>
    </form>
  );
};

export default TraditionalForm;