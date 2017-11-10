$(document).ready(function () {
    let date = new Date($.now());
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][date.getMonth()];
    let weekday = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
    $("#date").text(weekday + " " + month + " " + date.getDate());


    let suffix = "AM";
    if (date.getHours() >= 12) {
        suffix = "PM";
    }

    function setNavClock(date, suffix) {
        let displayTime = date.getHours() % 12 + ":" + date.getMinutes();

        $("#clock").text(displayTime + " " + suffix);

        setInterval(setNavClock.bind(date, suffix), 60000);
    }

    setNavClock(date, suffix);
});
