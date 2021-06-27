$(document).ready(function () {
    $('body').on('click', '.join-game', function(){
        var parent = $(this).closest('game_item');
        var room_id = parent.attr('room_id');
        var empty_position = parent.attr('empty_position');
        $.ajax({
            type: "Post",
            url: '/join_room',
            data: {
                room_id: room_id,
                my_position: empty_position,
            },
            success: function(result){
                if(result.success){
                    window.location='/';
                }
                else{
                    $('#alert_area_join_error').html('<div class="alert alert-danger alert-dismissable">\
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                        ' + result.errorMessage + '.\
                    </div>');
                }
            },
            error: function(xhr, status, err){
                $('#alert_area_join_error').html('<div class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
                    ' + err + '.\
                </div>');
            }
            });                
    })
});
