var user_role = -1;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
$(document).ready(function () {
    $('body').on('click', '#user_role_1', function(){
        if($('#user_role_1').hasClass('active')){
            $('#user_role_1').toggleClass('active');
            user_role = -1;
        }else{
            $('#user_role_1').toggleClass('active');
            if($('#user_role_2').hasClass('active')){
                $('#user_role_2').toggleClass('active');
            }
            user_role = 0;
        }
    })

    $('body').on('click', '#user_role_2', function(){
        if($('#user_role_2').hasClass('active')){
            $('#user_role_2').toggleClass('active');
            user_role = -1;
        }else{
            $('#user_role_2').toggleClass('active');
            if($('#user_role_1').hasClass('active')){
                $('#user_role_1').toggleClass('active');
            }
            user_role = 1;
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

            if (user_role != -1) {
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
                alert('ok');
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


