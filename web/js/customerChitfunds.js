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

    
$('#chit_id').on('change', function() {
    var idd = $(this).val();
    getChitsByID(idd);
});

//AddFormValidation();



});

init();


function AddFormValidation(){

      

$("#customerChitFundForm").validate({
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
    
    function cancelChitFundsDetail(){
        window.location='../customerChitFunds/customerChitFundView.html';
    }
    
    

    function openCustomerChitFundAddEditPage(){
        window.location='../customerChitFunds/customerChitFundAddEdit.html';
    }


function init(){
var currentPath = getCurrentPath();
//alert(currentPath);
//getLands(); 



if(currentPath == "customer/customerChitFunds/customerChitFundAddEdit.html"){
    getChits();  
}else if(currentPath == "customer/customerChitFunds/customerChitFundView.html"){
    getCustomerChits();
}else{
    var params = getParams(window.location.href);
    if(typeof params.id != "undefined" && params.id !="" && params.id != null){
        getChits();
         getCustomerChitsByID(params.id);
        
    }else{
      //  window.location.href=host_url+'customer/customerChitFunds/customerChitFundView.html';
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
    var auth = getLocal("auth");
    var userType = getLocal("u");
        
    for(var i=0;i<count;i++){
        var delete_btn = "";
        if(userType == 1){
            var delete_btn = "<a href='./button' class='btn btn-outline-danger master deleteland'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].name+"' data-id='"+list[i].id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a>";  
        }
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].name+"</td><td>"+list[i].mobile+"</td><td>"+list[i].email_id+"</td><td>"+list[i].fund_type+"</td><td>"+list[i].booking_no+"</td><td>"+list[i].tot_amount+"</td><td> <a href=../customerChitFunds/customerChitFundEdit.html?id="+list[i].id+"  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>"+delete_btn+"</td></tr>";
        $("table tbody").append(markup);
    }

}


function getChits(){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/chits",
      //headers: { "auth":auth},
      dataType:"JSON",
      cache: false,
      success: function(msg, textStatus, xhr) {
           var status = msg.STATUS;
           var data = msg.RESPONSE;
           if(status == "OK"){
                if(data.count >0){
                    var list = data.data;     
                    
                    $.each(list, function (i, item) {
                        $('#chit_id').append($('<option>', { 
                            value: item.chit_id,
                            text : item.fund_type 
                        }));
                    });
                }
           }
        }
    });
}
function getCustomerChitsByID(id){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/customerChits/"+id,
      //headers: { "auth":auth},
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
                    //$("#customerChitFundForm").autofill( data.data[0] );
                    
                }else{
                   // alert("No data Found");
                    window.location.href=host_url+'customer/customerChitFunds/customerChitFundView.html';
                }
                
           }
        }
    });
}
function fillEditLandDetail(data){

  $("#booking_no").val(data.booking_no);
  $("#name").val(data.name);
  $("#user_mobile").val(data.mobile);
  $("#email_id").val(data.email_id);
  $("#address").val(data.address);
  
 // $('select[name="site_name"] option[value="'+data.site_id+'"]').attr('selected', 'selected');
   $("#chit_id").val(data.chit_id);
  $("#survey_no").val(data.survey_no);
  $("#area").val(data.area);
  $("#city").val(data.city);
  $("#inst_month").val(data.inst_month);
  $("#inst_amount").val(data.inst_amount);
  $("#tot_amount").val(data.tot_amount);

  $('#site_name').val(data.site_id);

  $("#id").val(data.id);
  $("#login_id").val(data.login_id);
  $(".booking_no").html(data.booking_no);
  $("#reference").val(data.reference);

  
}

function getCustomerChits(){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/customerChits",
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


function saveChitDetail(){
  
    var auth = getLocal("auth");

    //  if($("#customerChitFundForm").valid()){
   
      var data = $('#customerChitFundForm').serializeFormJSON();
      console.log(data);
   
    $.ajax({
        type: "POST",
        url: api_url+"/api/registerCustomer/chit",
        //headers: { "auth":auth},
        dataType:"JSON",
        data:data,
        cache: false,
        success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'customer/customerChitFunds/customerChitFundView.html';
            }else{
                alert(msg.RESPONSE);
            }
            
            }
        });
  //  }

return false;  
}





function editChitDetail(){
    
//  if($("#customerChitFundForm").valid()){
   
    var data = $('#customerChitFundForm').serializeFormJSON();
    console.log(data);
    var id = $('#id').val();
  var auth = getLocal("auth");
 $.ajax({
      type: "POST",
      url: api_url+"/api/editCustomerChit/"+id,
      //headers: { "auth":auth},
      dataType:"JSON",
      data:data,
      cache: false,
      success: function(msg, textStatus, xhr) {

        if(msg.STATUS == "OK"){
            window.location.href=host_url+'customer/customerChitFunds/customerChitFundView.html';
        }else{
            alert(msg.RESPONSE);
        }
           
        }
    });
//}

return false;  
}


function getChitsByID(id){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/chits/"+id,
         //headers: { "auth":auth},
         dataType:"JSON",
         cache: false,
         success: function(msg, textStatus, xhr) {
              var status = msg.STATUS;
              var data = msg.RESPONSE;
              if(status == "OK"){
                   if(data.count > 0){
                      // fillEditLandDetail(data.data[0]);
                       var chitData = data.data[0];
                       $('#inst_month').val(chitData.inst_month);
                       $('#inst_amount').val(chitData.inst_amount);
                       $('#tot_amount').val(chitData.inst_month*chitData.inst_amount); 
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
      url: api_url+"/api/deleteCustomerChit/"+id,
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
