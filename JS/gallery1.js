import gallery from "./gallery-items.js";

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
const refs = {
  galleryList: document.querySelector(".js-gallery"),
  activeImgOutput: document.querySelector(".js-active-tag"),
};

// + Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
let activIndex = 0;

function getImgParam(item) {
  return `<li class="gallery__item">
  <img class="gallery__image" src=${item.preview} alt='${
    item.description
  }' data-index='${gallery.indexOf(item)}'> 
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
  getNextIndex(nextActiveImg);
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
  window.addEventListener("keydown", getNextImg);
  modalDiv.classList.add("is-open");

  // 4.Подмена значения атрибута src элемента img.lightbox__image.
  gallery.find((item, index) => {
    if (item.preview === img.src) {
      openImg.src = item.original;
      activIndex = index;
      console.log(activIndex);
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
  window.removeEventListener("keydown", getNextImg);
  modalDiv.classList.remove("is-open");
  // 6.Очистка значения атрибута src элемента img.lightbox__image.
  openImg.src = "";
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

// Листание картинок "влево"/"вправо" :
// 1) Вешаем "data-index" на li картинок activ-index;
// 2) Создать переменную activIndex, куда записовать activ-index;
// 3) При нажатии "вправо" - activIndex + 1, при нажатии "влево" - activIndex - 1
// 4) Из массива подставляєм картинку с соответствующим индексом
// 5) Учесть "0 < activIndex < arr.lenght
function getNextImg(event) {
  if (event.code === "ArrowRight" || event.code === "ArrowDown") {
    console.log((activIndex += 1));
    getNextIndex();
  }
  if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
    console.log((activIndex -= 1));
    getNextIndex();
  }
  if (activIndex > gallery.length - 1) {
    activIndex = 0;
  } else if (activIndex < 1) {
    activIndex = gallery.length;
  }
}

function getNextIndex() {
  gallery.find((item, index) => {
    if (activIndex === index) {
      openImg.src = item.original;
    }
  });
}
