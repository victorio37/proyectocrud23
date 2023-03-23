import axios from 'axios';

const BASE_URL = 'https://movies-crud-2.academlo.tech/';

export const getMovies = async () => {
  try {
    const res = await axios.get(BASE_URL + 'movies/');

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createMovie = async (dataMovie) => {
  try {
    await axios.post(BASE_URL + 'movies/', dataMovie);

    console.log('Se creo existosamente');
  } catch (error) {
    console.error(error);
  }
};

export const deleteMovie = async (movieId) => {
  try {
    await axios.delete(BASE_URL + `movies/${movieId}/`);

    console.log(`La pelicula con el id <${movieId}> fue eliminada`);
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (movieId, newDataMovie) => {
  try {
    await axios.put(BASE_URL + `movies/${movieId}/`, newDataMovie);

    console.log(`La pelicula ${newDataMovie.name} fue actualizada exitosamente`);
  } catch (error) {
    console.error(error);
  }
};
