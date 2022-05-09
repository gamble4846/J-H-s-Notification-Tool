var token = null;
var CompaniesList = null;
var profileDATA = null;

$( document ).ready(function() {
    if((localStorage.getItem("JANDHNotificationToolToken") === null)){
        window.location.replace("Pages/login.html");
    }
    else{
        token = localStorage.getItem("JANDHNotificationToolToken");
        ShowNotifications();
    }
});

function hideAllSections(){
    $(".indexSections").hide();
}

function ShowProfile(){
    hideAllSections();
    $("#profileSection").show();
    ProfileApiGet();
}

function ShowCompanies(){
    hideAllSections();
    $("#companiesSection").show();
    CompaniesApiGet();
}

function ShowNotifications(){
    hideAllSections();
    $("#notificationsSection").show();
    NotificationApiGet();
}

function ShowUser(){
    hideAllSections();
    $("#userSection").show();
}

function ProfileApiGet(){
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "GETPROFILE",
            "tokken": token,
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            ProfileGETSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            ProfileGETFailed(xhr, ajaxOptions, thrownError);
        }
    });
}

function ProfileGETSuccess(result){
    profileDATA = result.data;
    console.log(result);
    $("#LogoURL").val(result.data.LogoURL);
    $("#ContactEmail").val(result.data.ContactEmail);
    $("#Address").val(result.data.Address);
    $("#fullPageLoader").hide();
}

function ProfileGETFailed(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullPageLoader").hide();
}

function UpdateProfile(){
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "UPDATEPROFILE",
            "LogoURL": $("#LogoURL").val(),
            "ContactEmail": $("#ContactEmail").val(),
            "Address": $("#Address").val(),
            "tokken": token
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            ProfilePUTSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            ProfilePUTFailed(xhr, ajaxOptions, thrownError);
        }
    });
}

function ProfilePUTSuccess(result){
    console.log(result);
    $("#fullPageLoader").hide();
}

function ProfilePUTFailed(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullPageLoader").hide();
}

function CompaniesApiGet(){
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "GETCOMPANIES",
            "tokken": token
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            CompinesGETSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            CompinesGETFailed(xhr, ajaxOptions, thrownError);
        }
    });
}

function CompinesGETSuccess(result){
    let tableBody = "";
    CompaniesList = result.data;
    CompaniesList.pop();
    CompaniesList.forEach(row => {
        tableBody += "<tr>";
        tableBody += "<td>"+row.CompanyName+"</td>";
        tableBody += "<td>"+row.CompanyCode+"</td>";
        tableBody += `<td><span onclick="ShowCompanyForm('`+row.CompanyID+`')">Edit</span></td>`
        tableBody += "</tr>";
    });
    $("#companyTableBody").html(tableBody);
    $("#fullPageLoader").hide();
}

function CompinesGETFailed(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullPageLoader").hide();
}

function ShowCompanyForm(CompanyID){
    resetCompanyForm();
    if(CompanyID == null){
        $('#companyModel').modal('show');
        $("#companyModelHeader").html("Add Company");
        $("#companyModelSaveBTN").html("Add Company");
    }
    else{
        let company = CompaniesList.find(x => x.CompanyID == CompanyID);
        $("#CompanyName").val(company.CompanyName);
        $("#CompanyCode").val(company.CompanyCode);
        $("#CompanyID").val(company.CompanyID);
        $('#companyModel').modal('show');
        $("#companyModelHeader").html("Edit Company");
        $("#companyModelSaveBTN").html("Save Company");
    }
}

function AddCompany(name, code){
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "POSTCOMPANY",
            "tokken": token,
            "CompanyName": name,
            "CompanyCode": code
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            CompinesPOSTSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            CompinesPOSTFailed(xhr, ajaxOptions, thrownError);
        }
    });
}

function CompinesPOSTSuccess(result){
    $("#fullPageLoader").hide();
    CompaniesApiGet();
    $('#companyModel').modal('hide');
}

function CompinesPOSTFailed(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullPageLoader").hide();
}

function CompanyModelButtonClicked(){
    if(!($("#CompanyID").val())){
        AddCompany($("#CompanyName").val(), $("#CompanyCode").val());
    }
    else{
        UpdateCompany($("#CompanyID").val(), $("#CompanyName").val(), $("#CompanyCode").val())
    }
}

function resetCompanyForm(){
    $("#CompanyName").val(null);
    $("#CompanyCode").val(null);
    $("#CompanyID").val(null);
}

function UpdateCompany(id, name, code){
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "PUTCOMPANY",
            "tokken": token,
            "CompanyName": name,
            "CompanyCode": code,
            "CompanyId": id
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            CompinesPUTSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            CompinesPUTFailed(xhr, ajaxOptions, thrownError);
        }
    });
}

function CompinesPUTSuccess(result){
    $("#fullPageLoader").hide();
    CompaniesApiGet();
    $('#companyModel').modal('hide');
}

function CompinesPUTFailed(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullPageLoader").hide();
}

function NotificationApiGet(){
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "GETNOTIFICATION",
            "tokken": token
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            NotificationGETSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            NotificationGETFailed(xhr, ajaxOptions, thrownError);
        }
    });
}

function NotificationGETSuccess(result){
    let tableBody = "";
    CompaniesList = result.data;
    CompaniesList.pop();
    CompaniesList.forEach(row => {
        tableBody += "<tr>";
        tableBody += "<td>"+row.CompanyName+"</td>";
        tableBody += "<td>"+row.CompanyCode+"</td>";
        tableBody += `<td><span onclick="ShowCompanyForm('`+row.CompanyID+`')">Edit</span></td>`
        tableBody += "</tr>";
    });
    $("#companyTableBody").html(tableBody);
    $("#fullPageLoader").hide();
}

function NotificationGETFailed(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullPageLoader").hide();
}

