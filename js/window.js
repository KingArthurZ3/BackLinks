$(document).ready(function () {
    let ogHeight = $(".window").css("height");
    let ogWidth = $(".window").css("width");

    $(".window").draggable({
        containment: "parent",
        handle: ".top-bar",
    });

    $(".window").resizable({
        maxHeight: 600,
        maxWidth: 800,
        minHeight: 300,
        minWidth: 200
    });

    $(".window-minimize").on("click", function () {
        if ($(".window").css("height") != "25px") {
            ogHeight = $(".window").css("height");
            ogWidth = $(".window").css("width");

            $(".window").animate({
                height: "25"
            }, {
                duration: 500,
                specialEasing: {
                    width: "linear",
                    height: "easeInSine"
                }
            });

            $(".window").animate({
                width: "200"
            }, {
                duration: 100,
                specialEasing: {
                    width: "linear",
                    height: "easeInSine"
                }
            });

            setTimeout(function(){
                $(".top-bar").css("border-radius", "6px 6px 6px 6px");
            }, 500);

            $(".window").resizable('disable');
        }
    });

    $(".window-maximize").on("click", function () {
        if ($(".window").css("height") == "25px") {
            $(".top-bar").css("border-radius", "6px 6px 0px 0px");

            $(".window").animate({
                width: ogWidth
            }, {
                duration: 100,
                specialEasing: {
                    width: "linear",
                    height: "easeInSine"
                }
            });

            $(".window").animate({
                height: ogHeight
            }, {
                duration: 500,
                specialEasing: {
                    width: "linear",
                    height: "easeInSine"
                }
            });

            $(".window").resizable('enable');
        }
    });

    $(".window-close").on("click", function () {
        $(".window").fadeToggle(500);
    });
});
