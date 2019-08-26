/**
 * validation of user during registration:
 * 
 */
function validateRegistration(){
  let fullname=$('#fullname').val();
  let username=$('#username').val();
  let address=$('#address').val();
  let phone_number=$('#phone_number').val();
  let email=$('#email').val();
  let password=$('#password').val();
  /**
   * 
   * validation start
   */
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
  if (phone_number.length <10){
    return{
      isValidate:false,
      message:"Number must of 10 digit"
    };
  }
  if(email ===""){
    return{
      isValidate:false,
      message:"Email is Required"
    };
  }

  if(password ===""){
    return{
      isValidate:false,
      message:"Password is Required"
    };
  }
  if (password.length < 5){
    return{
      isValidate:false,
      message:"Password is less than 5 character"
    };
  }
  
  return{
    isValidate:true,
    message:""
  }
}
/**
 * validation end
 */
$('#grp-register').click(function(){
  event.preventDefault();
  /**
   * registration validation:
   */
    let validation=validateRegistration();
    if (validation. isValidate){
    let form  = $('#grp-register-form').serialize();
     $.ajax({
        url: "http://localhost:3000/api/user",
        method: "POST",
        data: form
      }).done(function(response) {
        $.confirm({
            title: 'Sucess',
            content: 'You have successfully signedup.',
            confirm: function () {
              debugger
                window.location="/login"
            },
            cancel: function () {
                $.alert('Canceled!');
            },
        });
        
        
      })
      .fail(function(err) {
        alert( "error" );
      })
    }else{
      $.confirm({
        title:'Error',
        content:validation.message
      })
    }
      
});


//validation function :///////////////////////////////////

