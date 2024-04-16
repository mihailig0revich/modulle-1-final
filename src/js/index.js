import '../scss/style.scss';
import Swiper from 'swiper';
import Pagination from 'swiper/modules/pagination.min.mjs';
import {img, services, price} from './data';

function templateBrandFill(content, tempId, tempElement, wrapper, tagContent, count = 0) {
  const template = document.querySelector('#'+tempId).content;
  const cardNode = template.querySelector('.'+tempElement);
  const swiper = document.querySelector('.'+wrapper);

  const countCards = count === 0 ? content.length : count;

  for(let i = 0; i < countCards; i++) {
    const cardNodeClone = cardNode.cloneNode(true);
    const cardNodeCloneImg = cardNodeClone.querySelector('.'+tagContent);
    const contentKeys = Object.keys(content[i]);

    for (let k = 0; k < contentKeys.length; k++) {
      cardNodeCloneImg[contentKeys[k]] = content[i][contentKeys[k]];
    }
    swiper.appendChild(cardNodeClone);
  }
}

templateBrandFill(
  img,
  'swiper',
  'swiper-slide',
  'brands-section__swiper-wrapper',
  'brand-card__img',
  8
);
templateBrandFill(
  services,
  'swiper-services',
  'swiper-slide',
  'services-section__swiper-wrapper',
  'brand-card__text',
  8
);
templateBrandFill(
  price,
  'swiper-price',
  'swiper-slide',
  'price-section__swiper-wrapper',
  'brand-card__text',
  5
);

templateBrandFill(
  img,
  'swiper',
  'swiper__swiper-slide',
  'brands-list',
  'brand-card__img'
);
templateBrandFill(
  services,
  'swiper-services',
  'swiper-slide',
  'services-section__list',
  'brand-card__text'
);


function moreBtnHandler(btnClass, element, activeClass, openName = 'Показать все', closeName = 'Скрыть') {
  document.querySelector('.'+btnClass)
    .addEventListener('click', function() {
      const moreBtn = document.querySelector('.'+btnClass);
      const imgBtn = moreBtn.querySelector('.more-btn__icon');
      const textBtn = moreBtn.querySelector('.more-btn__name');

      if (textBtn.textContent === openName) {
        element.classList.add(activeClass);
        imgBtn.classList.add('more-btn__icon-rotate');
        textBtn.textContent = closeName;
        return false;
      }
      if (textBtn.textContent === closeName) {
        element.classList.remove(activeClass)
        imgBtn.classList.remove('more-btn__icon-rotate');
        textBtn.textContent = openName;
        return false;
      }
    });
}
moreBtnHandler(
  'brands-list-more-btn',
  document.querySelector('.brands-section__list'),
  'brands-list__open'
)
moreBtnHandler(
  'services-section__more-btn',
  document.querySelector('.services-section__list'),
  'brands-list__open'
)
moreBtnHandler(
  'card__text-more-btn',
  document.querySelector('.card__text'),
  'card__text_open',
  'Читать далее'
)

function createSwiper(swiperClass, swiperSettins) {
  let swiper;
  return function () {
    if (window.innerWidth <= 768 && !swiper) {
      swiper = new Swiper('.'+swiperClass, swiperSettins);
    }
  }
}
let swiperOne = createSwiper('main-swiper',{
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    600: {
      slidesPerView: 2.2,
    }
  }
})
let swiperTwo = createSwiper('services-section__swiper',{
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    600: {
      slidesPerView: 2.2,
    }
  }
})
let swiperTree = createSwiper('price-section__swiper',{
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    600: {
      slidesPerView: 2.2,
    }
  }
})

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('resize', () => {
    swiperOne();
    swiperTwo();
    swiperTree();
  });
  swiperOne();
  swiperTwo();
  swiperTree();
});

function createModal(btnOpen, btnClose, modalWind, classOpen, backgroundModal, classbackgroundModalOpen) {

  function openHanler () {
    const modal = document.querySelector("."+modalWind);
    const background = document.querySelector("."+backgroundModal);

    modal.classList.add(classOpen);
    background.classList.add(classbackgroundModalOpen);
  }
  function close() {
    const modal = document.querySelector("."+modalWind);
    const background = document.querySelector("."+backgroundModal);
    modal.classList.remove(classOpen);
    background.classList.remove(classbackgroundModalOpen);
  }

  document.querySelectorAll("."+btnOpen).forEach((element)=>element.addEventListener("click", openHanler));

  document.querySelector("."+btnClose).addEventListener("click", close);
  document.querySelector("."+backgroundModal).addEventListener("click", close);
}

createModal(
  'modal-side-bar-open',
  'modal-side-bar-close',
  'side-bar',
  'side-bar__modal-open',
  'side-bar-modal-background',
  'modal-background__modal_open'
)

createModal(
  'order-call-open-btn',
  'order-call__close-btn',
  'order-call',
  'order-call__open',
  'order-call-modal-background',
  'modal-background__modal_open'
)

createModal(
  'leave-request-open-btn',
  'leave-request__close-btn',
  'leave-request',
  'leave-request__open',
  'leave-request-modal-background',
  'modal-background__modal_open'
)

