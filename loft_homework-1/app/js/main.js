const body = document.body;
const burger = document.querySelector('.burger__menu');
const activeClass = 'is-active';

burger.addEventListener('click', function(e) {
  e.preventDefault();
  body.classList.contains(activeClass) ? body.classList.remove(activeClass) :body.classList.add(activeClass) 
})