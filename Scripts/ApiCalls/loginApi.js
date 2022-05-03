
function Login(){
    console.log(apiLink);
    $("#fullPageLoader").show();
    $.ajax({ 
        type: "POST",
        'processData': false,
        data:JSON.stringify({
            "method": "LOGIN",
            "Email": $('#loginEmail').val(),
            "Password": $('#loginPassword').val()
        }),
        url: apiLink, 
        crossDomain: true,
        success: function(result){
            result = JSON.parse(result);
            LoginSuccess(result); 
        },error: function (xhr, ajaxOptions, thrownError) {
            LoginFalied(xhr, ajaxOptions, thrownError);
        }
    });
}

function LoginFalied(xhr, ajaxOptions, thrownError){
    console.log(xhr, ajaxOptions, thrownError);
    $("#fullLoginError").show();
    $("#fullPageLoader").hide();
}

function LoginSuccess(result){
    console.log(result);
    try{
        if(result.status == "200"){
            localStorage.setItem("JANDHNotificationToolToken", result.data.Tokken);
            window.location.replace("../index.html");
        }
        else{
            LoginFalied("Token Not Recieved");
        }
    }
    catch(ex){
        LoginFalied(ex);
    }
}
