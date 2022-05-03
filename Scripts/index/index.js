$( document ).ready(function() {
    $("#profileSection").show();
    $("#footer").load("Pages/footer.html"); 
    $("#header").load("Pages/header.html");
    hideAllSections();
});

function hideAllSections(){
    $(".indexSections").hide();
}