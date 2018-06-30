$(document).ready(function(){
    islogged();

    $('body').on('click', '.deleteland',function(){
          var id = $(this).attr('data-id');
          var name = $(this).attr('data-name');
          $("#dID").val(id);
          $("#modelName").html(name);
    });
    $('#deleteYes').click(function(){
      var dId= $("#dID").val();
        deleteCustomerLand(dId);
    });

    
$('#site_name').on('change', function() {
    var idd = $(this).val();
    getLandsByID(idd);
});


});

init();

function openCustomerLandAddEditPage(){
    window.location='../customerLand/customerLandAddEdit.html';
}

function openCustomerLandPage(){
window.location='../customerLand/customerLandView.html';
}

function openCustomerAgarWoodPage(){
    window.location='../customerAgar/customerAgarView.html';
}

function openCustomerChitfundsPage(){
    window.location='../customerChitFunds/customerChitFundView.html';
}

function cancelLandDetail(){
    window.location='../customerLand/customerLandView.html';
}

function init(){
var currentPath = getCurrentPath();
//alert(currentPath);
//getLands(); 



if(currentPath == "customer/customerLand/customerLandAddEdit.html"){
    getLands();  
}else if(currentPath == "customer/customerLand/customerLandView.html"){
    getCustomerLands();
}else{
    var params = getParams(window.location.href);
    if(typeof params.id != "undefined" && params.id !="" && params.id != null){
        getLands();
         getCustomerLandsByID(params.id);
        
    }else{
        window.location.href=host_url+'customer/customerLand/customerLandView.html';
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
    var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].name+"</td><td>"+list[i].mobile+"</td><td>"+list[i].email_id+"</td><td>"+list[i].tot_amount+"</td><td> <a href=../customerLand/customerLandEdit.html?id="+list[i].id+"  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a><a href='./button' class='btn btn-outline-danger deleteland'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].name+"' data-id='"+list[i].id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
    $("table tbody").append(markup);
}

}


function getLands(){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/lands",
      headers: { "auth":auth},
      dataType:"JSON",
      cache: false,
      success: function(msg, textStatus, xhr) {
           var status = msg.STATUS;
           var data = msg.RESPONSE;
           if(status == "OK"){
                if(data.count >0){
                    var list = data.data;     
                    
                    $.each(list, function (i, item) {
                        $('#site_name').append($('<option>', { 
                            value: item.site_id,
                            text : item.site_name 
                        }));
                    });
                }
           }
        }
    });
}
function getCustomerLandsByID(id){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/customerLands/"+id,
      headers: { "auth":auth},
      dataType:"JSON",
      cache: false,
      success: function(msg, textStatus, xhr) {
           var status = msg.STATUS;
           var data = msg.RESPONSE;
           if(status == "OK"){
                if(data.count > 0){
                    setTimeout(function(){
                        fillEditLandDetail(data.data[0]);
                      }, 500);                    
                }else{
                   // alert("No data Found");
                    window.location.href=host_url+'land/landView.html';
                }
                
           }
        }
    });
}
function fillEditLandDetail(data){

  $("#booking_no").val(data.booking_no);
  $("#name").val(data.name);
  $("#mobile").val(data.mobile);
  $("#email_id").val(data.email_id);
  $("#address").val(data.address);
  
 // $('select[name="site_name"] option[value="'+data.site_id+'"]').attr('selected', 'selected');
  $("#site_name").val(data.site_id);
  $("#survey_no").val(data.survey_no);
  $("#area").val(data.area);
  $("#city").val(data.city);
  $("#installment_month").val(data.inst_month);
  $("#installment_amount").val(data.inst_amount);
  $("#total_amount").val(data.tot_amount);

  $("#id").val(data.id);
  $("#login_id").val(data.login_id);

  
}

function getCustomerLands(){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/customerLands",
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


function saveLandDetail(){
  var surveyNo = $("#survey_no").val();
  var area = $("#area").val();
  var city = $("#city").val();
  var installmentMonths = $("#installment_month").val();
  var installmentAmount = $("#installment_amount").val();
  var mobile = $("#mobile").val();
  var name = $("#name").val();
  var booking_no = $("#booking_no").val();
  var site_name = $("#site_name").val();
  var address = $("#address").val();
  var email_id = $("#email_id").val();
  
  var data = {
                "booking_no":booking_no,
                "user_mobile":mobile,
                "email_id":email_id,
                "name":name,
                "mobile":mobile,
                "address":address,
                "site_id":site_name,                
                "inst_month":installmentMonths,
                "inst_amount":installmentAmount,
                "tot_amount":installmentMonths*installmentAmount
              };


  var auth = getLocal("auth");

    $.ajax({
        type: "POST",
        url: api_url+"/api/registerCustomer/land",
        headers: { "auth":auth},
        dataType:"JSON",
        data:data,
        cache: false,
        success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'customer/customerLand/customerLandView.html';
            }else{
                alert(msg.RESPONSE);
            }
            
            }
        });

return false;  
}





function editLandDetail(){
      var installmentMonths = $("#installment_month").val();
    var installmentAmount = $("#installment_amount").val();
    var mobile = $("#mobile").val();
    var name = $("#name").val();
    var booking_no = $("#booking_no").val();
    var site_name = $("#site_name").val();
    var address = $("#address").val();

    var id = $("#id").val();
    var login_id = $("#login_id").val();
    
    
    var data = {
                  "booking_no":booking_no,                 
                  "name":name,
                  "address":address,
                  "site_id":site_name,                 
                  "inst_month":installmentMonths,
                  "inst_amount":installmentAmount,
                  "tot_amount":installmentMonths*installmentAmount,
                  "login_id":login_id
                };

                console.log(data);

  var auth = getLocal("auth");
 $.ajax({
      type: "POST",
      url: api_url+"/api/editCustomerLand/"+id,
      headers: { "auth":auth},
      dataType:"JSON",
      data:data,
      cache: false,
      success: function(msg, textStatus, xhr) {

        if(msg.STATUS == "OK"){
            window.location.href=host_url+'customer/customerLand/customerLandView.html';
        }else{
            alert(msg.RESPONSE);
        }
           
        }
    });

return false;  
}


function getLandsByID(id){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/lands/"+id,
         headers: { "auth":auth},
         dataType:"JSON",
         cache: false,
         success: function(msg, textStatus, xhr) {
              var status = msg.STATUS;
              var data = msg.RESPONSE;
              if(status == "OK"){
                   if(data.count > 0){
                      // fillEditLandDetail(data.data[0]);
                       var landData = data.data[0];
                       $('#survey_no').val(landData.survey_no);
                       $('#area').val(landData.area);
                       $('#city').val(landData.city); 
                       $('#installment_month').val(landData.inst_month); 
                       $('#installment_amount').val(landData.inst_amount); 
                       $('#total_amount').val(landData.total_amount);                      
                       
                   }else{
                       alert("No data Found");
                       //window.location.href=host_url+'land/landView.html';
                   }
                   
              }
           }
       });
}

function deleteCustomerLand(id){
    var data = {
                
              }
    var auth = getLocal("auth");
    $(".loader").show();
$.ajax({
      type: "POST",
      url: api_url+"/api/deleteCustomerLand/"+id,
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
        $('#myModal').modal('close');
          
        }
    });
}
