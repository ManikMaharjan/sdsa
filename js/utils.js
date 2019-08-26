let token = localStorage.getItem("token");
let currentUrl =window.location.pathname;
if(token){
    if(currentUrl == '/login' || currentUrl == '/register'){
        window.location="/dashboard"
    }
}else{
    if(currentUrl == '/login' || currentUrl == '/register'){
        
    }else{
        window.location="/login"
    }
}

function getUserInfo(){
    let userInfo = localStorage.getItem("user-info");
    if(userInfo){
        let userObj = JSON.parse(userInfo);
        return userObj;
    }
}
function setUserInfoIntoDom(){
    let userInfo = getUserInfo();
    $('#grp-user-name').text(userInfo.fullname);
}

function logout(){
    localStorage.clear();
    window.location="/login";
}

$('#grp-logout').click(function(){
    logout();
})


/**
 * 
 * UTILS
 * 
 */
function validateAddTraction(){
    let email =$('#inputEmail4').val();
    let amount =$('#amount4').val();

    if(email === ""){
        return {
            isValidate:false,
            message:"email is required"
        };
    }
    if(amount === ""){
        return {
            isValidate:false,
            message:"amount is required"
        };
    }
    if(amount.length > 5){
        return{
            isValidate:false,
            message:"Seen fake as the 0 are more"
        }
    }
    return{
        isValidate:true,
        message:""
    }
}


 $('#grp-add-transaction').click(function(event){
    event.preventDefault();
     /**
      * validation function run before adding transacation
      */
     let validation = validateAddTraction();
     if(validation.isValidate){
        let userInfo= getUserInfo();
        let form = $('#grp-add-transaction-form').serialize();
        form += '&create_user_id='+ userInfo.id;
        $.ajax({
            url:"http://localhost:3000/api/money",
            headers: {"Authorization": 'bearer '+ localStorage.getItem('token')},
            method:"POST",
            data:form
        })
        .done(function(response){
            $.confirm({
                title: 'Success',
                content: 'Transaction Added',
                buttons: {
                    
                    confirm:{
    
                        text: 'OK',
                        action: function () {
                           window.location.reload();
                        }
                    }
                }
            });
        })
        .fail(function(err){
            $.confirm({
                title: 'Error',
                content: err.responseText
            });
        })
    
    
     }else{
        $.confirm({
            title: 'Error',
            content: validation.message
        });
     }
    

 })