

function openEmployeeAddPage(){
    window.location='./employeeAddEdit.html';
}
function cancel_employee(){
    window.location='./employeeView.html';
}
$(document).ready(function(){
    //islogged();

  
    $('body').on('click', '.deleteemployee',function(){

          var id = $(this).attr('data-id');
          var name = $(this).attr('data-name');
          $("#empId").val(id);
          $("#modelName").html(name);

    });

    $('#deleteYes').click(function(){
      var empId= $("#empId").val();
        deleteEmployee(empId);
    });

   AddFormValidation();


    init();
    // loadDataTable();

});

function AddFormValidation(){


    $("#EmployerAddForm").validate({
        rules: {
         //   employeeId: "required",
            name: "required",
            gender: "required",
            dob: "required",
            mobile: "required",
            email: "required",
            address: "required",
            city: "required",
            state: "required",
            country: "required",
            education: "required",
            maritalStatus: "required",
            idProof: "required",
            city: "required",
            state: "required"
        },
        messages: {
     //       employeeId: "Please Enter Employee ID Field",
            name: "Please Enter Name Field",
            gender: "Please Enter Gender Field",
            dob: "Please Enter DOB Field",
            mobile: "Please Enter Mobile Field",
            email: "Please Enter Email Field",
            address: "Please Enter Address Field",
            city: "Please Enter City Field",
            state: "Please Enter State Field",
            country: "Please Enter Country Field",
            education: "Please Enter Education Field",
            maritalStatus: "Please Enter Marital status Field",
            idProof: "Please Enter ID Proof Field",
            city: "Please Enter City Field",
            state: "Please Enter State Field"
        }
    });
    
    }

function openEmployeeAddPage(){
window.location='./employeeAddEdit.html';
}

function openEmployeeUpdatePage(){
window.location='./employeeAddEdit.html';
}

function init(){
var currentPath = getCurrentPath();
// alert(currentPath);
// alert(host_url);
if(currentPath == "employee/employeeView.html"){
    getEmployees();  
}else if(currentPath == "employee/employeeEdit.html"){
    var params = getParams(window.location.href);
    if(typeof params.id != "undefined" && params.id !="" && params.id != null){
        getEmployeeByID(params.id);  
    }else{
        window.location.href=host_url+'employee/employeeView.html';
    }
}



}
function getEmployeeEdit(){
    var auth = getLocal("auth");
    $.ajax({
         type: "GET",
         url: api_url+"/api/employees",
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


function loadDataTable(){
var table = $('#myTable').DataTable({
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
 });
// #myInput is a <input type="text"> element
$('#myInput').on( 'keyup', function () {
    table.search( this.value ).draw();
});
}



function back(){

                        window.location.href=host_url+'employee/employeeView.html';

   
    }
    




function buildTable(list,count){

for(var i=0;i<count;i++){
    var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].emp_pin+"</td><td>"+list[i].name+"</td><td>"+list[i].mobile+"</td><td>"+list[i].email+"</td><td>"+list[i].city+"</td><td> <a href=./employeeEdit.html?id="+list[i].emp_id+"  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a><a href='./button' class='btn btn-outline-danger deleteemployee'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].name+"' data-id='"+list[i].emp_id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
    $("table tbody").append(markup);
}

}
function getEmployees(){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/employees",
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
function getEmployeeByID(id){
 var auth = getLocal("auth");
 $.ajax({
      type: "GET",
      url: api_url+"/api/employees/"+id,
      headers: { "auth":auth},
      dataType:"JSON",
      cache: false,
      success: function(msg, textStatus, xhr) {
           var status = msg.STATUS;
           var data = msg.RESPONSE;
           if(status == "OK"){
                if(data.count > 0){
                    var empData = data.data[0];
                    $('#emp_id').val(empData.emp_id);
                    $('#employeeId').val(empData.emp_pin);
                    $('#name').val(empData.name);
                    $('#gender').val(empData.gender); 
                    $('#dob').val(empData.dob);
                    $('#mobile').val(empData.mobile);
                    $('#email').val(empData.email); 
                    $('#address').val(empData.address);
                    $('#city').val(empData.city);
                    $('#state').val(empData.state); 
                    $('#country').val(empData.country);
                    $('#education').val(empData.education);
                    $('#maritalStatus').val(empData.maritial_status);
                    $('#idProof').val(empData.id_proof);

                }else{
                    alert("No data Found");
                    window.location.href=host_url+'employee/employeeView.html';
                }
                
           }
        }
    });
}
function fillEditEmployeeDetail(data){

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
function saveEmployeeDetail(){
      if($("#EmployerAddForm").valid()){

    var employeeId = $("#employeeId").val();
    var name = $("#name").val();
  var gender = $("#gender").val();
  var dob = $("#dob").val();
  var mobile = $("#mobile").val();
  var email = $("#email").val();
  var address = $("#address").val();
  var city = $("#city").val();
  var state = $("#state").val();
  var country = $("#country").val();
  var education = $("#education").val();
  var maritalStatus = $("#maritalStatus").val();
  var idProof = $("#idProof").val();

  var data = {
                "employeeId":employeeId,
                "name":name,
                "gender":gender,
                "dob":dob,
                "mobile":mobile,
                "email":email,
                "address":address,
                "city":city,
                "state":state,
                "country":country,
                "education":education,
                "maritalStatus":maritalStatus,
                "idProof":idProof
              }
  var auth = getLocal("auth");
  console.log(data);
 $.ajax({
      type: "POST",
      url: api_url+"/api/addemployee",
      headers: { "auth":auth},
      dataType:"JSON",
      data:data,
      cache: false,
      success: function(msg, textStatus, xhr) {
        if(msg.STATUS == "OK"){
            window.location.href=host_url+'employee/employeeView.html';
        }else{
            alert(msg.RESPONSE);
        }
           
        }
    });
}

return false;  
}


function editEmployeeDetail(){
   if($("#EmployerAddForm").valid()){
    var emp_id = $("#emp_id").val();
    var employeeId = $("#employeeId").val();
    var name = $("#name").val();
  var gender = $("#gender").val();
  var dob = $("#dob").val();
  var mobile = $("#mobile").val();
  var email = $("#email").val();
  var address = $("#address").val();
  var city = $("#city").val();
  var state = $("#state").val();
  var country = $("#country").val();
  var education = $("#education").val();
  var maritalStatus = $("#maritalStatus").val();
  var idProof = $("#idProof").val();

  var data = {
                "employeeId":employeeId,
                "name":name,
                "gender":gender,
                "dob":dob,
                "mobile":mobile,
                "email":email,
                "address":address,
                "city":city,
                "state":state,
                "country":country,
                "education":education,
                "maritalStatus":maritalStatus,
                "idProof":idProof
              }
  var auth = getLocal("auth");
 $.ajax({
     
      type: "POST",
      url: api_url+"/api/editEmployee/"+emp_id,
      headers: { "auth":auth},
      dataType:"JSON",
      data:data,
      cache: false,
      success: function(msg, textStatus, xhr) {
        if(msg.STATUS == "OK"){
            window.location.href=host_url+'employee/employeeView.html';
        }else{
            alert(msg.RESPONSE);
        }
           
        }
    
    });
    }
return false;  
}

function deleteEmployee(id){
    var data = {
                
              }
    var auth = getLocal("auth");
    $(".loader").show();
$.ajax({
      type: "POST",
      url: api_url+"/api/deleteEmployee/"+id,
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
