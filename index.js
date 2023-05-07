$(document).ready(function(){
    if(localStorage.getItem('loginstatus') == 'true') {
        location.assign('./order.html')
    }
    let loginform1 = window.document.getElementById('loginform1');
    loginform1.onsubmit = function(e) {
        e.preventDefault();
        let logincredential = {
            username: this.username.value,
            password: this.password.value
        }
        if(logincredential.username === logincredential.password) {
            $.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",logincredential,
                function(data, textStatus, jqXHR) {
                    alert("Login Successful!!")
                    window.localStorage.setItem('loginstatus', true)
                    location.replace('./order.html')
                },

            );
        }
        else {
            alert(`Please Enter Valid Credentials ${logincredential.username} ${logincredential.password}`)
        }
    }
    $('.t_bar-menu').click(function (e){
        e.preventDefault();
        $('.active').removeClass('active');
        $(e.target).addClass('active')
    });
});