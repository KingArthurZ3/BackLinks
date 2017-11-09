$(document).ready(function () {
    resetIcons();
    
    $(".folder").draggable({
        containment: "parent"
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
        borderColor: "rgb(255, 255, 255, 0.5)"
    }, easing);
    $(icon).find("p").animate({
        borderColor: "rgb(255, 255, 255, 0.5)"
    }, easing);
    $(icon).animate({
        backgroundColor: "rgba(0, 0, 0, 0.53)"
    }, easing);
    $(icon).find("p").animate({
        backgroundColor: "rgb(255, 255, 255, 0.5)"
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
