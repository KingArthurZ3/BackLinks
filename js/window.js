$(document).ready(function () {
    let ogHeight = $(".window").css("height");

    $(".window-minimize").on("click", function () {
        ogHeight = $(".window").css("height");

        $(".window").animate({
            height: "40"
        }, 500);
        
         $(".window").resizable( 'disable' );
    });

    $(".window-maximize").on("click", function () {
        $(".window").animate({
            height: ogHeight
        }, 500);
        
        $(".window").resizable( 'enable' );
    });

    $(".window-close").on("click", function () {
        $(".window").fadeToggle(500);
    });
});
