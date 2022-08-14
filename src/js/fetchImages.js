const axios = require('axios').default;

// const fetchImages = async(value, page) => {
//   const url = "https://pixabay.com/api/";
//   const key = "29203601-a0eb79026b7a5f5129e46889e";
//   const options = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
//   const response = await axios.get(`${url}${options}`);
//   return response;
// };

const fetchImages = async (value, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=29203601-a0eb79026b7a5f5129e46889e&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return response;
};

export default fetchImages;
