if (window.innerWidth <= 768) {           //BURGER-MENU
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
  
                  //в бургер меню не разрешать перезагружать страницу (a ссылкам)
  function toggleClass (e) {
    body.classList.contains(activeClass) ? body.classList.remove(activeClass) :body.classList.add(activeClass); 
  };
 };


 


                  //Slider
 const slider = $('.slider').bxSlider({
   pager: false,
   controls: false
 });

 $('.price__left').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
 });

 $('.price__right').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
 });

                // МОДАЛКА
 const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.lenght === 0;

 }


 $('.form').submit((e) => {
   e.preventDefault();

   const form = $(e.currentTarget);
   const name = form.find("[name='name']");
   const phone = form.find("[name='phone']");
   const comment = form.find("[name='comment']");
   const to = form.find("[name='to']");

   const modal = $("#modal");
   const content = modal.find(".modal__content");

   modal.removeClass("error-modal");

   const isValid = validateFields(form, [name, phone, comment, to]);

   if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
  
   error: data => {}
  });

    request.done(data => {
      content.text(data.message);
      // console.log(data);
 }); 

  request.fail((data) => {
    const message = data.responseJSON.message;
    content.text(message);
    modal.addClass("error-modal");


   
  });

  request.always(() => {

    $.fancybox.open({
      src: "#modal",
      type: "inline",
    });

  });
 }
});

 $(".app-submit-btn").click((e) => {
   e.preventDefault();

   $.fancybox.close();
 });


                      //Табы
 const findBlockByAlias = (alias) => {
   return $(".reviews__info").filter((ndx, item) => {
     return $(item).attr("data-linked-with") === alias;
   });
 };

  $(".interactive-avatar__link").click((e) => {
    e.preventDefault();
    

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__item");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
  });


                   //Аккардеон

  const openItem = item => {
  const container = item.closest(".team__list-item"); //возможно требует правки
  const contentBlock = container.find(".team__bio-wrapper"); //возможно требует правки
  const textBlock = contentBlock.find(".team__bio");
  const reqHeight = textBlock.height();

  contentBlock.height(reqHeight);

  }
$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  
  openItem($this);

});

       



             


















