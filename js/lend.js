let userInfo = getUserInfo();
$.ajax({
    url:"http://localhost:3000/api/money/creator/"+ userInfo.id,
    method:"GET",
    headers: {"Authorization": 'bearer '+ localStorage.getItem('token')}
}).done(function(response){
    let table = ""
    response.map(function(res,index){
        table += '<tr><td>'+ res.taker_user_id.fullname +'</td>';
        table += '<td>'+ res.taker_user_id.address +'</td>';
        table += '<td>'+ res.taker_user_id.phone_number +'</td>';
        table += '<td>'+ res.amount +'</td>';
        table += '<td>'+ res.date +'</td>';
        if(res.is_transaction_complete){
            table += `<td>
                        <a href="#" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-check"></i>
                        </a>
                        Transcation Completed
                        </td>
                        </tr>`
        }else{
            if(res.conformation){

                table +=`<td>
                <a id=${'grp-'+index} data-id=${res._id} 
                onClick="confirm22(this)"class="btn btn-success btn-icon-split">
                        <span class="icon text-white-50">
                          <i class="fas fa-check"></i>
                        </span>
                        <span class="text">Complete This Transcation</span>
                      </a>
                </td></tr>`
            }else{
                table +=`<td>pending...</td></tr>`

            }
        }

    });
    table +=""
    $('#grp-table-borrow').append(table);
    /**
     * reponse will be in table 
     */
}).fail(function(err){

});

function confirm22(element) {
    let id =$(element).data().id;
    
    $.ajax({
        url:"http://localhost:3000/api/money/"+id,
        method:"PUT",
        headers: {"Authorization": 'bearer '+ localStorage.getItem('token')},
        data:{
            is_transaction_complete:true
        }
    }).done(function(res){
        window.location.reload();
    }).fail(function(err){
debugger
    })
}