function updateUser(id, parentSelector){
      $.ajax({
        url: '/user/' + id,
        type: 'PUT',
        dataType: 'json',
        data: {
            firstName: $(parentSelector).find('.upd-first-name').val(),
            lastName: $(parentSelector).find('.upd-last-name').val()
        },
        success: function(data) {
            read();
        }
    })
}

function deleteUser(id, parentSelector){
    $.ajax({
        url: '/user/' + id,
        type: 'DELETE',
        dataType: "json",
        success: function(data) {
            read();
        }
    })
}

function read(){
    $.ajax({
        url: '/user',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#list').html('');
            for(var i in data.users){
                $('#list').append('<div class="user-'+i+'">' +
                    'First name:' +
                    '<input class="upd-first-name" value="'+data.users[i].firstName+'">' +
                    'Last name:' +
                    '<input class="upd-last-name" value="'+data.users[i].lastName+'">' +
                    '<input class="update" onclick="updateUser(\''+data.users[i]._id+'\',\'.user-'+i+'\')" type="button" value="Update">' +
                    '<input class="delete" onclick="deleteUser(\''+data.users[i]._id+'\',\'.user-'+i+'\')" type="button" value="Delete">' +
                    '</div>');
            }
        }
    })
}

$(document).ready(function(){
    $('#create').on('click', function(){
        $.ajax({
            url: '/user',
            type: 'POST',
            dataType: 'json',
            data: {
                firstName: $('#user-first-name').val(),
                lastName: $('#user-last-name').val()
            },
            success: function(data) {
                read();
            }
        })
    });
    $('#read').on('click', read);
});