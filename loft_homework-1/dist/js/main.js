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

  return errorFields.length === 0;

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


  container.addClass("active");
  contentBlock.height(reqHeight);

  }

  const closeEveryItem = container => {
    const items = container.find('.team__bio-wrapper');
    const itemContainer = container.find(".team__list-item");

    itemContainer.removeClass("active");
    items.height(0);
  }

$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team__list');
  const elemContainer = $this.closest(".team__list-item");

  if (elemContainer.hasClass("active")) {
    //close
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
  
});

                            //Open Menu

const mesureWidth = item => {
  let reqItem = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBloks = container.find(".products-menu__title");
  const titlesWidth = titlesBloks.width() * titlesBloks.length;

  const textContainer = item.find(".products-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));  


  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

const closeEveryItemInContainer = container => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");

  items.removeClass("active");
  content.width(0);
}

const opensItem = item => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".products-menu__container");


  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".products-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".products-menu"); 

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    opensItem(item);
  }


});


                      //MAP MARKER

// let myMap;

// const init = () => {
//   myMap = new ymaps.Map("map", {
//     center: [55.76, 37.64],
//     zoom: 7
//   });
// }

// ymaps.ready(init);






                          //OPS

const sections = $("section");
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active");

const performTransition = (sectionEq) => {

  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;

    display.css({
      transform: `translateY(${position}%)`
    });
  
    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
    
    setTimeout(() => {
      inScroll = false;

    }, 1300);
  }
};

const scrollViewport = (direction) => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();


  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev"  && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    performTransition(2);
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

       



             


















