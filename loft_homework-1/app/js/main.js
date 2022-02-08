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

 $('.price .container').bxSlider();

 $('.form').submit((e) => {
   e.preventDefault();

   const form = $(e.currentTarget);
   const name = form.find("[name='name']");
   const phone = form.find("[name='phone']");
   const comment = form.find("[name='comment']");
   const to = form.find("[name='to']");

   [name, phone, comment, to].forEach((field) => {
     if (field.val() === "") {
       field.addClass(".input-error");
     }
   })

    
   $.ajax({
     url: "https://webdev-api.loftschool.com/sendmail",
     method: "post",
     data: {
       name: name.val(),
       phone: phone.val(),
       comment: comment.val(),
       to: to.val(),
     }
   });

  //  $.fancybox.open({
  //    src: "#modal",
  //    type: "inline"
  //  })
 });

 $(".app-submit-btn").click(e => {
   e.preventDefault();

   $.fancybox.close();
 });

 



             
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