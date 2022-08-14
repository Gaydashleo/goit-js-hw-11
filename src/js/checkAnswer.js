import Notiflix from 'notiflix';
import renderCard from './renderCardImg';

const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let photoPerPage = 40;

function checkAnswer(responce) {
  const currentHits = responce.data.hits;
  const totalHits = responce.data.totalHits;
  checkImgQuantity(responce);

  if (currentHits.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    renderCard(currentHits);
  } else {
    galleryEl.innerHTML = '';
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
};

function checkImgQuantity(responce) {
  const dataTotalHits = responce.data.totalHits;

  if (dataTotalHits > photoPerPage) {
    loadMoreBtnEl.classList.remove('is-hidden');
  } else (
    loadMoreBtnEl.classList.add('is-hidden')
  );
};

export default checkAnswer;