$(document).ready(function(){
        islogged();

        $('body').on('click', '.deleteTransactionLand',function(){
              var id = $(this).attr('data-id');
              $("#dID").val(id);
        });
        $('#deleteYes').click(function(){
          var dId= $("#dID").val();
            deleteTransactionLand(dId);
        });

});

function openTransactionLandAddEditPage(){
    window.location='./transactionLandAddEdit.html';
}

function openTransactionChitFundAddEditPage(){
    window.location='./transactionChitFundAddEdit.html';
}

function openTransactionAgarWoodAddEditpage(){
    window.location='./transactionAgarAddEdit.html';
}


function openTransactionLandPage(){
    window.location='./transactionLandView.html';
}

function openTransactionChitFundPage(){
    window.location='./transactionChitView.html';
}

function openTransactionAgarWoodage(){
    window.location='./transactionAgarView.html';
}
function init(){
    var currentPath = getCurrentPath();
    if(currentPath == "transaction/transactionLandView.html"){
        getBookingLands();  
    }else{

            window.location.href=host_url+'transaction/transactionLandView.html';

    }
}
function init_details(){
    var currentPath = getCurrentPath();
    if(currentPath == "transaction/transactionLandView.html"){
        getBookingLands();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getBookingDetails(params.id);  
        }else{
            window.location.href=host_url+'transaction/transactionLandView.html';
        }
    }
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
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].booking_no+"</td><td>"+list[i].name+"</td><td>"+list[i].inst_month+"</td><td>"+list[i].tot_amount+"</td><td>"+list[i].paid_months+"</td><td>"+list[i].paid_amount+"</td><td> <a href=./transactionLandDetails.html?id="+list[i].id+"  class='btn btn-outline-success'><i class='fa fa-eye ' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}

function buildDetailsTable(list,count){

    for(var i=0;i<count;i++){
        $(".booking_no").html(list[i].booking_no);
        $(".customer_name").html(list[0].name);
        $(".customer_months").html(list[0].paid_months+" / "+list[0].total_months);
        $(".customer_amount").html("₹ "+list[0].paid_amount+" / ₹ "+list[0].total_amount);
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].inst_month+"</td><td> ₹ "+list[i].inst_amount+"</td><td>"+list[i].date+"</td><td><b>"+(list[i].status == "PAID" ? "<span style='color:green'>"+list[i].status+"</span>" : "<span style='color:#ee7f2e'>"+list[i].status+"</span>")+"</b></td><td>"+(list[i].status == "PAID" ? "<a href='./button' class='btn btn-outline-danger deleteTransactionLand'  data-toggle='modal' data-target='#myModal'  data-id='"+list[i].inst_id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a>":"")+"</td></tr>";
        $("table tbody").append(markup);
    }
    
}

function getBookingLands(){
    var auth = getLocal("auth");
    $.ajax({
      type: "GET",
      url: api_url+"/api/getBookings/land",
      //headers: { "auth":auth},
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
function getTransactionLands(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getTransaction/land",
          //headers: { "auth":auth},
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

function getBookingDetails(id){
    var auth = getLocal("auth");
     $.ajax({
        type: "GET",
        url: api_url+"/api/getBookingDetails/land/"+id,
        //headers: { "auth":auth},
        dataType:"JSON",
        cache: false,
        success: function(msg, textStatus, xhr) {
             var status = msg.STATUS;
             var data = msg.RESPONSE;
             if(status == "OK"){
                  if(data.count > 0){
                       var list = data.data;
                        buildDetailsTable(list,data.count);
                        loadDataTable();
                      buildDetailsTable();
                  }else{
                      alert("No Land Booking Found");
                      goBack();
                  }
                  
             }
          }
      });
}
function getTransactionLandsByID(id){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getTransaction/land/"+id,
          //headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                        fillEditLandDetail(data.data[0]);
                    }else{
                        alert("No Transaction Found");
                        window.location.href=host_url+'transaction/getTransactionLandsByID.html';
                    }
                    
               }
            }
        });
}
function fillEditLandDetail(data){
  
      $("#site_id").val(data.site_id);
      $("#siteNameLabel").html(data.site_name);
      $("#siteName").val(data.site_name);
      $("#surveyNo").val(data.survey_no);
      $("#area").val(data.area);
      $("#city").val(data.city);
      $("#installmentMonths").val(data.inst_month);
      $("#installmentAmount").val(data.inst_amount);
      $("#totalAmount").val(data.total_amount);
      
}
function saveLandDetail(){

      var login_id = $("#login_id").val();
      var type_id = $("#type_id").val();
      var installmentMonths = $("#inst_month").val();
      var installmentAmount = $("#inst_amount").val();

      var installmentMonths = $("#inst_month").val();
      var installmentAmount = $("#inst_amount").val();

      var balance_amount = $("#balance_amount").val();
      var balance_months = $("#balance_months").val();

      var paid_amount = $("#paid_amount").val();
      var paid_months = $("#paid_months").val();
      var count_inst = $("#count_inst").val();
      if(parseInt(balance_months)  == 0){ 
          alert("Balance amount is 0 to pay");
          return false;
      }

      if(parseInt(balance_months) <  parseInt(count_inst)){ 
          alert("Only "+balance_months+" balance months to pay");
          return false;
      }
      var data = {  
                   "type_id":type_id,
                    "login_id":login_id,
                    "inst_month":installmentMonths,
                    "inst_amount":installmentAmount,
                    "count_inst": count_inst
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/addTransaction/land",
          //headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'transaction/transactionLandView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}


function editLandDetail(){
      var id = $("#site_id").val();
      var login_id = $("#login_id").val();
      var type_id = $("#type_id").val();
      var installmentMonths = $("#installmentMonths").val();
      var installmentAmount = $("#installmentAmount").val();
      var data = {  
                    "type_id":type_id,
                    "login_id":login_id,
                    "inst_month":installmentMonths,
                    "inst_amount":installmentAmount,
                  }
      var auth = getLocal("auth");
      $.ajax({
          type: "POST",
          url: api_url+"/api/editTransaction/land/"+id,
          //headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'transaction/transactionLandView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}

function deleteTransactionLand(id){
        var data = {
                    
                  };
        cl(id);
        var auth = getLocal("auth");
        $(".loader").show();
        $.ajax({
          type: "POST",
          url: api_url+"/api/deleteTransaction/land/"+id,
          //headers: { "auth":auth},
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
function fillBookingSelect(data,count){
  var op = "<option value=''></option>";
  for(var i=0;i<count;i++){
    var op = op+"<option value="+data[i].id+">"+data[i].booking_no+"</option>";
   
  }
   $("#type_id").html(op);
}
function filldependency(data){
  $("#login_id").val(data.login_id);
  $("#customer_name").val(data.name);
  $("#inst_amount").val(data.inst_amount);
  $("#totalAmount").val(data.inst_month*data.inst_amount);

  $("#balance_amount").val(data.balance_amount);
  $("#balance_months").val(data.balance_months);

  $("#paid_amount").val(data.paid_amount);
  $("#paid_months").val(data.paid_months);
  $("#inst_month").val(parseInt(data.paid_months)+1);
  if(data.balance_amount == 0){ 
          alert("Balance amount is 0 to pay");
          return false;
      }

}
function load_booking(){
    var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getBookings/land",
          //headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                       fillBookingSelect(data.data,data.count);
                    }else{
                        alert("No data Found");
                        window.location.href=host_url+'transaction/transactionLandView.html';
                    }
                    
               }
            }
        });
}

function loadBookingById(id){
    var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getBookings/land/"+id,
          //headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                      
                      filldependency(data.data[0]);
                    }else{
                        alert("No data Found");
                        window.location.href=host_url+'transaction/transactionLandView.html';
                    }
                    
               }
            }
        });
}