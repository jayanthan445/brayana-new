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
        deleteCustomerAgar(dId);
    });

    
$('#site_name').on('change', function() {
    var idd = $(this).val();
    getAgarsByID(idd);
});

$('.numbersOnly').keyup(function () {  
    this.value = this.value.replace(/[^0-9\.]/g,''); 
});


$('#inst_month,#inst_amount').on('keyup', function(){ 

    var mon = $('#inst_month').val();
    var amt = $('#inst_amount').val();
 
    $('#tot_amount').val(amt*mon);
});
//AddFormValidation();

init();



});




function AddFormValidation(){

      

$("#customerAgarForm").validate({
    rules: {
        fb_no: "required",
        name: "required",
        mobile: "required"
    },
    messages: {
        fb_no: "Please enter your fb_no",       
    }
});

}


function openCustomerLandPage(){
    window.location='../customerLand/customerLandView.html';
    }
    
    function openCustomerAgarWoodPage(){
        window.location='../customerAgar/customerAgarView.html';
    }
    
    function openCustomerChitFundPage(){
        window.location='../customerChitFunds/customerChitFundView.html';
    }
    
    function cancelLandDetail(){
        window.location='../customerLand/customerLandView.html';
    }

    function openCustomerAgarAddEditPage(){
        window.location='../customerAgar/customerAgarAddEdit.html';
    }

    function cancelAgarDetail(){
        window.location='../customerAgar/customerAgarView.html';
    }

    



function init(){
var currentPath = getCurrentPath();
//alert(currentPath);
//getLands(); 



if(currentPath == "customer/customerAgar/customerAgarAddEdit.html"){
    getAgars();  
}else if(currentPath == "customer/customerAgar/customerAgarView.html"){
    getCustomerAgars();
}else{
    var params = getParams(window.location.href);
    if(typeof params.id != "undefined" && params.id !="" && params.id != null){
        
        loadAfter(params.id);
    }else{
      //  window.location.href=host_url+'customer/customerAgar/customerAgarView.html';
    }
}

}
function loadAfter(id){
  getAgars(id);
 // getCustomerAgarsByID(id);
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
    var auth = getLocal("auth");
    var userType = getLocal("u");
        
    for(var i=0;i<count;i++){
        var delete_btn = "";
        if(userType == 1){
            var delete_btn = "<a href='./button' class='btn btn-outline-danger master deleteland'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].name+"' data-id='"+list[i].id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a>";  
        }
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].name+"</td><td>"+list[i].mobile+"</td><td>"+list[i].email_id+"</td><td>"+list[i].booking_no+"</td><td>"+list[i].site_name+"</td><td>"+list[i].inst_month+"</td><td>"+list[i].tot_amount+"</td><td> <a href=../customerAgar/customerAgarEdit.html?id="+list[i].id+"  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>"+delete_btn+"</td></tr>";
        $("table tbody").append(markup);
    }

}


function getAgars(id){
 var auth = getLocal("auth");

 $.ajax({
      type: "GET",
      url: api_url+"/api/agars",
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
                if(id != ""){
                    getCustomerAgarsByID(id);
                }
           }
        }
    });
}
function getCustomerAgarsByID(id){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/customerAgars/"+id,
      headers: { "auth":auth},
      dataType:"JSON",
      cache: false,
      success: function(msg, textStatus, xhr) {
           var status = msg.STATUS;
           var data = msg.RESPONSE;
           if(status == "OK"){
                if(data.count > 0){

                    //$("#customerAgarForm").autofill( data.data[0] );
                    //$('#user_mobile').val(data.data[0].mobile);
                    
                    //$('#agar_id').val(data.data[0].agar_id);
                    
                    setTimeout(function(){
                       fillEditLandDetail(data.data[0]);  
                      }, 500);   
                }else{
                   // alert("No data Found");
                    window.location.href=host_url+'customer/customerAgar/customerAgarView.html';
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

  $(".booking_no").html(data.booking_no);
  $("#reference").val(data.reference);


  
}

function getCustomerAgars(){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/customerAgars",
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


function saveAgarDetail(){
  
    var auth = getLocal("auth");

    var surveyNo = $("#survey_no").val();
  var area = $("#area").val();
  var city = $("#city").val();
  var installmentMonths = $("#installment_month").val();
  var installmentAmount = $("#installment_amount").val();
  var mobile = $("#mobile").val();
  var name = $("#name").val();
  //var booking_no = $("#booking_no").val();
  var site_name = $("#site_name").val();
  var address = $("#address").val();
  var email_id = $("#email_id").val();
  var reference = $("#reference").val();
  
  var data = {
                //"booking_no":booking_no,
                "user_mobile":mobile,
                "email_id":email_id,
                "name":name,
                "mobile":mobile,
                "address":address,
                "site_id":site_name,                
                "inst_month":installmentMonths,
                "inst_amount":installmentAmount,
                "tot_amount":installmentMonths*installmentAmount,
                "reference":reference
              };
      
   
    $.ajax({
        type: "POST",
        url: api_url+"/api/registerCustomer/agar",
        headers: { "auth":auth},
        dataType:"JSON",
        data:data,
        cache: false,
        success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'customer/customerAgar/customerAgarView.html';
            }else{
                alert(msg.RESPONSE);
            }
            
            }
        });
  //  }

return false;  
}





function editAgarDetail(){
    
//  if($("#customerAgarForm").valid()){
   
      var installmentMonths = $("#installment_month").val();
    var installmentAmount = $("#installment_amount").val();
    var mobile = $("#mobile").val();
    var name = $("#name").val();
    var booking_no = $("#booking_no").val();
    var site_name = $("#site_name").val();
    var address = $("#address").val();

    var id = $("#id").val();
    var login_id = $("#login_id").val();
    var reference = $("#reference").val();
    
    
    var data = {
                  "booking_no":booking_no,                 
                  "name":name,
                  "address":address,
                  "site_id":site_name,                 
                  "inst_month":installmentMonths,
                  "inst_amount":installmentAmount,
                  "tot_amount":installmentMonths*installmentAmount,
                  "login_id":login_id,
                  "reference":reference
                };

  var auth = getLocal("auth");
 $.ajax({
      type: "POST",
      url: api_url+"/api/editCustomerAgar/"+id,
      headers: { "auth":auth},
      dataType:"JSON",
      data:data,
      cache: false,
      success: function(msg, textStatus, xhr) {

        if(msg.STATUS == "OK"){
            window.location.href=host_url+'customer/customerAgar/customerAgarView.html';
        }else{
            alert(msg.RESPONSE);
        }
           
        }
    });
//}

return false;  
}


function getAgarsByID(id){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/agars/"+id,
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

function deleteCustomerAgar(id){
    var data = {
                
              }
    var auth = getLocal("auth");
    $(".loader").show();
$.ajax({
      type: "POST",
      url: api_url+"/api/deleteCustomerAgar/"+id,
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
