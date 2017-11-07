$(document).ready(function(){
    $(".folder").draggable({ containment: "parent" });
    
    $(".window").draggable({ containment: "parent" });
    $(".window").resizable({
      maxHeight: 600,
      maxWidth: 600,
      minHeight: 200,
      minWidth: 200
    });
    
    $("p").on("click", function(){
        alert("The paragraph was clicked.");
    });
});


    