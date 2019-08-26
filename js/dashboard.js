let userInfo = getUserInfo();
let toalTranscationAmount = 0;
/**
 * Total transction Lend
 */
$.ajax({
url:"http://localhost:3000/api/money/transction-total",
method:"POST",
headers: {"Authorization": 'bearer '+ localStorage.getItem('token')},
data:{
    create_user_id:userInfo.id,
    conformation:true
}

}).done(function(response){
    let totalAmount = 0;
    response.map(function(res){
        totalAmount += parseInt(res.amount)
    })
    $(`#grp-total-lend`).text('Rs '+totalAmount);
    toalTranscationAmount = toalTranscationAmount+totalAmount;
    $(`#grp-total-trans`).text('Rs '+toalTranscationAmount);
}).fail(function(err){
alert(err.responseText)
})


/**
 * Total transction borrow
 */
$.ajax({
    url:"http://localhost:3000/api/money/transction-total",
    method:"POST",
    headers: {"Authorization": 'bearer '+ localStorage.getItem('token')},
    data:{
        taker_user_id:userInfo.id,
        conformation:true
    }
    
    }).done(function(response){
        let totalAmount = 0;
        response.map(function(res){
            totalAmount += parseInt(res.amount)
        })
        $(`#grp-total-borrow`).text('Rs '+totalAmount);
        toalTranscationAmount = toalTranscationAmount+totalAmount;
    $(`#grp-total-trans`).text('Rs '+toalTranscationAmount);

    }).fail(function(err){
    alert(err.responseText)
    })


    
/**
 * Total transction borrow request */
$.ajax({
    url:"http://localhost:3000/api/money/transction-total",
    method:"POST",
    headers: {"Authorization": 'bearer '+ localStorage.getItem('token')},
    data:{
        taker_user_id:userInfo.id,
        conformation:false
    }
    
    }).done(function(response){
        $(`#grp-total-request`).text(response.length);
    }).fail(function(err){
    alert(err.responseText)
    })