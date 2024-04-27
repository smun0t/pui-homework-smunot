;(function($) {
    "use strict"; 

    // mobile menu js
    $('.mobile-menu-opner').on('click', function(){
        $('.overlay, .main-menu').addClass('active');
    });
    $('.mobile-menu-close, .overlay').on('click', function(){
        $('.overlay, .main-menu').removeClass('active');
    });
    

     
    // partner section slider js
    var swiper = new Swiper(".photography-slider", {
        slidesPerView: 1.5,
        spaceBetween: 20,
        speed: 3000,
        loop: true,
        autoplay: {
          delay: 'auto',
          disableOnInteraction: false,
        },
        breakpoints: {
        640: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
      },
    });

})(jQuery);