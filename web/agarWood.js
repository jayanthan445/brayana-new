function openAgarWoodAddPage(){
    window.location='./agarWoodAddEdit.html';
}
$(document).ready(function(){
        islogged();

        $('body').on('click', '.deleteagarWood',function(){
              var id = $(this).attr('data-id');
              var name = $(this).attr('data-name');
              $("#dID").val(id);
              $("#modelName").html(name);
        });
        $('#deleteYes').click(function(){
          var dId= $("#dID").val();
            deleteagarWood(dId);
        });

});

function init(){
    getagarWoods();
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
        var markup = "<tr><td>"+(i+1)+"</td><td>"+list[i].site_name+"</td><td>"+list[i].no_tree+"</td><td>"+list[i].tree_amount+"</td><td> <a href='./agarWoodEdit.html?id='"+list[i].site_id+"'  class='btn btn-outline-success'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a><a href='./button' class='btn btn-outline-danger deleteagarWood'  data-toggle='modal' data-target='#myModal' data-name='"+list[i].site_name+"' data-id='"+list[i].site_id+"' ><i class='fa fa-trash-o' aria-hidden='true'></i></a></td></tr>";
        $("table tbody").append(markup);
    }
    
}
function getagarWoods(){
     var auth = getLocal("auth");
     $.ajax({
          type: "GET",
          url: api_url+"/api/agars",
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


function saveagarWoodDetail(){
        var siteName = $("#siteName").val();
      var noTree = $("#noTree").val();
      var treeAmount = $("#treeAmount").val();
      var data = {

                    "site_name":siteName,
                    "no_tree":noTree,
                    "tree_amount":treeAmount
                  }
      var auth = getLocal("auth");
     $.ajax({
          type: "POST",
          url: api_url+"/api/addAgar",
          //headers: { "auth":auth},
          dataType:"JSON",
          data:data,
          cache: false,
          success: function(msg, textStatus, xhr) {
                if(msg.STATUS == "OK"){
                    window.location.href=host_url+'agarWood/agarWoodView.html';
                }else{
                    alert(msg.RESPONSE);
                }
               
            }
        });

    return false;  
}

function deleteagarWood(id){
        var data = {
                    
                  }
        var auth = getLocal("auth");
        $(".loader").show();
    $.ajax({
          type: "POST",
          url: api_url+"/api/deleteAgar/"+id,
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
