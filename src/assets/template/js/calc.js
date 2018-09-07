$(function() {
    $('body').on('change', '[name="doc"]', function() {
        setRelated();
    });

});

$(document).ready(function() {
    $(document).on('click', '.calc-start', function(e) {
        e.preventDefault();
        startCalc();
    });
});

setRelated = function() {
    var doc_inp = $('[name="doc"]');
    var concept_inp = $('[name="concept"]');
    if (doc_inp.prop('checked')) {
        concept_inp.prop('checked', true);
    }
};

startCalc = function() {
    var data = {
        'place': $('[name="place"]').val(),
        'plan': $('[name="plan"]').prop('checked') ? 1 : 0,
        'concept': $('[name="concept"]').prop('checked') ? 1 : 0,
        'doc': $('[name="doc"]').prop('checked') ? 1 : 0,
        'complect': $('[name="complect"]').prop('checked') ? 1 : 0,
        'nadzor': $('[name="nadzor"]').prop('checked') ? 1 : 0,
        'square': $('[name="square"]').val(),
        'comment': $('[name="comment"]').val()
    }
    $.ajax({
        type: "POST",
        url: "/assets/components/custom/calc.php",
        dataType: 'json',
        data: data,
        success: function(res) {
          if (res.success) {
            $('.calc-cost').html(res.result.cost_html);
            $('.calc-duration').html(res.result.duration_html);
            $('.calc-message').val(res.result.message);
            $('.c-result').slideDown();
          } else {
            AjaxForm.Message.error(res.errors.join("<br />"));
          }
        }
    });
};