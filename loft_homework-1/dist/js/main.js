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
  body.classList.contains(activeClass) ? body.classList.remove(activeClass) :body.classList.add(activeClass) 
};
















// const links = document.querySelectorAll('.list__link');

// links.forEach(function(element){
//   element.addEventListener('click', toggleMenu);
// })