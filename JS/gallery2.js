import gallery from "./gallery-items.js";

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
const refs = {
  galleryList: document.querySelector(".js-gallery"),
  activeImgOutput: document.querySelector(".js-active-tag"),
};

function getImgParam({ preview, description, original }) {
  return `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img class="gallery__image" src=${preview} data-source=${original} alt='${description}' />
  </a>
  </li>`;
}

function getImg(arr) {
  const list = `${arr.map((item) => getImgParam(item)).join("")}`;
  return list;
}

refs.galleryList.insertAdjacentHTML("beforeend", getImg(gallery));
console.log(refs.galleryList);

// 2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.galleryList.addEventListener("click", onImgClick);

function onImgClick(event) {
  if (event.target.nodeName !== "IMG") {
    console.log("Кликнули не по картинке.");
    return;
  }

  const nextActiveImg = event.target;

  setActiveImg(nextActiveImg);
  openModal(nextActiveImg);
}

function setActiveImg(nextActiveImg) {
  const currentActiveImg = refs.galleryList.querySelector(".js-img--active");

  if (currentActiveImg) {
    currentActiveImg.classList.remove("js-img--active");
  }

  nextActiveImg.classList.add("js-img--active");
}

// 3.Открытие модального окна по клику на элементе галереи.
const modalDiv = document.querySelector(".js-lightbox");
console.log(modalDiv);
const butonClose = modalDiv.querySelector('[data-action="close-lightbox"]');
const openImg = modalDiv.querySelector(".lightbox__image");
const overlayDiv = modalDiv.querySelector(".lightbox__overlay");

function openModal(img) {
  window.addEventListener("keydown", onPressEscape);
  modalDiv.classList.add("is-open");

  // 4.Подмена значения атрибута src элемента img.lightbox__image.
  gallery.find(({ preview, original }) => {
    if (preview === img.src) {
      openImg.src = original;
    }
  });
}

// 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// +Закрытие модального окна по клику на div.lightbox__overlay
// +Закрытие модального окна по нажатию клавиши ESC
butonClose.addEventListener("click", closeModal);
overlayDiv.addEventListener("click", closeModal);

function closeModal() {
  window.removeEventListener("keydown", onPressEscape);
  modalDiv.classList.remove("is-open");
  // 6.Очистка значения атрибута src элемента img.lightbox__image.
  openImg.src = "";
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}
