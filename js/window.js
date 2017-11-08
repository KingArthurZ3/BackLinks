$(document).ready(function () {
    let ogHeight = $(".window").css("height");

    $(".window-minimize").on("click", function () {
        if ($(".window").css("height") != "25px"){
            $(".window").animate({
                height: "25"
            }, 500);

             $(".window").resizable( 'disable' );
        }
    });

    $(".window-maximize").on("click", function () {
        if ($(".window").css("height") == "25px"){
            $(".window").animate({
                height: ogHeight
            }, 500);

            $(".window").resizable( 'enable' );
        }
    });

    $(".window-close").on("click", function () {
        $(".window").fadeToggle(500);
    });
});
