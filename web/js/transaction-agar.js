$(document).ready(function(){
        islogged();

        $('body').on('click', '.deleteTransactionAgar',function(){
              var id = $(this).attr('data-id');
              $("#dID").val(id);
        });
        $('#deleteYes').click(function(){
          var dId= $("#dID").val();
            deleteTransactionAgar(dId);
        });

});

function openTransactionLandAddEditPage(){
    window.location='./transactionLandAddEdit.html';
}

function openTransactionChitAddEditPage(){
    window.location='./transactionChitAddEdit.html';
}

function openTransactionAgarAddEditpage(){
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
    if(currentPath == "transaction/transactionAgarView.html"){
        getBookingAgars();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getTransactionAgarsByID(params.id);  
        }else{
            window.location.href=host_url+'transaction/transactionAgarView.html';
        }
    }
}
function init_details(){
    var currentPath = getCurrentPath();
    if(currentPath == "transaction/transactionAgarView.html"){
        getBookingAgars();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getBookingDetails(params.id);  
        }else{
            window.location.href=host_url+'transaction/transactionAgarView.html';
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
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].booking_no+"</td><td>"+list[i].name+"</td><td>"+list[i].no_tree+"</td><td>"+list[i].tree_amount+"</td><td>"+list[i].tot_amount+"</td><td>"+list[i].paid_months+"</td><td>"+list[i].paid_amount+"</td><td> <a href=./transactionAgarDetails.html?id="+list[i].id+"  class='btn btn-outline-success'><i class='fa fa-eye ' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}

function buildDetailsTable(list,count){

    for(var i=0;i<count;i++){
        $(".booking_no").html(list[i].booking_no);
        $(".customer_name").html(list[i].name);
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].inst_month+"</td><td>"+list[i].inst_amount+"</td><td>"+list[i].date+"</td><td><b>"+(list[i].status == "PAID" ? "<span style='color:green'>"+list[i].status+"</span>" : "<span style='color:#ee7f2e'>"+list[i].status+"</span>")+"</b></td><td> <a href='./button' class='btn btn-outline-danger deleteTransactionLand'  data-toggle='modal' data-target='#myModal'  data-id='"+list[i].inst_id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}

function getBookingAgars(){
    var auth = getLocal("auth");
    $.ajax({
      type: "GET",
      url: api_url+"/api/getBookings/agar",
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
function getTransactionAgars(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getTransaction/agar",
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
        url: api_url+"/api/getBookingDetails/agar/"+id,
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
                      alert("No Agar Booking Found");
                      window.location.href=host_url+'transaction/transactionAgarView.html';
                  }
                  
             }
          }
      });
}
function getTransactionAgarsByID(id){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getTransaction/agar/"+id,
          //headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                        fillEditAgarDetail(data.data[0]);
                    }else{
                        alert("No Agar Fund Booking Found");
                        window.location.href=host_url+'transaction/transactionAgarView.html';
                    }
                    
               }
            }
        });
}
function fillEditAgarDetail(data){
  
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
function saveAgarDetail(){
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

      if(balance_amount == 0){ 
          alert("Balance amount is 0 to pay");
          return false;
      }
      var data = {  
                   "type_id":type_id,
                    "login_id":login_id,
                    "inst_month":installmentMonths,
                    "inst_amount":installmentAmount,
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/addTransaction/agar",
          //headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'transaction/transactionAgarView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}


function editAgarDetail(){
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
          url: api_url+"/api/editTransaction/agar/"+id,
          //headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'transaction/transactionAgarView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}

function deleteTransactionAgar(id){
        var data = {
                    
                  }
        var auth = getLocal("auth");
        $(".loader").show();
        $.ajax({
          type: "POST",
          url: api_url+"/api/deleteTransaction/agar/"+id,
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
  $("#inst_amount").val(data.tree_amount);
  $("#totalAmount").val(data.tot_amount);

  $("#balance_amount").val(data.balance_amount);

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
          url: api_url+"/api/getBookings/agar",
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
                        alert("No Bookings Found");
                        window.location.href=host_url+'transaction/transactionAgarView.html';
                    }
                    
               }
            }
        });
}

function loadBookingById(id){
    var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getBookings/agar/"+id,
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
                        window.location.href=host_url+'transaction/transactionAgarView.html';
                    }
                    
               }
            }
        });
}
