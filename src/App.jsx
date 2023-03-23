import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import MovieCard from './components/MovieCard';
import ReactHookForm from './components/ReactHookForm';
import TraditionalForm from './components/TraditionalForm';
import { createMovie, getMovies, updateMovie, deleteMovie } from './services';

const App = () => {
  // Estado que almacena la lista de peliculas
  const [movies, setMovies] = useState([]);
  // Estado que indica si las peliculas estan en proceso de carga
  const [isLoading, setIsLoading] = useState(false);
  // Estado que indica si se esta editanto una pelicula y cuando se esta editando almacena el id de la pelicula que esta siendo editada
  const [idMovieToUpdate, setIdMovieToUpdate] = useState(null);

  // Uso de la libreria react-hook-form
  // register: sirve para registrar inputs
  // handleSubmit: retorna la funciona manejadora para el evento submit del formulario de interes, recibe un callback
  // reset: permite modificar el valor de los inputs mediante un objeto que tienen pares llave-valor siendo la llave el nombre de unos de los inputs y su valor lo que se quiere asignar a ese input
  const { register, handleSubmit, reset } = useForm();

  // Hook para guardar referencias al DOM
  const formRef = useRef(null);

  // Obtiene las peliculas y las guarda en la variable de estado
  const loadMovies = async () => {
    try {
      // Indica que ha iniciado la carga de las peliculas
      setIsLoading(true);
      // Guarda el resultado de la petición de tipo GET que realiza la función asincrona "getMovies"
      const moviesFromBackend = await getMovies();

      // Almacena las peliculas obtenidas en la variable de estado "movies"
      setMovies(moviesFromBackend);
      // Indica que ha finalizado la carga de las peliculas
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Función que crea ó actualiza una pelicula
  const handleUpdateCreate = async (dataForm) => {
    setIsLoading(true);

    // Condicional para decidir si la data que se envia en el formulario es para edición o para creación
    // La función "updateMovie" ejecuta una petición de tipo PUT
    // La función "createMovie" ejecuta una petición de tipo POST
    if (idMovieToUpdate) await updateMovie(idMovieToUpdate, dataForm);
    else await createMovie(dataForm);

    // Cargamos las peliculas nuevamente para obtener su versión más actualizada
    await loadMovies();

    // Reset del idMovieToUpdate que es quien nos permite saber si se esta editando o creando
    setIdMovieToUpdate(null);

    setIsLoading(false);
  };

  // Borra la pelicula con el id que se le pase y actualiza la vista
  const handleDeleteMovie = async (movieId) => {
    // Ejecuta una petición de tipo DELETE para borrar la pelicula con el id pasado
    await deleteMovie(movieId);
    // Carga las peliculas nuevamente para obtener su versión mas actualizada
    await loadMovies();
  };

  // Función que toma la información de una pelicula y la carga en el formulario tradicional
  const loadMovieToTraditionalForm = (movieData) => {
    // Obtiene la referencia del formulario y la almacena
    const $form = formRef.current;

    // Cambia el valor del input con nombre "name"
    $form.name.value = movieData.name;
    // Cambia el valor del input con nombre "genre"
    $form.genre.value = movieData.genre;
    // Cambia el valor del input con nombre "duration"
    $form.duration.value = movieData.duration;
    // Cambia el valor del input con nombre "release_date"
    $form.release_date.value = movieData.release_date;

    // Almacena el valor del id en la variable de estado que indica si esta editando una pelicula
    setIdMovieToUpdate(movieData.id);
  };

  // Función que toma la información de una pelicula y la carga en el formulario manejado por la libreria react-hook-form
  const loadMovieToReactHookForm = (movieData) => {
    // División de la informacion recibida en: id y data, conteniendo la ultima toda la información restante diferente al id (name, genre, duration y release_date)
    const { id, ...data } = movieData;

    // reset({
    //   name: movieData.name,
    //   genre: movieData.genre,
    //   duration: movieData.duration,
    //   release_date: movieData.release_date,
    // });
    // Cambia el valor de los inputs del formulario por el valor de la pelicula recibida
    reset(data);

    // Almacena el valor del id en la variable de estado que indica si esta editando una pelicula
    // Cambi
    setIdMovieToUpdate(id);
  };

  // Ejecuta lógica cuando el componente se monta
  useEffect(() => {
    // Carga las peliculas por primera vez
    loadMovies();
  }, []);

  return (
    <div className="bg-neutral-800 min-h-screen flex flex-col justify-center items-center p-10 text-white">
      {/* <TraditionalForm
        handleUpdateCreate={handleUpdateCreate}
        idMovieToUpdate={idMovieToUpdate}
        formRef={formRef}
      /> */}
      <ReactHookForm
        handleUpdateCreate={handleUpdateCreate}
        idMovieToUpdate={idMovieToUpdate}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />

      <section>
        <h2 className="text-2xl text-cyan-400 font-bold text-center mb-5">Movie List</h2>
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {isLoading ? (
            <p>Loading movies...</p>
          ) : (
            movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                deleteMovie={handleDeleteMovie}
                // loadMovieToForm={loadMovieToTraditionalForm}
                loadMovieToForm={loadMovieToReactHookForm}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default App;