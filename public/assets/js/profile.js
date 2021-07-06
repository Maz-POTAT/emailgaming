$(document).ready(function () {
    $('body').on('click', '#reset', function(){
        if ($('#user_password').val() == $('#user_confirmPassword').val()) {
            $.ajax({
                type: "POST",
                url: '/reset_profile',
                data: {
                    first_name: $('#user_email').val(),
                    first_name: $('#user_firstName').val(),
                    last_name: $('#user_lastName').val(),
                    password: $('#user_password').val(),
                    notification: $('#user_notification').val(),
                },
                error: function(xhr, status, error){
                    $('#alert_area_reset_failed').html('<div class="alert alert-danger alert-dismissable">\
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                        ' + error.errorMessage + '.\
                    </div>');
                },
                success: function(result){
                    $('#alert_area_reset_failed').html('<div class="alert alert-info alert-dismissable">\
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                        Your profile has been sent to your email.\
                    </div>');
                }
            });                
        }
        else {
            $('#alert_area_user_password').html('<div class="alert alert-danger alert-dismissable">\
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                Please type correct password.\
            </div>');
        }
    })
});


