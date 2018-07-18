$(document).ready(function(){
        islogged();

        $('body').on('click', '.deletechitFund',function(){
              var id = $(this).attr('data-id');
              var name = $(this).attr('data-name');
              $("#dID").val(id);
              $("#modelName").html(name);
        });
        $('#deleteYes').click(function(){
          var dId= $("#dID").val();
            deletechitFund(dId);
        });

});

function init(){
    var currentPath = getCurrentPath();
    if(currentPath == "chitFund/chitFundView.html"){
        getchitFunds();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getchitFundsById(params.id);  
        }else{
            window.location.href=host_url+'chitFund/chitFundView.html';
        }
    }

}
function openChitFundAddPage(){
    window.location='./chitFundAddEdit.html';
}
function loadDataTable(){
    var table = $('#myTable').DataTable({
       "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    });
     
    // #myInput is a <input type="text"> element
    $('#myInput').on( 'keyup', function () {
        table.search( this.value ).draw();
    });
}

function buildTable(list,count){
    for(var i=0;i<count;i++){
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].fund_type+"</td><td>"+list[i].inst_month+"</td><td>"+list[i].inst_amount+"</td><td>"+list[i].total_amount+"</td><td> <a href=./chitFundEdit.html?id="+list[i].chit_id+"  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a><a href='./button' class='btn btn-outline-danger deletechitFund'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].fund_type+"' data-id='"+list[i].chit_id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}
function getchitFunds(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/chits",
          headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count >0){
                        var list = data.data;
                        buildTable(list,data.count);
                        loadDataTable();
                    }
               }
            }
        });
}
function getchitFundsById(id){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/chits/"+id,
          headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                        fillEditChitDetail(data.data[0]);
                    }else{
                        alert("No data Found");
                        window.location.href=host_url+'chitFund/chitFundView.html';
                    }
                    
               }
            }
        });
}
function fillEditChitDetail(data){
      $("#chit_id").val(data.chit_id);
      $("#siteNameLabel").html(data.fund_type);
      $("#fundType").val(data.fund_type);
      $("#installmentMonths").val(data.inst_month);
      $("#installmentAmount").val(data.inst_amount);
      $("#totalAmount").val(data.total_amount);
      
}


function editchitFundDetail(){
      var chitid=$("#chit_id").val();
      var fundType = $("#fundType").val();
      var installmentMonths = $("#installmentMonths").val();
      var installmentAmount = $("#installmentAmount").val();
      var data = {

                    "fund_type":fundType,
                    "inst_month":installmentMonths,
                    "inst_amount":installmentAmount,
                    "total_amount":installmentMonths*installmentAmount
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/editChit/"+chitid,
          headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
                if(msg.STATUS == "OK"){
                    window.location.href=host_url+'chitFund/chitFundView.html';
                }else{
                    alert(msg.RESPONSE);
                }
               
            }
        });

    return false;  
}

function savechitFundDetail(){
        var fundType = $("#fundType").val();
      var installmentMonths = $("#installmentMonths").val();
      var installmentAmount = $("#installmentAmount").val();
      var data = {

                    "fund_type":fundType,
                    "inst_month":installmentMonths,
                    "inst_amount":installmentAmount,
                    "total_amount":installmentMonths*installmentAmount
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/addChit",
          headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
                if(msg.STATUS == "OK"){
                    window.location.href=host_url+'chitFund/chitFundView.html';
                }else{
                    alert(msg.RESPONSE);
                }
               
            }
        });

    return false;  
}

function deletechitFund(id){
        var data = {
                    
                  }
        var auth = getLocal("auth");
        $(".loader").show();
    $.ajax({
          type: "POST",
          url: api_url+"/api/deleteChit/"+id,
          headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            
            if(msg.STATUS == "OK"){
                showalert("success");
            }else{
                alert(msg.RESPONSE);
            }
              
            }
        });
}
