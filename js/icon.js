$(document).ready(function () {
    resetIcons();
    
    $(".folder").draggable({
        containment: "parent"
    });

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

    $(".icon-container").on("click", function () {
        resetIcons(easing=0);
        highlightIcon(this);
    });

    //If click outside of folders, hide folder border and background
    $(document).on("click", function (e) {
        let target = $(e.target);

        if (!(target.hasClass("icon-image") || target.hasClass("icon-name"))) {
            resetIcons(e);
        }
    });
});

function highlightIcon(icon, easing=200) {
    $(icon).animate({
        borderColor: "rgb(0, 0, 0, 0.5)"
    }, easing);
    $(icon).find("p").animate({
        borderColor: "rgb(0, 0, 0, 0.5)"
    }, easing);
    $(icon).animate({
        backgroundColor: "rgb(0, 0, 0, 0.1)"
    }, easing);
    $(icon).find("p").animate({
        backgroundColor: "rgb(0, 0, 0, 0.1)"
    }, easing);

}

function resetIcons(easing= 200) {    
    $(".icon-container").animate({
        backgroundColor: "rgb(0, 0, 0, 0)"
    }, easing);
    $(".icon-container").find("p").animate({
        backgroundColor: "rgb(0, 0, 0, 0)"
    }, easing);
    $(".icon-container").animate({
        borderColor: "rgb(0, 0, 0, 0)"
    }, easing);
    $(".icon-container").find("p").animate({
        borderColor: "rgb(0, 0, 0, 0)"
    }, easing);
}
