$(function() {
    $('select.selectric').selectric({
        maxHeight: 210
    });


    $('.open-popup-link').magnificPopup({
        type:'inline'
    });

    $('.img-link').magnificPopup({
        type  : 'image'
    });


    $('input[name="phone"]').inputmask({"mask": "+7 (999) 999-99-99"});



});
$(window).resize(function(){
    var width = $(window).width();
    //collapseReview(1);
   // stepsSlider();

});


$(document).scroll(function(){
    //setFixedHeader();
});