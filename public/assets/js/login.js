$(document).ready(function () {
    $('body').on('click', '#login', function(){
        let bSuccess = true;
        if (validateEmail($('#user_email').val())) {
            if (!$('#user_password').val().length == 0) {
                $('#alert_area_user_password').html('');
            } else{
                $('#alert_area_user_password').html('<div class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                    Please insert a password.\
                </div>');
                bSuccess = false;
            }

            $('#alert_area_user_email').html('');
            $('#invite_modal').modal('hide');
            if(bSuccess)
            {
                $('#alert_area_login_failed').html('');
                $.ajax({
                    type: "POST",
                    url: '/login',
                    data: {
                        email: $('#user_email').val(),
                        password: $('#user_password').val(),
                    },
                    success: function(result){
                        if(result.success == true){
                            window.location='/';
                        }
                        else
                        {
                            $('#alert_area_login_failed').html('<div class="alert alert-danger alert-dismissable">\
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                                ' + result.reason + '\
                            </div>');
                        }
                    },
                    error: function(xhr, status, err){
                        $('#alert_area_login_failed').html('<div class="alert alert-danger alert-dismissable">\
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                            ' + err + '\
                        </div>');
                    }
                });                
            }
        }
        else{
            $('#alert_area_user_email').html('<div class="alert alert-danger alert-dismissable">\
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                Please insert a vaild email address.\
            </div>');
        }
    })
    $('body').on('click', '#send_password', function(){
        if (validateEmail($('#user_email').val())) {
            $('#alert_area_user_email').html('');
            $.ajax({
                type: "POST",
                url: '/send_password',
                data: {
                    email: $('#user_email').val(),
                },
                error: function(xhr, status, error){
                    $('#alert_area_login_failed').html('<div class="alert alert-danger alert-dismissable">\
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                        ' + error.errorMessage + '.\
                    </div>');
                },
                success: function(result){
                    $('#alert_area_login_failed').html('<div class="alert alert-info alert-dismissable">\
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                        Your password has been sent to your email.\
                    </div>');
                }
            });                
        } else {
            $('#alert_area_user_email').html('<div class="alert alert-danger alert-dismissable">\
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                Please insert a vaild email address.\
            </div>');
        }
    })
});


