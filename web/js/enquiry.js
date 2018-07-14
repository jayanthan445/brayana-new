$(document).ready(function(){
        islogged();

        $('body').on('click', '.deleteenquiry',function(){
              var id = $(this).attr('data-id');
              var name = $(this).attr('data-name');
              $("#dID").val(id);
              $("#modelName").html(name);
        });
        $('#deleteYes').click(function(){
          var dId= $("#dID").val();
            deleteenquiry(dId);
        });

});

function openenquiryAddPage(){
    window.location='./enquiryForm.html';
}

function openenquiryUpdatePage(){
    window.location='./enquiryForm.html';
}

function init(){
    var currentPath = getCurrentPath();
    if(currentPath == "enquiry/enquiryView.html"){
        getenquiry();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getenquiryByID(params.id);  
        }else{
            window.location.href=host_url+'enquiry/enquiryView.html';
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
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].type+"</td><td>"+list[i].name+"</td><td>"+list[i].mobile+"</td><td>"+list[i].email+"</td><td>"+list[i].desc+"</td><td><a href='./button' class='btn btn-outline-danger deleteenquiry'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].name+"' data-id='"+list[i].id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}
function getenquiry(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/enquiry",
          ////headers: { "auth":auth},
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
function getenquiryByID(id){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/enquiry/"+id,
          ////headers: { "auth":auth},
          dataType:"JSON",
          cache: false,
          success: function(msg, textStatus, xhr) {
               var status = msg.STATUS;
               var data = msg.RESPONSE;
               if(status == "OK"){
                    if(data.count > 0){
                        fillEditenquiryDetail(data.data[0]);
                    }else{
                        alert("No data Found");
                        window.location.href=host_url+'enquiry/enquiryView.html';
                    }
                    
               }
            }
        });
}
function fillEditenquiryDetail(data){
  
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
function saveenquiryDetail(){
      var type = $("#type").val();
      var name = $("#name").val();
      var mobile = $("#mobile").val();
      var email = $("#email").val();
      var desc = $("#desc").val();
$(".loader").show(); 
                        
      var data = {
                    "type":type,
                    "desc":desc,
                    "name":name,
                    "mobile":mobile,
                    "email":email,
                    
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/addenquiry",
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
               window.location.href=host_url+'enquiry/enquiryView.html';
            //$(".loader").hide(); 
            //alert("Enquiry Form Submited Successfully");
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}

/*
function editenquiryDetail(){
      var site_id = $("#site_id").val();
      var siteName = $("#siteName").val();
      var surveyNo = $("#surveyNo").val();
      var area = $("#area").val();
      var city = $("#city").val();
      var installmentMonths = $("#installmentMonths").val();
      var installmentAmount = $("#installmentAmount").val();
      var desc = $("desc").text();
      var data = {
                    "site_name":siteName,
                    "desc":desc,
                    "survey_no":surveyNo,
                    "city":city,
                    "area":area,
                    "inst_month":installmentMonths,
                    "inst_amount":installmentAmount,
                    "Total_amount":installmentMonths*installmentAmount
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/editenquiry/"+site_id,
          ////headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'enquiry/enquiryView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}
*/
function deleteenquiry(id){
        var data = {
                    
                  }
        var auth = getLocal("auth");
        $(".loader").show();
    $.ajax({
          type: "POST",
          url: api_url+"/api/deleteenquiry/"+id,
          ////headers: { "auth":auth},
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
