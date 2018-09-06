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
    //$('[data-mask]').inputmask({"mask": $(this).attr('data-mask')});

    initPeopleSlider();
    initPhotoSlider();

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

$(window).resize(function(){
    var width = $(window).width();
    //collapseReview(1);
   // stepsSlider();

});


$(document).scroll(function(){
    //setFixedHeader();
});