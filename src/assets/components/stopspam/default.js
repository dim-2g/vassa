$(document).ready(function(){
    $.ajax({
      url : "/assets/components/stopspam/action.php",
      dataType : "html",
      success : function(data) {
        $('[name="xcode"]').val(data);
      }
    });
});