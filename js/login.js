function validateLogIn(){
    let email =$('#email').val();
    let password=$('#password').val();
   
    if(email ===""){
        return{
            isValidate:false,
            message:"email is required"
        };
    }
    if(password ===""){
        return{
            isValidate:false,
            message:"Password is required"
        };
    }
    return{
        isValidate:true,
        message:""
    }
}

$("#grp-login-btn").click(function(){
    event.preventDefault();
    /**
     * validation of login before loging 
     */
    let validation=validateLogIn();
    if(validation.isValidate){
    let form = $('#grp-login-form').serialize();
    $.ajax({
        url:"http://localhost:3000/api/user/login",
        method:"POST",
        data:form
    }).done(function(response){
        saveToLocalStroge(response);
        window.location="/dashboard"
    })
    .fail(function(err){
        $.confirm({
            title: 'Error',
            content: err.responseText
        });
    })
}else{
    $.confirm({
        title:'Error',
        content:validation.message
    })
}
})


function saveToLocalStroge(data){
    localStorage.setItem("token", data.token);
    localStorage.setItem("user-info",JSON.stringify(data.userInfo));
}
