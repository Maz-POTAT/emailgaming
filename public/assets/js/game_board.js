var user_role = -1;
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

    $('body').on('click', '#user_invite', function(){
        
    })
});


