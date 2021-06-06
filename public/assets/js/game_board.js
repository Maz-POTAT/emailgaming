var my_position = -1;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
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

    $('body').on('click', '#my_position_2', function(){
        if($('#my_position_2').hasClass('active')){
            $('#my_position_2').toggleClass('active');
            my_position = -1;
        }else{
            $('#my_position_2').toggleClass('active');
            if($('#my_position_1').hasClass('active')){
                $('#my_position_1').toggleClass('active');
            }
            my_position = 1;
        }
    })

    $('body').on('click', '#start_room', function(){
        if (validateEmail($('#oppo_email').val())) {
            let bSuccess = true;
            if (validateEmail($('#my_email').val())) {
                $('#alert_area_my_email').html('');
            } else{
                $('#alert_area_my_email').html('<div class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                    Please insert a vaild email address.\
                </div>');
                bSuccess = false;
            }

            if (!$('#game_title').val().length == 0) {
                $('#alert_area_game_title').html('');
            } else{
                $('#alert_area_game_title').html('<div class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                    Please insert a Game Title.\
                </div>');
                bSuccess = false;
            }

            if (my_position != -1) {
                $('#alert_area_game_position').html('');
            } else{
                $('#alert_area_game_position').html('<div class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                    Please choose a game position.\
                </div>');
                bSuccess = false;
            }

            $('#alert_area_oppo_email').html('');
            $('#invite_modal').modal('hide');
            if(bSuccess)
            {
                $('#alert_area_invite_error').html('');
                $.ajax({
                    type: "Post",
                    url: '/create_game',
                    data: {
                        game_id: 1,
                        game_title: $('#game_title').val(),
                        my_position: my_position,
                        my_email: $('#my_email').val(),
                        oppo_email: $('#oppo_email').val(),
                    },
                    success: function(result){
                        if(result.success){
                            window.location='/game?room_id=' + result.room_id + "&my_email="+ result.my_email;
                        }
                        else{
                            $('#alert_area_invite_error').html('<div class="alert alert-danger alert-dismissable">\
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                                ' + result.errorMessage + '.\
                            </div>');
                        }
                    },
                    error: function(xhr, status, err){
                        $('#alert_area_invite_error').html('<div class="alert alert-danger alert-dismissable">\
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                            ' + err + '.\
                        </div>');
                    }
                  });                
            }
        }
        else{
            $('#alert_area_oppo_email').html('<div class="alert alert-danger alert-dismissable">\
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                Please insert a vaild email address.\
            </div>');
            return;
        }
    })
});


