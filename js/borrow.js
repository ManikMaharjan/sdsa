let userInfo = getUserInfo();
$.ajax({
    url:"http://localhost:3000/api/money/taker/"+ userInfo.id,
    method:"GET",
    headers: {"Authorization": 'bearer '+ localStorage.getItem('token')}
}).done(function(response){
    let table = ""
    response.map(function(res,index){
        table += '<tr><td>'+ res.create_user_id.fullname +'</td>';
        table += '<td>'+ res.create_user_id.address +'</td>';
        table += '<td>'+ res.create_user_id.phone_number +'</td>';
        table += '<td>'+ res.amount +'</td>';
        table += '<td>'+ res.date +'</td>';
        if(res.conformation){
            table += `<td>
                        <a href="#" class="btn btn-success btn-circle btn-sm">
                        <i class="fas fa-check"></i>
                        </a>
                        </td>
                        </tr>`
        }else{
            table +=`<td>
            <a id=${'grp-'+index} data-id=${res._id} onClick="confirm22(this)" class="btn btn-google btn-block">Confrim</a>
            </td></tr>`
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
            conformation:true
        }
    }).done(function(res){
        window.location.reload();
    }).fail(function(err){
debugger
    })
}