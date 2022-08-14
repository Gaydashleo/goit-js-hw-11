const galleryEl = document.querySelector('.gallery');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


function renderCard(arr) {
  const markup = arr.map
  (({largeImageURL,webformatURL,
      tags,likes,views,comments,downloads,   
  }) =>
    `<a href="${largeImageURL}"> <div class='photo-card'>
      <img src="${webformatURL}" "alt=${tags}" loading="lazy" />
  </div>
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>
      ${likes}
    </p>
    <p class='info-item'>
      <b>Views</b>
      ${views}
    </p>
    <p class='info-item'>
      <b>Comments</b>
      ${comments}
    </p>
    <p class='info-item'>
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
    </div></a >`).join('');
  
  galleryEl.insertAdjacentHTML("beforeend", markup);

  let simplelightbox = new SimpleLightbox(".photo-card a", {
    captionsData: 'alt',
    captionPosition: 'bottom',
    animationSpeed: 250,
  });
  return galleryEl;
};

export default renderCard;