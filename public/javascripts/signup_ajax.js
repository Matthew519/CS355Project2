var signup = function() {
    var payload = {
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Username: $('#Username').val(),
        Email: $('#Email').val(),
        Password: $('#Password').val()
    };

    $.ajax({
        url: '/users/users_insert',
        type: 'GET',
        contentType: "json",
        data: payload,
        complete: function(data) {

            $('#message').html(data.responseJSON.message);

            $('#message').show();

            window.location.assign('/login');
        }
    })
}

$(document).ready(function() {

    $('#addBtn').click(function (e) {
        console.log('addBtn clicked');
        e.preventDefault();
        signup();
    });
});