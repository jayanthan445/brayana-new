function openReportsAddPage() {
    window.location = './reportsAddEdit.html';
}

function openBookingCustomerReportsPage() {
    window.location = '../customerReports/reportsView.html';
    getCustomerReport();
}


function openCustomerPaymentReportsPage() {
    window.location = '../customerReports/paymentView.html';
}

function openCustomerunPaidReportsPage() {
    window.location = '../customerReports/unPaidView.html';
}


function openBookingEmployeeReportsPage() {
    window.location = '../employeeReports/reportsView.html';
}

function openEmployeePaymentReportsPage() {
    window.location = '../employeeReports/paymentView.html';
}

function openEmployeeunPaidReportsPage() {
    window.location = '../employeeReports/unPaidView.html';
}
$(document).ready(function () {

    // $('#myTable').DataTable( {
    //     dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'pdf', 'print'
    //     ]
    // } );

 
    //loadDataTable();
    init();

    // $('#empReport').DataTable({
    //     "processing": true,
    //     dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'pdf', 'print'
    //     ]
    // });



});

function init() {
    var currentPath = getCurrentPath();
    //alert(currentPath);
    //getLands(); 


    if (currentPath == "customerReports/reportsView.html") {
        getCustomerReport();
    } else if (currentPath == "customerReports/paymentView.html") {
        getCustomerReportPaid();
    } else if (currentPath == "employeeReports/reportsView.html") {
        getEmployerReport();
    } else if (currentPath == "employeeReports/paymentView.html") {
        getEmployerReportPaid();
    }
    else {
        var params = getParams(window.location.href);
        if (typeof params.id != "undefined" && params.id != "" && params.id != null) {
            getLands();
            getCustomerLandsByID(params.id);

        } else {
            window.location.href = host_url + 'customer/customerLand/customerLandView.html';
        }
    }

}

$('input[id^="customerBbookingConsolidate"]').click(function () {
    alert("Selected");
});

function loadDataTable() {



    // var table = $('#myTable').DataTable({
    //     "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    //     "bDestroy": true
    // });



    // #myInput is a <input type="text"> element
    // $('#myInput').on('keyup', function () {
    //     table.search(this.value).draw();
    // });
}

function buildTable(list, count) {
    var auth = getLocal("auth");
    var userType = getLocal("u");

    for (var i = 0; i < count; i++) {

        var markup = "<tr><td>" + list[i].booking_no + "</td><td>" + list[i].name + "</td><td>" + list[i].mobile + "</td><td>" + list[i].type + "</td><td>" + list[i].inst_month + "</td><td>" + list[i].inst_amount + "</td><td>" + list[i].tot_amount + "</td></tr>";
        $("table tbody").append(markup);

       
    }

    $('#cusReport').DataTable({
        "processing": true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
    


}

function buildTableEmp(list, count) {
    var auth = getLocal("auth");
    var userType = getLocal("u");


    for (var i = 0; i < count; i++) {

        var markup = "<tr><td>" + list[i].emp_pin + "</td><td>" + list[i].emp_name + "</td><td>" + list[i].booking_no + "</td><td>" + list[i].cust_name + "</td><td>" + list[i].emp_mobile + "</td><td>" + list[i].type + "</td><td>" + list[i].tot_amount + "</td></tr>";
        
        $("table tbody").append(markup);
        //  $("table tbody").append(markup);

    }

    $('#empReport').DataTable({
        "processing": true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });


}

function getCustomerReport() {

    var auth = getLocal("auth");
    var typeCBR = $("#typeCBR").val();
    var fromDateCBR = $("#fromDateCBR").val();
    var toDateCBR = $("#toDateCBR").val();


    var data = {
        "toDateCBR": toDateCBR,
        "fromDateCBR": fromDateCBR,
        "typeCBR": typeCBR
    }
    $.ajax({
        type: "POST",
        url: api_url + "/api/customerReport/all",
        //headers: { "auth":auth},
        dataType: "JSON",
        cache: false,
        data: data,
        success: function (msg, textStatus, xhr) {
            var status = msg.STATUS;
            var data = msg.RESPONSE;
            if (status == "OK") {
                if (data.count > 0) {
                    var list = data.data;
                    buildTable(list, data.count);
                }
            }
        }
    });
}

function getEmployerReport() {

    var auth = getLocal("auth");
    var typeCBR = $("#typeEBR").val();
    var fromDateCBR = $("#fromDateEBR").val();
    var toDateCBR = $("#toDateEBR").val();


    var data = {
        "toDateCBR": toDateCBR,
        "fromDateCBR": fromDateCBR,
        "typeCBR": typeCBR
    }
    $.ajax({
        type: "POST",
        url: api_url + "/api/emploeeReport/all",
        //headers: { "auth":auth},
        dataType: "JSON",
        cache: false,
        data: data,
        success: function (msg, textStatus, xhr) {
            var status = msg.STATUS;
            var data = msg.RESPONSE;
            if (status == "OK") {
                if (data.count > 0) {
                    var list = data.data;
                    buildTableEmp(list, data.count);
                }
            }
        }
    });
}
function getEmployerReportPaid() {

    var auth = getLocal("auth");
    var typeCBR = $("#typeEBR").val();
    var fromDateCBR = $("#fromDateCBR").val();
    var toDateCBR = $("#toDateCBR").val();


    var data = {
        "toDateCBR": toDateCBR,
        "fromDateCBR": fromDateCBR,
        "typeCBR": typeCBR
    }
    $.ajax({
        type: "POST",
        url: api_url + "/api/emploeeReport/paid",
        //headers: { "auth":auth},
        dataType: "JSON",
        cache: false,
        data: data,
        success: function (msg, textStatus, xhr) {
            var status = msg.STATUS;
            var data = msg.RESPONSE;
            if (status == "OK") {
                if (data.count > 0) {
                    var list = data.data;
                    buildTableEmp(list, data.count);
                }
            }
        }
    });
}

function getCustomerReportPaid() {
    var auth = getLocal("auth");
    $.ajax({
        type: "POST",
        url: api_url + "/api/customerReport/paid",
        //headers: { "auth":auth},
        dataType: "JSON",
        cache: false,
        success: function (msg, textStatus, xhr) {
            var status = msg.STATUS;
            var data = msg.RESPONSE;
            if (status == "OK") {
                if (data.count > 0) {
                    var list = data.data;
                    buildTable(list, data.count);
                    //loadDataTable();
                }
            }
        }
    });
}




$(function () {
    $('#consolidateCBR').click(function () {
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $("#typeCBR").attr("disabled", "disabled");
            $("#fromDateCBR").attr("disabled", "disabled");
            $("#toDateCBR").attr("disabled", "disabled");
            $("#mobileCBR").attr("disabled", "disabled");
            $("#bookIdCBR").attr("disabled", "disabled");
        } else {
            $("#typeCBR").removeAttr("disabled", "disabled");
            $("#fromDateCBR").removeAttr("disabled", "disabled");
            $("#toDateCBR").removeAttr("disabled", "disabled");
            $("#mobileCBR").removeAttr("disabled", "disabled");
            $("#bookIdCBR").removeAttr("disabled", "disabled");
        }
    });

    $('#consolidateCPR').click(function () {
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $("#typeCPR").attr("disabled", "disabled");
            $("#fromDateCPR").attr("disabled", "disabled");
            $("#toDateCPR").attr("disabled", "disabled");
            $("#mobileCPR").attr("disabled", "disabled");
            $("#bookIdCPR").attr("disabled", "disabled");
        } else {
            $("#typeCPR").removeAttr("disabled", "disabled");
            $("#fromDateCPR").removeAttr("disabled", "disabled");
            $("#toDateCPR").removeAttr("disabled", "disabled");
            $("#mobileCPR").removeAttr("disabled", "disabled");
            $("#bookIdCPR").removeAttr("disabled", "disabled");
        }
    });

    $('#consolidateEPR').click(function () {
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $("#typeEPR").attr("disabled", "disabled");
            $("#fromDateEPR").attr("disabled", "disabled");
            $("#toDateEPR").attr("disabled", "disabled");
            $("#mobileEPR").attr("disabled", "disabled");
            $("#bookIdEPR").attr("disabled", "disabled");
        } else {
            $("#typeEPR").removeAttr("disabled", "disabled");
            $("#fromDateEPR").removeAttr("disabled", "disabled");
            $("#toDateEPR").removeAttr("disabled", "disabled");
            $("#mobileEPR").removeAttr("disabled", "disabled");
            $("#bookIdEPR").removeAttr("disabled", "disabled");
        }
    });

    $('#consolidateEBR').click(function () {
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $("#typeEBR").attr("disabled", "disabled");
            $("#fromDateEBR").attr("disabled", "disabled");
            $("#toDateEBR").attr("disabled", "disabled");
            $("#mobileEBR").attr("disabled", "disabled");
            $("#bookIdEBR").attr("disabled", "disabled");
        } else {
            $("#typeEBR").removeAttr("disabled", "disabled");
            $("#fromDateEBR").removeAttr("disabled", "disabled");
            $("#toDateEBR").removeAttr("disabled", "disabled");
            $("#mobileEBR").removeAttr("disabled", "disabled");
            $("#bookIdEBR").removeAttr("disabled", "disabled");
        }
    });

    $('#consolidateEUR').click(function () {
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $("#typeEUR").attr("disabled", "disabled");
            $("#fromDateEUR").attr("disabled", "disabled");
            $("#toDateEUR").attr("disabled", "disabled");
            $("#mobileEUR").attr("disabled", "disabled");
            $("#bookIdEUR").attr("disabled", "disabled");
        } else {
            $("#typeEUR").removeAttr("disabled", "disabled");
            $("#fromDateEUR").removeAttr("disabled", "disabled");
            $("#toDateEUR").removeAttr("disabled", "disabled");
            $("#mobileEUR").removeAttr("disabled", "disabled");
            $("#bookIdEUR").removeAttr("disabled", "disabled");
        }
    });


    $('#consolidateCUR').click(function () {
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $("#typeCUR").attr("disabled", "disabled");
            $("#fromDateCUR").attr("disabled", "disabled");
            $("#toDateCUR").attr("disabled", "disabled");
            $("#mobileCUR").attr("disabled", "disabled");
            $("#bookIdCUR").attr("disabled", "disabled");
        } else {
            $("#typeCUR").removeAttr("disabled", "disabled");
            $("#fromDateCUR").removeAttr("disabled", "disabled");
            $("#toDateCUR").removeAttr("disabled", "disabled");
            $("#mobileCUR").removeAttr("disabled", "disabled");
            $("#bookIdCUR").removeAttr("disabled", "disabled");
        }
    });
});



function openCustomerReportsPage() {
    window.location = './reportsViewCutomer.html';
}

function openConsolidatedReportsPage() {
    window.location = './reportsViewConsolidatedList.html';
}

function openunPaidReportsPage() {
    window.location = './reportsViewUnPaid.html';
}


function saveLandDetail() {

    var siteName = $("#siteName").val();

    var surveyNo = $("#surveyNo").val();

    var area = $("#area").val();

    var city = $("#city").val();

    var installmentMonths = $("#installmentMonths").val();

    var installmentAmount = $("#installmentAmount").val();



    if (siteName == "") {

        alert("Please enter site Name");

    } else if (surveyNo == "") {

        alert("Please enter survey Number");

    } else if (area == "") {

        alert("Please enter area Deatails");

    } else if (city == "") {

        alert("Please enter city Deatails");

    } else if (installmentMonths == "") {

        alert("Please enter installment Months Deatails");

    } else if (installmentAmount == "") {

        alert("Please enter installment Amount Deatails");

    } else {

        alert("Details saved successfully");

    }

}







