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

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.751799, 37.587983],
    zoom: 11,
    controls: []
  });

  const coords = [
    [55.753476, 37.584695],
    [55.754626, 37.591879],
    [55.750390, 37.588969],
    [55.750892, 37.598814]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "../images/marker.svg",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]   
  });
  
  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

}


// ymaps.ready(init);





                          //OPS

const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -125;

  if (isNaN(position)) {
    console.error("передано не верное значение в countSectionPosition");
    return 0;

  }

   return position;
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  console.log(items.eq(itemEq))
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

  if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;
    const position = countSectionPosition(sectionEq); 

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "active");
    
    setTimeout(() => {
      inScroll = false;
      resetActiveClassForItem(sectionEq, "active");

    }, transitionOver + mouseInertiaOver );
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      
      if (nextSection.length) {
        performTransition(nextSection.index());
      }

    },
    prev() {

      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };  
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller(); 

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 38: //prev
      scroller.prev();
      break;
  
      case 40: //next
      scroller.next();
      break;
  
    }
  
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

 performTransition(reqSection.index());
});

                        //OPS MOBILE


if (isMobile){

  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$("body").swipe({
  swipe:function (event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if (direction === "up") scrollDirection = "next"
    if (direction === "down") scrollDirection = "prev" 

     scroller[scrollDirection]();
   },
 });
};


                                //Youtube API
      
  let player;
  const playerContainer = $('.player');

  let eventsInit = () => {
    $(".player__start").click(e => {
      e.preventDefault();

      if (playerContainer.hasClass("paused")) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
   });

   $(".player__playback").click(e => {
     const bar = $(e.currentTarget);
     const clickedPosition = e.originalEvent.layerX;
     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
     const newPlaybackPositionSec = 
          (player.getDuration() / 100) * newButtonPositionPercent;

     $(".player__playback-button").css({
       left: `${newButtonPositionPercent}%`
     });
    
     player.seekTo(newPlaybackPositionSec);
   });

   $(".player__splash").click(e => {
     player.playVideo();
   })
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;

} 

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  
  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval != 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const onPlayerStateChange = event => {
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;

    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

    function onYouTubeIframeAPIReady() {
      player = new YT.Player("yt-player", {
        height: '400',
        width: '660',
        videoId: "oqeW9YMHweo",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        },
        playerVars: {
          controls: 0,
          disablekb: 0,
          showinfo: 0,
          rel: 0,
          autoplay: 0,
          modestbranding: 0
        }
      });
    }

    eventsInit();


       



             


















