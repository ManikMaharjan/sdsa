let userInfo = getUserInfo();
$.ajax({
    url:"http://localhost:3000/api/user/"+ userInfo.id,
    method:"GET" ,
    headers: {"Authorization": 'bearer '+ localStorage.getItem('token')}

}).done(function(response){
    $('#fullname').val(response.fullname);
    $('#username').val(response.username);
    $('#address').val(response.address);
    $('#phonenumber').val(response.phone_number);
    $('#email').val(response.email);
    

}).fail(function(err){
 
})
/**
 * 
 *
 */
function validateUpdate(){
    let fullname=$('#fullname').val();
    let username=$('#username').val();
    let address=$('#address').val();
    let phone_number=$('#phonenumber').val();
   
    if(fullname ===""){
      return{
        isValidate:false,
        message:"Full name is Required"
      };
    }
    if(username ===""){
      return{
        isValidate:false,
        message:"Username is Required"
      };
    }
    if(address ===""){
      return{
        isValidate:false,
        message:"Address is Required"
      };
    }
    if(phone_number ===""){
      return{
        isValidate:false,
        message:"Phone Number is Required"
      };
    }
    
    return{
        isValidate:true,
        message:""
      }
    
    }
$('#user-update-btn').click(function(){
    event.preventDefault();
    let validation=validateUpdate();
    if(validation.isValidate) {
    let form  =$('#update-user').serialize();
  
    $.ajax({
        url:"http://localhost:3000/api/user/"+userInfo.id,
        method:"PUT",
        data: form,
        headers: {"Authorization": 'bearer '+ localStorage.getItem('token')}
    }).done(function(response){
        localStorage.setItem("user-info",JSON.stringify(response));
        window.location.reload();
    })
    .fail(function(err){
        alert(err.responseText)
    })
 } else{
        $.confirm({
        title: 'Error',
        content:validation.message
        })

    }


})
// $('#profile_button').click(functiom(){
//     let form  =$('#upload_profilepic').serialize();
//     $ajax({
//         url:"http://localhost:3000/api/user/uploadImg/"+userInfo,
//         method: "POST",
//         headers: {"Authorization": 'bearer '+ localStorage.getItem('token')},
//         data: form
//     }).done(function(response){
    
//     }
//     .fail(function(err){
    
//     })
//     )

// })

