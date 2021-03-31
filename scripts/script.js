document.addEventListener('DOMContentLoaded', () => {
      'use strict';

      const getData = (url, callback) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.send();

            request.addEventListener('readystatechange', () => {
                  if (request.readyState !== 4) return;
                  if (request.status === 200) {
                        const response = JSON.parse(request.response);
                        callback(response);
                  } else {
                        console.error(new Error('Ошибка: ' + request.status));
                  }
            });
      };

      const tabs = () => {

            const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
            const cardDetailsTitleElem = document.querySelector('.card-details__title');
            const cardImageItemElem = document.querySelector('.card__image_item');
            const cardDetailsPriceElem = document.querySelector('.card-details__price');
            const descriptionMemory = document.querySelector('.description__memory');
            const data = [{
                        name: 'Смартфон Apple iPhone 12 Pro 128GB Graphit',
                        img: 'img/iPhone-graphite.png',
                        price: 99990,
                        memoryROM: 128,
                  },
                  {
                        name: 'Смартфон Apple iPhone 12 Pro 256GB Pacific Blue',
                        img: 'img/iPhone-blue.png',
                        price: 100990,
                        memoryROM: 256,

                  },
                  {
                        name: 'Смартфон Apple iPhone 12 Pro 128GB silver',
                        img: 'img/iPhone-silver.png',
                        price: 95990,
                        memoryROM: 128,
                  },
            ];

            const deactice = () => {
                  cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
            }

            cardDetailChangeElems.forEach((btn, i) => {
                  btn.addEventListener('click', () => {
                        if (!btn.classList.contains('active')) {
                              deactice();
                              btn.classList.add('active');
                              cardDetailsTitleElem.textContent = data[i].name;
                              cardImageItemElem.src = data[i].img;
                              cardImageItemElem.alt = data[i].name;
                              cardDetailsPriceElem.textContent = data[i].price + '₽';
                              descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM } ГБ`;
                        }
                  });
            });
      };

      const accardion = () => {
            const characteristicsListElem = document.querySelector('.characteristics__list');
            const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

            const open = (button, dropDown) => {
                  closeAllDrops();
                  dropDown.style.height = `${dropDown.scrollHeight}px`;
                  button.classList.add('active');
                  dropDown.classList.add('active');
            };

            const close = (button, dropDown) => {
                  button.classList.remove('active');
                  dropDown.classList.remove('active');
                  dropDown.style.height = '';
            };

            const closeAllDrops = (button, dropDown) => {
                  characteristicsItemElems.forEach((elem) => {
                        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                              close(elem.children[0], elem.children[1]);
                        }
                  })
            }

            characteristicsListElem.addEventListener('click', (event) => {
                  const target = event.target;
                  if (target.classList.contains('characteristics__title')) {
                        const parent = target.closest('.characteristics__item');
                        const description = parent.querySelector('.characteristics__description');
                        description.classList.contains('active') ?
                              close(target, description) :
                              open(target, description);
                  }
            });

      };


      const modal = () => {
            const cardDetailsButtonBuyElem = document.querySelector('.card-details__button_buy');
            const cardDetailsButtonDeliveryElem = document.querySelector('.card-details__button_delivery');
            const modal = document.querySelector('.modal');
            const cardDetailsTitleElem = document.querySelector('.card-details__title');
            const modalTitleElem = modal.querySelector('.modal__title');
            const modalSubtitleElem = modal.querySelector('.modal__subtitle');
            
            
            const openModal = (event) => {
                  const target = event.target;
                  modal.classList.add('open');
                  document.addEventListener('keydown', escapeHandler);
                  modalTitleElem.textContent = cardDetailsTitleElem.textContent;
                  modalSubtitleElem.textContent = target.dataset.buttonBuy;
                  
            };

            const closeModal = () => {
                  modal.classList.remove('open');
                  document.removeEventListener('keydown', escapeHandler);
            };

            const escapeHandler = event => {
                  if (event.code === 'Escape') {
                        closeModal();
                  }
            };

            modal.addEventListener('click', (event) => {
                  const target = event.target;
                  if (target.classList.contains('modal__close') || target === modal) {
                        closeModal();
                  }
            });

            cardDetailsButtonBuyElem.addEventListener('click', openModal);
            cardDetailsButtonDeliveryElem.addEventListener('click', openModal);
            
           
      }

      const renderCrossSell = () => {
            const crossSellList = document.querySelector('.cross-sell__list');
            const shuffle = arr => arr.sort(() => Math.random() - 0.5);

            const createCrossSellItem = (good) => {

                  const { photo, name , price } = good;

                  const liItem = document.createElement('li');
                  liItem.innerHTML = `
                        <article class="cross-sell__item">
                              <img class="cross-sell__image" src="${photo}" alt="${name}">
                               <h3 class="cross-sell__title">${name}</h3>
                               <p class="cross-sell__price">${price}₽</p>
                               <button class = "button button_buy cross-sell__button">Купить</button>
                         </article>
                  `;
                  return liItem;
            }

            const createCrossSellList = (goods) => {
                  const shuffleGoods = shuffle(goods); 
                  const fourItems = shuffleGoods.slice(0 , 4);

                  fourItems.forEach(item => {
                        crossSellList.append(createCrossSellItem(item));
                  })
            };

            getData('cross-sell-dbase/dbase.json', createCrossSellList);
            
      }

      tabs();
      accardion();
      renderCrossSell();
      amenu('.header__menu' , '.header-menu__list' , '.header-menu__item', '.header-menu__burger');
});