import React from 'react';

const ReactHookForm = ({
  idMovieToUpdate,
  handleSubmit,
  register,
  reset,
  handleUpdateCreate,
}) => {
  const emptyValueForm = {
    name: '',
    genre: '',
    duration: '',
    release_date: '',
  };

  const myHandleSubmit = async (data) => {
    await handleUpdateCreate(data);
    reset(emptyValueForm);
  };

  return (
    <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit(myHandleSubmit)}>
      <h2>{idMovieToUpdate ? 'Edit' : 'Create'} Formulario - CRUD VERSION2023</h2>
      <div>
        <label htmlFor="nameId">Nombre: </label>
        <input type="text" id="nameId" className="text-black" {...register('name')} />
      </div>
      <div>
        <label htmlFor="genreId">Apellido: </label>
        <input type="text" id="genreId" className="text-black" {...register('genre')} />
      </div>
      <div>
        <label htmlFor="genreId">Email: </label>
        <input type="text" id="genreId" className="text-black" {...register('genre')} />
      </div>
      <div>
        <label htmlFor="releaseDateId">Fecha Nacimiento: </label>
        <input
          type="date"
          id="releaseDateId"
          className="text-black"
          {...register('release_date')}
        />
      </div>

      <button type="submit" className="border border-transparent hover:border-cyan-400">
        {idMovieToUpdate ? 'Edit' : 'Create'} Movie
      </button>
    </form>
  );
};

export default ReactHookForm;
