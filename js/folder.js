$(document).ready(function () {
    resetFolders();
    
    $(".folder").draggable({
        containment: "parent"
    });

    $(".window").draggable({
        containment: "parent"
    });
    $(".window").resizable({
        maxHeight: 600,
        maxWidth: 600,
        minHeight: 200,
        minWidth: 200
    });

    $(".folder").on("click", function () {
        resetFolders(easing=0);
        highlightFolder(this);
    });

    //If click outside of folders, hide folder border and background
    $(document).on("click", function (e) {
        let target = $(e.target);

        if (!(target.hasClass("folder-icon") || target.hasClass("folder-name"))) {
            resetFolders(e);
        }
    });
});

function highlightFolder(folder, easing=350) {
    $(folder).animate({
        borderColor: "rgb(0, 0, 0, 0.5)"
    }, easing);
    $(folder).find("p").animate({
        borderColor: "rgb(0, 0, 0, 0.5)"
    }, easing);
    $(folder).animate({
        backgroundColor: "rgb(0, 0, 0, 0.1)"
    }, easing);
    $(folder).find("p").animate({
        backgroundColor: "rgb(0, 0, 0, 0.1)"
    }, easing);

}

function resetFolders(easing= 350) {    
    $(".folder").animate({
        backgroundColor: "rgb(0, 0, 0, 0)"
    }, easing);
    $(".folder").find("p").animate({
        backgroundColor: "rgb(0, 0, 0, 0)"
    }, easing);
    $(".folder").animate({
        borderColor: "rgb(0, 0, 0, 0)"
    }, easing);
    $(".folder").find("p").animate({
        borderColor: "rgb(0, 0, 0, 0)"
    }, easing);
}
