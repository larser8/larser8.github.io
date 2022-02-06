if (window.innerWidth <= 768) {
  const body = document.body;
  const burger = document.querySelector('.burger__menu');
  const nav = document.querySelector('.list');
  const activeClass = 'is-active';
  
  burger.addEventListener('click', (e) =>{
    e.preventDefault();
    toggleClass();
  });
  
  nav.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('list__link')) {
      toggleClass();
    }
  });
  
  
  function toggleClass (e) {
    body.classList.contains(activeClass) ? body.classList.remove(activeClass) :body.classList.add(activeClass); 
  };
 };

 $('.price__slider').bxSlider();

 

 



             
//   const openItem = item => {
//   const container = item.closest(".team__list-item");
//   const contentBlock = container.find(".team__name"); // возможно потребует правки
//   const textBlock = contentBlock.find(".team__text");
//   const reqHeight = textBlock.height();

//   contentBlock.height(reqHeight);
//  }

//  $('.team__link').click(e =>{
//    const $this = $(e.currentTarget);

//    openItem($this);
//  });


















// const links = document.querySelectorAll('.list__link');

// links.forEach(function(element){
//   element.addEventListener('click', toggleMenu);
// })