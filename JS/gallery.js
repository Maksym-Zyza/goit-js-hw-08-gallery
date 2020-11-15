import gallery from "./gallery-items.js";

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
const refs = {
  galleryList: document.querySelector(".js-gallery"),
  activeImgOutput: document.querySelector(".js-active-tag"),
};

function getImgParam({ preview, description }) {
  return `<li class="gallery__item">
  <img class="gallery__image" src=${preview} alt=${description} 
    </li>`;
}

function getImg(arr) {
  const list = `${arr.map((item) => getImgParam(item)).join(" ")}`;
  return list;
}

refs.galleryList.insertAdjacentHTML("beforeend", getImg(gallery));
console.log(refs.galleryList);

// =====================================
// 2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.galleryList.addEventListener("click", onImgClick);

function onImgClick(event) {
  if (event.target.nodeName !== "IMG") {
    console.log("Кликнули не по картинке, ничего не делаем");
    return;
  }

  const nextActiveImg = event.target;

  setActiveImg(nextActiveImg);
  getImgUrl(nextActiveImg);
}

function setActiveImg(nextActiveImg) {
  const currentActiveImg = refs.galleryList.querySelector(".js-img--active");

  if (currentActiveImg) {
    // console.log('Уже есть активный, снимаю класс!');
    currentActiveImg.classList.remove("js-img--active");
  }

  nextActiveImg.classList.add("js-img--active");
}

const getImgUrl = (img) =>
  gallery.find(({ preview, original }) => {
    if (preview === img.src) {
      console.log("original - ", original);
    }
  });

// 3.Открытие модального окна по клику на элементе галереи.
