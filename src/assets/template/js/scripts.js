$(function() {
    $('select.styled').selectric({
        maxHeight: 210
    });


    $('.open-popup-link').magnificPopup({
        type:'inline'
    });

    $('.img-link').magnificPopup({
        type  : 'image'
    });

    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    })

    $('.toggle-menu').on('click', function () {
        $('.mobile-menu').slideToggle();
    });
    //$('[data-mask]').inputmask({"mask": $(this).attr('data-mask')});

    $('.services__top').on('click', function () {
        var parentThis = $(this).parents('.services__card');
        parentThis.toggleClass('services__card--active');
        /*
        $('.services__card').not(parentThis).removeClass('services__card--active');
        if (parentThis.hasClass('services__card--active')) {
            parentThis.removeClass('services__card--active');
        } else {
            parentThis.addClass('services__card--active');
        }*/
    });

    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top}, 1200);
    });

    $('body').on('click', '.order-design', function(e) {
        e.preventDefault();
        $('[name="plan"]').prop("checked", true);
        $('[name="concept"]').prop("checked", true);
        $('[name="doc"]').prop("checked", true);
        $('[name="complect"]').prop("checked", true);
        $('[name="nadzor"]').prop("checked", true);

        selector = '.calculator';
        $('html, body').animate({ scrollTop: $(selector).offset().top}, 1200);
    });

    $('body').on('click', '[data-page]', function(e) {
        e.preventDefault();
        var xpage = $(this).attr('data-page');
        console.log(xpage);
        //var catalog_list = $('.catalog__list');
        //catalog_list.css({'min-height': catalog_list.outerHeight()});

        showProducts(xpage, false);

        //catalog_list.css({'min-height': "auto"});
    });


    initPeopleSlider();
    initPhotoSlider();
    initHowWorkSlider();

    showProducts(1, true);

});

var slider_people = false;
initPeopleSlider  = function() {
    if (!slider_people) {
        $('.people-slider').slick({
            'autoplay': false,
            'arrows': true,
            'dots': true,
            'slidesToShow': 2,
            'slidesToScroll': 1,
            'adaptiveHeight': true
        });
        slider_people = true;
    }
};

var slider_photo = false;
initPhotoSlider  = function() {
    if (!slider_photo) {
        $('.photo-slider').slick({
            'autoplay': false,
            'arrows': false,
            'dots': true,
            'slidesToShow': 6,
            'slidesToScroll': 1,
            'adaptiveHeight': true,
            'responsive': [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        slider_photo = true;
    }
};

var slider_howwork = false;
initHowWorkSlider  = function() {

    if ($(window).width()<1000) {
        if (!slider_howwork) {
            $('.howwork-slider').slick({
                'autoplay': false,
                'arrows': true,
                'dots': true,
                'slidesToShow': 3,
                'slidesToScroll': 1,
                'infinite': false,
                'responsive': [
                    {
                        breakpoint: 750,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            slider_howwork = true;
        }
    } else {
        if (slider_howwork) {
            $('.howwork-slider').slick('unslick');
            slider_howwork = false;
        }
    }
}


$(window).resize(function(){
    var width = $(window).width();
    initPeopleSlider();
    initPhotoSlider();
    initHowWorkSlider();

});


$(document).scroll(function(){
    //setFixedHeader();
});



showProducts = function(xpage, scroll) {

    var more = $('[data-page]');
    var catalog_list = $('.samples__box');
    //$('.catalog__list li.catalog__item').css({"opacity": 0.2});
    $.ajax({
        url : "/assets/components/custom/action.php",
        dataType : "json",
        type: "POST",
        data : { 'xpage': xpage},
        success : function(data) {
          if (data.code) {
              if (xpage>1) {
                catalog_list.append(data.code);
              } else {
                catalog_list.html(data.code);
              }
              
              setTimeout(function(){
                //$('.catalog__list').html(data.code);
                //$('.catalog__list li.catalog__item').css({"opacity": 1});
              }, 500);

              /*if (scroll) {
                $('html, body').animate({ scrollTop: $('#catalog').offset().top}, 1200);  
              }*/
              
          }
          if (data.num <= data.total && data.total>1) {
            more.show();  
            more.attr('data-page', data.num);
          } else {
            more.hide();  
          }
          
        }
    });
    
}