function openReportsAddPage(){
    window.location='./reportsAddEdit.html';
}

function openBookingCustomerReportsPage(){
    window.location='../customerReports/reportsView.html';
}


function openCustomerPaymentReportsPage(){
    window.location='../customerReports/paymentView.html';
}

function openCustomerunPaidReportsPage(){
    window.location='../customerReports/unPaidView.html';
}


function openBookingEmployeeReportsPage(){
    window.location='../employeeReports/reportsView.html';
}

function openEmployeePaymentReportsPage(){
    window.location='../employeeReports/paymentView.html';
}

function openEmployeeunPaidReportsPage(){
    window.location='../employeeReports/unPaidView.html';
}


 $('input[id^="customerBbookingConsolidate"]').click(function() {
        alert("Selected");     
    });



$(function () {
  $('#consolidateCBR').click(function () {
    var id = $(this).attr('id');
    if ($(this).is(':checked')) {
        $("#typeCBR").attr("disabled" , "disabled");
        $("#fromDateCBR").attr("disabled" , "disabled");
        $("#toDateCBR").attr("disabled" , "disabled");
        $("#mobileCBR").attr("disabled" , "disabled");
        $("#bookIdCBR").attr("disabled" , "disabled");
    }else{
        $("#typeCBR").removeAttr("disabled" , "disabled");
        $("#fromDateCBR").removeAttr("disabled" , "disabled");
        $("#toDateCBR").removeAttr("disabled" , "disabled");
        $("#mobileCBR").removeAttr("disabled" , "disabled");
        $("#bookIdCBR").removeAttr("disabled" , "disabled");
    }
  });

  $('#consolidateCPR').click(function () {
    var id = $(this).attr('id');
    if ($(this).is(':checked')) {
        $("#typeCPR").attr("disabled" , "disabled");
        $("#fromDateCPR").attr("disabled" , "disabled");
        $("#toDateCPR").attr("disabled" , "disabled");
        $("#mobileCPR").attr("disabled" , "disabled");
        $("#bookIdCPR").attr("disabled" , "disabled");
    }else{
        $("#typeCPR").removeAttr("disabled" , "disabled");
        $("#fromDateCPR").removeAttr("disabled" , "disabled");
        $("#toDateCPR").removeAttr("disabled" , "disabled");
        $("#mobileCPR").removeAttr("disabled" , "disabled");
        $("#bookIdCPR").removeAttr("disabled" , "disabled");
    }
  });

   $('#consolidateEPR').click(function () {
    var id = $(this).attr('id');
    if ($(this).is(':checked')) {
        $("#typeEPR").attr("disabled" , "disabled");
        $("#fromDateEPR").attr("disabled" , "disabled");
        $("#toDateEPR").attr("disabled" , "disabled");
        $("#mobileEPR").attr("disabled" , "disabled");
        $("#bookIdEPR").attr("disabled" , "disabled");
    }else{
        $("#typeEPR").removeAttr("disabled" , "disabled");
        $("#fromDateEPR").removeAttr("disabled" , "disabled");
        $("#toDateEPR").removeAttr("disabled" , "disabled");
        $("#mobileEPR").removeAttr("disabled" , "disabled");
        $("#bookIdEPR").removeAttr("disabled" , "disabled");
    }
  });

   $('#consolidateEBR').click(function () {
    var id = $(this).attr('id');
    if ($(this).is(':checked')) {
        $("#typeEBR").attr("disabled" , "disabled");
        $("#fromDateEBR").attr("disabled" , "disabled");
        $("#toDateEBR").attr("disabled" , "disabled");
        $("#mobileEBR").attr("disabled" , "disabled");
        $("#bookIdEBR").attr("disabled" , "disabled");
    }else{
        $("#typeEBR").removeAttr("disabled" , "disabled");
        $("#fromDateEBR").removeAttr("disabled" , "disabled");
        $("#toDateEBR").removeAttr("disabled" , "disabled");
        $("#mobileEBR").removeAttr("disabled" , "disabled");
        $("#bookIdEBR").removeAttr("disabled" , "disabled");
    }
  });

   $('#consolidateEUR').click(function () {
    var id = $(this).attr('id');
    if ($(this).is(':checked')) {
        $("#typeEUR").attr("disabled" , "disabled");
        $("#fromDateEUR").attr("disabled" , "disabled");
        $("#toDateEUR").attr("disabled" , "disabled");
        $("#mobileEUR").attr("disabled" , "disabled");
        $("#bookIdEUR").attr("disabled" , "disabled");
    }else{
        $("#typeEUR").removeAttr("disabled" , "disabled");
        $("#fromDateEUR").removeAttr("disabled" , "disabled");
        $("#toDateEUR").removeAttr("disabled" , "disabled");
        $("#mobileEUR").removeAttr("disabled" , "disabled");
        $("#bookIdEUR").removeAttr("disabled" , "disabled");
    }
  });


  $('#consolidateCUR').click(function () {
    var id = $(this).attr('id');
    if ($(this).is(':checked')) {
        $("#typeCUR").attr("disabled" , "disabled");
        $("#fromDateCUR").attr("disabled" , "disabled");
        $("#toDateCUR").attr("disabled" , "disabled");
        $("#mobileCUR").attr("disabled" , "disabled");
        $("#bookIdCUR").attr("disabled" , "disabled");
    }else{
        $("#typeCUR").removeAttr("disabled" , "disabled");
        $("#fromDateCUR").removeAttr("disabled" , "disabled");
        $("#toDateCUR").removeAttr("disabled" , "disabled");
        $("#mobileCUR").removeAttr("disabled" , "disabled");
        $("#bookIdCUR").removeAttr("disabled" , "disabled");
    }
  });
});



function openCustomerReportsPage(){
    window.location='./reportsViewCutomer.html';
}

function openConsolidatedReportsPage(){
    window.location='./reportsViewConsolidatedList.html';
}

function openunPaidReportsPage(){
    window.location='./reportsViewUnPaid.html';
}


function saveLandDetail(){

    	var siteName = $("#siteName").val();

    	var surveyNo = $("#surveyNo").val();

        var area = $("#area").val();

        var city = $("#city").val();

        var installmentMonths = $("#installmentMonths").val();

        var installmentAmount = $("#installmentAmount").val();



        if(siteName == ""){

			alert("Please enter site Name");

    	}else if(surveyNo == ""){

			alert("Please enter survey Number");

    	} else if(area == ""){

            alert("Please enter area Deatails");

        } else if(city == ""){

            alert("Please enter city Deatails");

        } else if(installmentMonths == ""){

            alert("Please enter installment Months Deatails");

        } else if(installmentAmount == ""){

            alert("Please enter installment Amount Deatails");

        } else{

            alert("Details saved successfully");

        }

    }







