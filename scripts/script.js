document.addEventListener('DOMContentLoaded', () => {

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
                  closeAllDrops ();
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
                              close (elem.children[0]  , elem.children[1]);
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
            const modal = document.querySelector('.modal');
            const modalClose = document.querySelector('.modal__close')

            const escapeHandler = event => {
                  if (event.code === 'Escape') {
                        modal.classList.remove('open');
                   };
            };

            cardDetailsButtonBuyElem.addEventListener('click', () => {
                  modal.classList.add('open');
            })

            modalClose.addEventListener('click', () => {
                  modal.classList.remove('open');
                  modal.classList.add('close');
            })


            modal.addEventListener ('click', (closeEv) =>  {
                  const target = closeEv.target; 
                  target.classList.remove('open');
            })

            document.addEventListener('keydown', event => {
                   if (event.code === 'Escape') {
                        modal.classList.remove('open');
                   };
            })


      };

      tabs();
      accardion();
      modal();
});


/*
document.addEventListener('DOMContentLoaded', () => {
      'use strict';

      const tabs = () => {

            const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
            const cardDetailsTitleElems = document.querySelectorAll('.card-details__title');
            const cardImageElems = document.querySelectorAll('.card__image');

            const hideAll = () => {
                  for (let i = 0; i<cardDetailChangeElems.length; i++ ) {
                        cardDetailChangeElems[i].classList.remove('active');
                        cardDetailsTitleElems[i].classList.remove('active');
                        cardImageElems[i].classList.remove('active');
                  }
            };

            
            for (let i = 0; i < cardDetailChangeElems.length; i++) {
                  cardDetailChangeElems[i].addEventListener('click' , () => {
                        hideAll();
                        cardDetailChangeElems[i].classList.add('active');
                        cardDetailsTitleElems[i].classList.add('active');
                        cardImageElems[i].classList.add('active');
                  });
            } 
      };
      
      tabs();
});

*/