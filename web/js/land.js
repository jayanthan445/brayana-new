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
            deleteLand(dId);
        });

});

function openLandAddPage(){
    window.location='./landAddEdit.html';
}

function openLandUpdatePage(){
    window.location='./landAddEdit.html';
}

function init(){
    var currentPath = getCurrentPath();
    if(currentPath == "land/landView.html"){
        getLands();  
    }else{
        var params = getParams(window.location.href);
        if(typeof params.id != "undefined" && params.id !="" && params.id != null){
            getLandsByID(params.id);  
        }else{
            window.location.href=host_url+'land/landView.html';
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
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].site_name+"</td><td>"+list[i].survey_no+"</td><td>"+list[i].area+"</td><td>"+list[i].city+"</td><td> <a href=./landEdit.html?id="+list[i].site_id+"  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a><a href='./button' class='btn btn-outline-danger deleteland'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].site_name+"' data-id='"+list[i].site_id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}
function getLands(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/lands",
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
function getLandsByID(id){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/lands/"+id,
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
                        alert("No data Found");
                        window.location.href=host_url+'land/landView.html';
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
          url: api_url+"/api/addland",
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'land/landView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}


function editLandDetail(){
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
          url: api_url+"/api/editLand/"+site_id,
          //headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
            if(msg.STATUS == "OK"){
                window.location.href=host_url+'land/landView.html';
            }else{
                alert(msg.RESPONSE);
            }
               
            }
        });

    return false;  
}

function deleteLand(id){
        var data = {
                    
                  }
        var auth = getLocal("auth");
        $(".loader").show();
    $.ajax({
          type: "POST",
          url: api_url+"/api/deleteLand/"+id,
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
