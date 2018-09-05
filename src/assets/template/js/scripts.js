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



});
$(window).resize(function(){
    var width = $(window).width();
    //collapseReview(1);
   // stepsSlider();

});


$(document).scroll(function(){
    //setFixedHeader();
});