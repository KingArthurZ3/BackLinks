let announcements = JSON.parse('[{ "title": "test 1", "author": "a1", "date": "1/1/1111", "body": "this is test 1 for all intended purposes", "tags": "announcements, 1, specifical" }, { "title": "test 2", "author": "a2", "date": "2/2/2222", "body": "this is test 2 essentially", "tags": "announcements, 2, technical" }, { "title": "test 3", "author": "a3", "date": "3/3/3333", "body": "this is test 3 basically", "tags": "announcements, 3, general" }]');
let currentlySelectedRowID = "#row-1";


$(document).ready(function () {
    displayRows(announcements);
    highlightRow();
    displayEntry(announcements[0]);

    var options = {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
                "title",
                "author",
                "date",
                "body",
                "tags",
            ]
    };
    let fuse = new Fuse(announcements, options); // "list" is the item array

    $(".side-row-input").focus(function () {
        displayRows(fuse.search(""));
    });

    $(".side-row-input").on('input', function () {
        displayRows(fuse.search($(".side-row-input").val()));
    });

    $(".side-scroll-pane-rows").on('click', '.side-row', function () {
        let rowID = $(this).attr('id');
        rowID = "#" + rowID;

        highlightRow(rowID);

        let title = $(rowID).find(".side-row-title");
        let author = $(rowID).find(".side-row-author");
        let date = $(rowID).find(".side-row-date");

        let entry = findEntryByRow(title.text(), author.text(), date.text(), announcements);

        if (entry) {
            displayEntry(entry);
            currentlySelectedRowID = rowID;
        }
    });
    
    $(".side-scroll-pane-rows").on("mouseenter", '.side-row', function () {
        let rowID = $(this).attr('id');
        rowID = "#" + rowID;
        
        $(rowID).css("background-color", "rgba(237, 237, 237, 0.2)");
        $(rowID).css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0.5)");
    });
    
    $(".side-scroll-pane-rows").on("mouseleave", '.side-row', function () {
        let rowID = $(this).attr('id');
        rowID = "#" + rowID;
                
        if (rowID != currentlySelectedRowID){
            $(rowID).css("background-color", "rgba(237, 237, 237, 0)");
            $(rowID).css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0)");
        }
    });
    
    $(".side-row-input").focusout(function () {
        if ($(".side-row-input").val() == ""){
            displayRows(announcements);
            highlightRow(currentlySelectedRowID);
        }
    });
});

function findEntryByRow(title, author, date, jsonArr) {
    title = title.replace(/\s/g, '');
    author = author.replace(/\s/g, '');
    date = date.replace(/\s/g, '');

    for (let i = 0; i < jsonArr.length; i++) {
        let entry = jsonArr[i];
        jsonTitle = entry["title"].replace(/\s/g, '');
        jsonAuthor = entry["author"].replace(/\s/g, '');
        jsonDate = entry["date"].replace(/\s/g, '');

        if (title == jsonTitle && author == jsonAuthor && date == jsonDate) {
            return entry;
        }
    }

    return null;
}

function displayEntry(entry, parentDiv = ".side-content-pane") {
    $(parentDiv).empty();
    $(parentDiv).append('<div class="title"></div> <div class="entry-date"></div> <div class="entry-author"></div> <div class="entry-content"> </div> <div class="entry-tags"></div>');
    $(".title").text(entry["title"]);
    $(".entry-date").text(entry["date"]);
    $(".entry-author").text(entry["author"]);
    $(".entry-content").text(entry["body"]);
    $(".entry-tags").text("Tags: " + entry["tags"]);
}

function displayRows(jsonArr, parentDiv = '.side-scroll-pane-rows') {
    $(parentDiv).empty();
    let html = "";

    for (let i = 0; i < jsonArr.length; i++) {
        let entry = jsonArr[i];
        jsonTitle = entry["title"].replace(/\s/g, '');
        jsonAuthor = entry["author"].replace(/\s/g, '');
        jsonDate = entry["date"].replace(/\s/g, '');

        html += '<div class="side-row" id="row-';
        html += i + 1;
        html += '"><div class="side-row-title">';
        html += entry["title"];
        html += '</div><div class="side-row-details side-row-author">';
        html += entry["author"];
        html += '</div><div class="side-row-details side-row-date">';
        html += entry["date"];
        html += '</div></div>';
    }

    $(parentDiv).append(html);
}

function highlightRow(rowDiv = "#row-1") {
    $(".side-row").css("background-color", "rgba(237, 237, 237, 0)");
    $(".side-row").css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0)");

    $(rowDiv).css("background-color", "rgba(237, 237, 237, 0.2)");
    $(rowDiv).css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0.5)");
}
