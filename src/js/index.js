import fetchImages from './fetchImages';
import renderCard from './renderCardImg';
import checkAnswer from './checkAnswer';
import Notiflix from 'notiflix';
import axios from "axios";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {debounce} from 'lodash';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.search-form__input');
const loadMoreBtnEl = document.querySelector('.load-more');


const DEBOUNCE_DELAY = 300;
let value = null;
let currentPage = 1;

inputEl.addEventListener("input", debounce(inputData, DEBOUNCE_DELAY));
formEl.addEventListener("submit", submitBtn);

function inputData(e) {
  value = e.target.value.toLowerCase().trim();
  return value;
};

function submitBtn(event) {
  event.preventDefault();
  
  if (!value) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreBtnEl.classList.add("is-hidden");
    galleryEl.innerHTML = "";
    return;
  } else {
    galleryEl.innerHTML = "";
    fetchImages(value, currentPage)
      .then(checkAnswer)
      .catch(error => console.log(error));
  }
};

async function addPage() {
  currentPage += 1;
  fetchImages(value, currentPage)
    .then(loadMore)
    .catch(error => console.log(error));
}

loadMoreBtnEl.addEventListener('click', addPage);

function loadMore(responce) {
  const alwaysPhoto = responce.data.totalHits;
  let alwaysPages = alwaysPhoto / 40;
  if (currentPage > alwaysPages) {
    loadMoreBtnEl.classList.add('is-hodden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }

  const totalImg = responce.data.hits;
  renderCard(totalImg);
  endScroll(galleryEl);

};

function endScroll(gallery) {
    const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}