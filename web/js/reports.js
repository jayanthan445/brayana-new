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







