// import axios from 'axios';

// const API_KEY = '32379526-a8c253dffb9e51dd26df65ed0';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
// axios.defaults.params = {
//   orientation: 'horizontal',
//   per_page: 12,
// };

// export const getImages = async (query, page = 1) => {
//   const { data } = await axios.get(
//     `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo`
//   );
//   return data;
// };
import axios from 'axios';
import PropTypes from 'prop-types';

export async function getImages(searchWord, page) {
  axios.defaults.baseURL = 'https://pixabay.com/api';
  const API_KEY = '32379526-a8c253dffb9e51dd26df65ed0';
  const SEARCH_PARAMS = `?q=${searchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return await axios.get(`/${SEARCH_PARAMS}`);
}

getImages.propTypes = {
  searchWord: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
