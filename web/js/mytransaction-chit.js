$(document).ready(function(){
        islogged();


});



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
    if(currentPath == "myTransaction/transactionChitView.html"){
        getBookingChits();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getTransactionChitsByID(params.id);  
        }else{
            window.location.href=host_url+'myTransaction/transactionChitView.html';
        }
    }
}
function init_details(){
    var currentPath = getCurrentPath();
    if(currentPath == "myTransaction/transactionChitView.html"){
        getBookingChits();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getBookingDetails(params.id);  
        }else{
            window.location.href=host_url+'myTransaction/transactionChitView.html';
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
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].booking_no+"</td><td>"+list[i].name+"</td><td>"+list[i].mobile+"</td><td>"+list[i].email_id+"</td><td>"+list[i].fund_type+"</td><td>"+list[i].inst_month+"</td><td>"+list[i].tot_amount+"</td><td>"+list[i].paid_months+"</td><td>"+list[i].paid_amount+"</td><td> <a href=./transactionChitDetails.html?id="+list[i].id+"  class='btn btn-outline-success'><i class='fa fa-eye ' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}

function buildDetailsTable(list,count){

    for(var i=0;i<count;i++){
        $(".booking_no").html(list[i].booking_no);
        $(".customer_name").html(list[i].name);
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].inst_month+"</td><td>"+list[i].inst_amount+"</td><td>"+list[i].date+"</td><td><b>"+(list[i].status == "PAID" ? "<span style='color:green'>"+list[i].status+"</span>" : "<span style='color:#ee7f2e'>"+list[i].status+"</span>")+"</b></td></tr>";
        $("table tbody").append(markup);
    }
    
}

function getBookingChits(){
    var auth = getLocal("auth");
    $.ajax({
      type: "GET",
      url: api_url+"/api/getBookings/chit",
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
function getTransactionChits(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getTransaction/chit",
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
        url: api_url+"/api/getBookingDetails/chit/"+id,
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
                      alert("No Chit Booking Found");
                      window.location.href=host_url+'myTransaction/transactionChitView.html';
                  }
                  
             }
          }
      });
}
function getTransactionChitsByID(id){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getTransaction/chit/"+id,
          //headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                        fillEditChitDetail(data.data[0]);
                    }else{
                        alert("No Chit Fund Booking Found");
                        window.location.href=host_url+'myTransaction/transactionChitView.html';
                    }
                    
               }
            }
        });
}
function fillEditChitDetail(data){
  
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

}
function load_booking(){
    var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getBookings/chit",
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
                        window.location.href=host_url+'myTransaction/transactionChitView.html';
                    }
                    
               }
            }
        });
}

function loadBookingById(id){
    var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/getBookings/chit/"+id,
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
                        window.location.href=host_url+'myTransaction/transactionChitView.html';
                    }
                    
               }
            }
        });
}
