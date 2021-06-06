$(document).ready(function () {
    $('body').on('click', '#my_position_1', function(){
        if($('#my_position_1').hasClass('active')){
            $('#my_position_1').toggleClass('active');
            my_position = -1;
        }else{
            $('#my_position_1').toggleClass('active');
            if($('#my_position_2').hasClass('active')){
                $('#my_position_2').toggleClass('active');
            }
            my_position = 0;
        }
    })
});


