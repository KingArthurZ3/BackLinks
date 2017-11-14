//'[{ "title": "test 1", "author": "a1", "date": "1.1.1111", "body": "this is test 1 for all intended purposes", "tags": "announcements, 1, specifical" }, { "title": "test 2", "author": "a2", "date": "2.2.2222", "body": "this is test 2 essentially", "tags": "announcements, 2, technical" }, { "title": "test 3", "author": "a3", "date": "3.3.3333", "body": "this is test 3 basically", "tags": "announcements, 3, general" }]'
// announcements is saved to a json file ex: alert(jsonResponse[0].title) should return test 1y
let announcements = [];
let currentlyDisplayedRowID;

$(document).ready(function () {

    //Matt's stuff
    displayRows(announcements);


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
        highlight("#" + $(this).attr("id"));

        let title = $(this).find(".side-row-title");
        let author = $(this).find(".side-row-author");
        let date = $(this).find(".side-row-date");

        let entry = findEntryByRow(title.text(), author.text(), date.text(), announcements);

        if (entry) {
            displayEntry(entry);
            currentlyDisplayedRowID = "#" + $(this).attr("id");
        }
    });

    $(".side-scroll-pane-rows").on("mouseenter", '.side-row', function () {
        highlight("#" + $(this).attr("id"), false);
    });

    $(".side-scroll-pane-rows").on("mouseleave", '.side-row', function () {
        if ("#" + $(this).attr("id") != currentlyDisplayedRowID) {
            clearHighlight("#" + $(this).attr("id"));
        }
    });

    $(".side-row-input").focusout(function () {
        if ($(".side-row-input").val() == "") {
            displayRows(announcements);
        }
    });
    
    //downloads file and gets length using ajax, synchronous so you will have access to all file data
    var json = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'https://firebasestorage.googleapis.com/v0/b/backlinksnpo.appspot.com/o/announcements%2Freal.json?alt=media&token=f0b35b47-00cb-4490-b4e6-b3164afcd5fb',
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })(); 
    // gets length of json array
    var length = Object.keys(json).length;
    
    
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
        jsonTitle = entry["title"].replace(/\W/g, '');
        jsonAuthor = entry["author"].replace(/\W/g, '');
        jsonDate = entry["date"].replace(/\W/g, '');

        html += '<div class="side-row" id="';
        html += jsonTitle + jsonAuthor + jsonDate;
        html += '"><div class="side-row-title">';
        html += entry["title"];
        html += '</div><div class="side-row-details side-row-author">';
        html += entry["author"];
        html += '</div><div class="side-row-details side-row-date">';
        html += entry["date"];
        html += '</div></div>';
    }

    $(parentDiv).append(html);

    if (currentlyDisplayedRowID){
        highlight(currentlyDisplayedRowID);
    }
}

function highlight(rowID, clearHighlightFirst=true) {
    if (clearHighlightFirst){
        $(".side-row").css("background-color", "rgba(237, 237, 237, 0)");
        $(".side-row").css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0)");
    }

    $(rowID).css("background-color", "rgba(237, 237, 237, 0.2)");
}

function clearHighlight(rowID) {
    $(rowID).css("background-color", "rgba(237, 237, 237, 0)");
    $(rowID).css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0)");
}



//    gsReference.getDownloadURL().then(function(url) {
//        // This can be downloaded directly:
//        var xhr = new XMLHttpRequest();
//        xhr.responseType = 'text';
//        xhr.onload = function(event) {
//            text = xhr.responseText;
//            jsonResponse = JSON.parse(text);
//            // all code that uses the json responses should go here!
//            var length = Object.keys(jsonResponse).length;
//            $('.entry-content').text(jsonResponse[length-1].body);
//            $('.title').text(jsonResponse[length-1].title);
//
//        };
//        xhr.open('GET', url);
//        xhr.send();
//
//    });
